import { FC, memo } from "react";
import { Controller } from "react-hook-form";

import { imageUpload } from "@/app/utils/imageUpload";

import { Stack } from "@mui/material";
import Image from "next/image";
import DropFile from "@/app/components/shared/dropFile/DropFile";

interface IProps {
  control: any;
  name: string;
  imageUrl: string;
}

const UploadImage: FC<IProps> = memo(({ control, imageUrl, name }) => {
  console.log(
    typeof imageUrl !== "string" ? URL.createObjectURL(imageUrl) : imageUrl
  );

  const uploadImage = (file: File, cb: (value: string) => void) => {
    const imageUrl = URL.createObjectURL(file);

    imageUpload(file);

    cb(imageUrl);
  };

  return (
    <Stack direction="row" alignItems="center" sx={{ position: "relative" }}>
      <Image
        src={
          typeof imageUrl !== "string"
            ? URL.createObjectURL(imageUrl)
            : imageUrl
        }
        alt={name}
        width={600}
        height={600}
      />
      <Controller
        name={name}
        control={control}
        defaultValue={imageUrl}
        render={({ field: { onChange, value } }) => (
          <DropFile onChange={(file: File) => uploadImage(file, onChange)} />
        )}
      />
    </Stack>
  );
});

UploadImage.displayName = "UploadImage";

export default UploadImage;

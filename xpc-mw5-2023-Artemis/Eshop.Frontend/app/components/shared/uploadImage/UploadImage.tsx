import { FC, memo, useState } from "react";
import { Controller } from "react-hook-form";

import { Box, Stack, Typography } from "@mui/material";
import Image from "@/app/components/ui/image/Image";
import DropFile from "@/app/components/shared/dropFile/DropFile";

interface IProps {
  control: any;
  name: string;
  imageUrl: string;
  sx?: any;
}

const UploadImage: FC<IProps> = memo(({ control, imageUrl, name, sx = {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  const uploadImage = (image: string, cb: (value: string) => void) => {
    cb(image);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        position: "relative",
        ...sx,
      }}
    >
      <Image src={imageUrl} alt={name} width={370} height={300} />
      {isOpen && (
        <Controller
          name={name}
          control={control}
          defaultValue={imageUrl}
          render={({ field: { onChange } }) => (
            <DropFile
              onChange={(image: string) => uploadImage(image, onChange)}
            />
          )}
        />
      )}
      <Box
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          position: "absolute",
          bottom: -40,
          height: 40,
          width: "100%",
          zIndex: 1,
          backgroundColor: "#ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Typography>Change image</Typography>
      </Box>
    </Stack>
  );
});

UploadImage.displayName = "UploadImage";

export default UploadImage;

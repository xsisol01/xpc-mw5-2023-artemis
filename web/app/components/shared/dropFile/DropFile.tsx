import { ChangeEvent, FC, memo, useEffect, useState } from "react";

import styles from "./dropFile.module.scss";
import { TextField, capitalize } from "@mui/material";
import { dropFileData } from "./dropFile.data";

interface IProps {
  onChange: (image: string) => void;
}

const DropFile: FC<IProps> = memo(({ onChange }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (imageUrl.length > 0) {
      onChange(imageUrl);
    }
  }, [imageUrl]);

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setImageUrl(event.target.value);
  }

  return (
    <div className={styles.dropFile}>
      <label htmlFor="images" className={styles.dropFile__container}>
        <TextField
          placeholder={capitalize(dropFileData.pasteImageUrl)}
          value={imageUrl}
          onChange={onInputChange}
          sx={{
            width: "100%",
          }}
        />
      </label>
    </div>
  );
});

DropFile.displayName = "DropFile";

export default DropFile;

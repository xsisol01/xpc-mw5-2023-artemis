import { ChangeEvent, FC, memo, useEffect, useState } from "react";

import styles from "./dropFile.module.scss";
import { Input, TextField, Typography, capitalize } from "@mui/material";
import { dropFileData } from "./dropFile.data";
import FormInput from "../formFields/formInput/FormInput";

interface IProps {
  onChange: (file: File | string) => void;
}

const DropFile: FC<IProps> = memo(({ onChange }) => {

  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if(imageUrl.length > 0) {
      onChange(imageUrl)
    }
  }, [imageUrl])

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (file.size > 1024 * 1024) {
      alert("The largest image size is 1MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log("formData", formData.get("file"));

    console.log("DropFile", JSON.stringify(formData));

    onChange(file);
  };

  function onInputChange (event: ChangeEvent<HTMLInputElement>) {
    setImageUrl(event.target.value)
  }

  return (
    <div className={styles.dropFile}>
      <label htmlFor="images" className={styles.dropFile__container}>
        <span className={styles.dropFile__title}>Drop files here</span>
        or
        <input
          type="file"
          id="images"
          accept="image/*"
          className={styles.dropFile__input}
          onChange={uploadImage}
        />
        <Input placeholder={capitalize(dropFileData.pasteImageUrl)} value={imageUrl} onChange={onInputChange}  />
      </label>
    </div>
  );
});

DropFile.displayName = "DropFile";

export default DropFile;

import { ChangeEvent, FC, memo } from "react";

import styles from "./dropFile.module.scss";

interface IProps {
  onChange: (file: File) => void;
}

const DropFile: FC<IProps> = memo(({ onChange }) => {
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
      </label>
    </div>
  );
});

DropFile.displayName = "DropFile";

export default DropFile;

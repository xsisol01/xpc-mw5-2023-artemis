import { ImageService } from "./../services/image.service";
export const imageUpload = async (file: File) => {
  console.log("imageUpload", file);

  console.log(URL.createObjectURL(file));

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${process.env.CLOUD_UPDATE_PRESET}`);
  formData.append("cloud_name", `${process.env.CLOUD_NAME}`);

  const res = await ImageService.create(formData);

  console.log("imageUpload", res);
};

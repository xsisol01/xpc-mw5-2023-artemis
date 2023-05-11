import { ICreateProduct } from "@/app/types/product.type";

export const newProductData: ICreateProduct = Object.freeze({
  name: "",
  price: "",
  description: "",
  manufacturerId: "",
  categoryId: "",
  weight: "",
  stockQuantity: "",
  imageUrl: "",
});

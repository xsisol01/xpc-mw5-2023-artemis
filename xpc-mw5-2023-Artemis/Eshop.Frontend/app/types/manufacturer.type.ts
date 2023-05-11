export interface IManufacturer {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  country: string;
  commodityIds: string[];
}

export interface IManufacturerField {
  name: "name" | "country" | "description";
  xs: number;
  md: number;
  type: "text" | "select";
  required: boolean;
  rows: number;
  validation: RegExp;
}

export interface ICreateManufacturer {
  name: string;
  imageUrl: string;
  description: string;
  country: string;
}

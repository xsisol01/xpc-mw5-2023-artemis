import { getLoweredLetters } from "@/app/utils/getLoweredLetters";
import { IProductFilterParams } from "@/app/types/productFilter.type";
import { IProduct } from "@/app/types/product.type";
import { productFilterData } from "@/app/data/productFilterData";

export const filterProduct = (
  products: IProduct[],
  params: IProductFilterParams
): IProduct[] => {
  let filteredProducts: IProduct[] = products;

  Object.entries(params).forEach(([key, value]) => {
    const param = productFilterData[key as keyof typeof productFilterData];

    switch (param?.filterType) {
      case "string":
        filteredProducts = filterByString<IProduct>(
          filteredProducts,
          value ?? "",
          param.productParam
        );
        break;
      case "slider":
        filteredProducts = sliderFilter(
          filteredProducts,
          {
            min: params[`${param.filter}min` as keyof typeof params],
            max: params[`${param.filter}max` as keyof typeof params],
          },
          param.productParam
        );
        break;
      case "isInStock":
        filteredProducts = filterIsInStock<IProduct>(
          filteredProducts,
          value === "true",
          param.productParam
        );
        break;
      default:
        break;
    }
  });

  return filteredProducts;
};

function filterIsInStock<T>(items: T[], isInStock: boolean, param: string) {
  return items.filter((item) => {
    const productParam = item[param as keyof typeof item];
    if (isInStock && (productParam as number) > 0) {
      return item;
    }

    if (!isInStock && productParam === 0) {
      return item;
    }
  });
}

function filterByString<T>(items: T[], filterParam: string, param: string) {
  return items.filter((item) => {
    const productParam = item[param as keyof typeof item];
    if (getLoweredLetters(String(productParam)).includes(filterParam ?? "")) {
      return item;
    }
  });
}

function sliderFilter<T>(
  items: T[],
  {
    min,
    max,
  }: { min: number | undefined | string; max: number | undefined | string },
  unity: string
) {
  const minParam = !min || Number(min).toString() === "NaN" ? 0 : min;
  const maxParam = !max || Number(max).toString() === "NaN" ? Infinity : max;

  return items.filter((item) => {
    const productUnity = item[unity as keyof typeof item];
    if (productUnity && productUnity >= minParam && productUnity <= maxParam) {
      return item;
    }
  });
}


export const productFilterData = Object.freeze({
  search: {
    filter: "search",
    productParam: "name",
    filterType: "string",
  },
  category: {
    filter: "category",
    productParam: "categoryId",
    filterType: "string",
  },
  manufacturer: {
    filter: "manufacturer",
    productParam: "manufacturerId",
    filterType: "string",
  },
  pricemin: {
    filter: "price",
    productParam: "price",
    filterType: "slider",
  },
  pricemax: {
    filter: "price",
    productParam: "price",
    filterType: "slider",
  },
  weightmin: {
    filter: "weight",
    productParam: "weight",
    filterType: "slider",
  },
  weightmax: {
    filter: "weight",
    productParam: "weight",
    filterType: "slider",
  },
  ratingmin: {
    filter: "rating",
    productParam: "averageRating",
    filterType: "slider",
  },
  ratingmax: {
    filter: "rating",
    productParam: "averageRating",
    filterType: "slider",
  },
  instock: {
    filter: "instock",
    productParam: "stockQuantity",
    filterType: "isInStock",
  },
});

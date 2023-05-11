export const updateItemInArrayById = (arr: any[], newItem: any) => {
  const filteredArray = arr.filter((t) => t.id !== newItem.id);
  return [newItem, filteredArray];
};

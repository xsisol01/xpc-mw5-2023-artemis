import { FC, memo } from "react";

import { ICategory } from "@/app/types/category.type";

import { capitalize, Typography } from "@mui/material";

interface IProps {
  category?: ICategory;
}

const CategoryContent: FC<IProps> = memo(({ category }) => {
  return (
    <Typography variant="h5" sx={{ textAlign: "center" }}>
      {capitalize(category?.name ?? "Category list is empty")}
    </Typography>
  );
});

CategoryContent.displayName = "CategoryContent";

export default CategoryContent;

import { FC, memo } from "react";

import { ICategory } from "@/app/types/category.type";

import { capitalize, Typography } from "@mui/material";

const CategoryContent: FC<ICategory> = memo(({ name }) => {
  return (
    <Typography variant="h5" sx={{ textAlign: "center" }}>
      {capitalize(name)}
    </Typography>
  );
});

CategoryContent.displayName = "CategoryContent";

export default CategoryContent;

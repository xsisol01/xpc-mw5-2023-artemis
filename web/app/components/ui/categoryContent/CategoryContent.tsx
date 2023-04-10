import { RoleContext } from "@/app/providers/roleContextProvider";
import { ICategory } from "@/app/types/category.type";
import { capitalize, Typography } from "@mui/material";
import { FC, useContext } from "react";

const CategoryContent: FC<ICategory> = ({ name }) => {
  return <Typography variant="h5">{capitalize(name)}</Typography>;
};

export default CategoryContent;

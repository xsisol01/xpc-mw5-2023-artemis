import { FC, memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUpdateCategory } from "@/app/hooks/category/useUpdateCategory";
import { ICategory, ICreateCategory } from "@/app/types/category.type";
import { categoryPageData } from "./categoryPage.data";

import { Grid } from "@mui/material";

import RightDeleteButton from "@/app/components/shared/button/deleteButton/RightDeleteButton";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";
import CategoryForm from "../../shared/form/categoryForm/CategoryForm";

const AdminCategoryPage: FC<ICategory> = memo((props) => {
  const { handleSubmit, control } = useForm<ICategory>({
    defaultValues: props,
  });

  const { isLoading, updateCategory } = useUpdateCategory(props);

  const onSubmit = async (data: ICreateCategory) => {
    const formData = {
      ...data,
      id: props.id
    }

    await updateCategory(formData);
  };

  return (
    <>
      <CategoryForm
        onSubmit={onSubmit}
        defaultValues={props}
        isLoading={isLoading}
      />
      <RightDeleteButton id={props.id} elementType="category" />
    </>
  );
});

AdminCategoryPage.displayName = "AdminCategoryPage";

export default AdminCategoryPage;

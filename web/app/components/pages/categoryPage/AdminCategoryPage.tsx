import { FC, memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUpdateCategory } from "@/app/hooks/category/useUpdateCategory";
import { ICategory } from "@/app/types/category.type";
import { categoryPageData } from "./categoryPage.data";

import { Grid } from "@mui/material";

import RightDeleteButton from "@/app/components/shared/button/deleteButton/RightDeleteButton";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";

const AdminCategoryPage: FC<ICategory> = memo((props) => {
  const { handleSubmit, control } = useForm<ICategory>({
    defaultValues: props,
  });

  const { isLoading, updateCategory } = useUpdateCategory(props);

  const onSubmit: SubmitHandler<ICategory> = async (data: ICategory) => {
    const formData = {
      ...props,
      ...data,
    };

    await updateCategory(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container></Grid>
        {categoryPageData.fields.map((field) => (
          <Grid item key={field.name} xs={field.xs} md={field.md}>
            <FormInput
              name={field.name}
              control={control}
              validation={field.validation}
            />
          </Grid>
        ))}
        <RightSubmitButton disabled={isLoading} />
      </form>
      <RightDeleteButton id={props.id} elementType="category" />
    </>
  );
});

AdminCategoryPage.displayName = "AdminCategoryPage";

export default AdminCategoryPage;

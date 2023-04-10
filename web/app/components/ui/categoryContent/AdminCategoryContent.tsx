import { regex } from "@/app/data/regex";
import { useUpdateCategory } from "@/app/hooks/category/useUpdateCategory";
import { ICategory } from "@/app/types/category.type";
import { capitalize, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RightSubmitButton from "../../shared/button/submitButton/RightSubmitButton";
import FormInput from "../../shared/formFields/FormInput";
import { categoryContentData } from "./categoryContent.data";

const AdminCategoryContent: FC<ICategory> = (props) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container></Grid>
      {categoryContentData.fields.map((field) => (
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
  );
};

export default AdminCategoryContent;

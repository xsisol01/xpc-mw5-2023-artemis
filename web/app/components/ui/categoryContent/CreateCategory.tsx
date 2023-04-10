import { regex } from "@/app/data/regex";
import { useCreateCategory } from "@/app/hooks/category/useCreateCategory";
import { useUpdateCategory } from "@/app/hooks/category/useUpdateCategory";
import { ICategory, ICreateCategory } from "@/app/types/category.type";
import { capitalize, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RightSubmitButton from "../../shared/button/submitButton/RightSubmitButton";
import FormInput from "../../shared/formFields/FormInput";
import { categoryContentData } from "./categoryContent.data";

const CreateCategory: FC = () => {

  const { handleSubmit, control, reset } = useForm<ICreateCategory>({
    defaultValues: categoryContentData.defaultValues,
  });

  const { isLoading, createCategory, isSuccess } = useCreateCategory(categoryContentData.defaultValues);


  useEffect(() => {
    if(isSuccess) {
      reset(categoryContentData.defaultValues)
    }
  }, [isSuccess])

  const onSubmit: SubmitHandler<ICreateCategory> = async (data: ICreateCategory) => {
    await createCategory(data);
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

export default CreateCategory;

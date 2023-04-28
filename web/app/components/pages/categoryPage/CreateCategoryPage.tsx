import { FC, useEffect, memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCreateCategory } from "@/app/hooks/category/useCreateCategory";
import { ICreateCategory } from "@/app/types/category.type";
import { categoryPageData } from "./categoryPage.data";

import { Grid } from "@mui/material";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";

const CreateCategoryPage: FC = memo(() => {
  const { handleSubmit, control, reset } = useForm<ICreateCategory>({
    defaultValues: categoryPageData.defaultValues,
  });

  const { isLoading, createCategory, isSuccess } = useCreateCategory(
    categoryPageData.defaultValues
  );

  useEffect(() => {
    if (isSuccess) {
      reset(categoryPageData.defaultValues);
    }
  }, [isSuccess, reset]);

  const onSubmit: SubmitHandler<ICreateCategory> = async (
    data: ICreateCategory
  ) => {
    await createCategory(data);
  };

  return (
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
  );
});

CreateCategoryPage.displayName = "CreateCategoryPage";

export default CreateCategoryPage;

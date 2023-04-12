
import { useCreateCategory } from "@/app/hooks/category/useCreateCategory";
import { ICreateCategory } from "@/app/types/category.type";
import { Grid } from "@mui/material";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RightSubmitButton from "../../shared/button/submitButton/RightSubmitButton";
import FormInput from "../../shared/formFields/formInput/FormInput";
import { categoryPageData } from "./categoryPage.data";

const CreateCategoryPage: FC = () => {

  const { handleSubmit, control, reset } = useForm<ICreateCategory>({
    defaultValues: categoryPageData.defaultValues,
  });

  const { isLoading, createCategory, isSuccess } = useCreateCategory(categoryPageData.defaultValues);


  useEffect(() => {
    if(isSuccess) {
      reset(categoryPageData.defaultValues)
    }
  }, [isSuccess])

  const onSubmit: SubmitHandler<ICreateCategory> = async (data: ICreateCategory) => {
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
};

export default CreateCategoryPage;

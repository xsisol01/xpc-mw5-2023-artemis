
import { useUpdateCategory } from "@/app/hooks/category/useUpdateCategory";
import { ICategory } from "@/app/types/category.type";
import { Grid } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RightDeleteButton from "../../shared/button/deleteButton/RightDeleteButton";
import RightSubmitButton from "../../shared/button/submitButton/RightSubmitButton";
import FormInput from "../../shared/formFields/formInput/FormInput";
import { categoryPageData } from "./categoryPage.data";

const AdminCategoryPage: FC<ICategory> = (props) => {
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
    <RightDeleteButton id={props.id} elementType='category' />
    </>
    
      
  );
};

export default AdminCategoryPage;

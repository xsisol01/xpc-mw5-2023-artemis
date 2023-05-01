import { categoryPageData } from "@/app/components/pages/categoryPage/categoryPage.data";
import { ICreateCategory } from "@/app/types/category.type";
import { Grid } from "@mui/material";
import { FC, memo, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RightSubmitButton from "../../button/submitButton/RightSubmitButton";
import FormInput from "../../formFields/formInput/FormInput";

interface IProps {
  defaultValues: ICreateCategory;
  onSubmit: (data: ICreateCategory) => void;
  shouldReset?: boolean;
  isLoading: boolean;
}

const CategoryForm: FC<IProps> = memo(({
  defaultValues,
  onSubmit,
  shouldReset = false,
  isLoading
}) => {

  const {handleSubmit, reset, control} = useForm({
    defaultValues
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const submitForm: SubmitHandler<ICreateCategory> = async (
    data: ICreateCategory
  ) => {
    onSubmit(data);

    if (shouldReset) {
      reset(defaultValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
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
  )
})

CategoryForm.displayName = 'CategoryForm'

export default CategoryForm
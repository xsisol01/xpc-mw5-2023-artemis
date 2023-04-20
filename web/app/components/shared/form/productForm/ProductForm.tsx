import { productPageData } from "@/app/components/pages/productPage/productPage.data";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { IProductField } from "@/app/types/product.type";
import { capitalize, Grid } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import RightSubmitButton from "../../button/submitButton/RightSubmitButton";
import UploadImage from "../../button/uploadImage/UploadImage";
import FormInput from "../../formFields/formInput/FormInput";
import FormSelect from "../../formFields/formSelect/FormSelect";

interface IProps {
  onSubmit: (data: any) => void;
  defaultValues: any;
  isLoading: boolean;
}

const ProductForm: FC<IProps> = ({ onSubmit, defaultValues, isLoading }) => {
  const { categories } = useGetAllCategories();
  const { manufacturers } = useGetAllManufacturers();

  const { control, handleSubmit } = useForm({
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <Grid container>
        <Grid item xs={6}>
          <UploadImage />
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            {productPageData.fields.map(
              ({
                type,
                name,
                xs,
                md,
                required,
                rows,
                validation,
                placeholder
              }: IProductField) => (
                <Grid key={name} item xs={xs} md={md}>
                  {type === "text" ? (
                    <FormInput
                      name={name}
                      defaultValue={capitalize(
                        defaultValues[name]?.toString() ?? ""
                      )}
                      control={control}
                      required={required}
                      rows={rows}
                      validation={validation}
                      placeholder={placeholder}
                    />
                  ) : type === "select" ? (
                    getOptions(name)?.length && (
                      <FormSelect
                        name={name}
                        options={getOptions(name)?.map((t) => ({
                          ...t,
                          label: t.name,
                        }))}
                        defaultValue={getOptions(name)?.find(
                          (t) => t.id === defaultValues[name]
                        )}
                        control={control}
                        rows={rows}
                        required={required}
                        validation={validation}
                        placeholder={placeholder}
                      />
                    )
                  ) : (
                    <></>
                  )}
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      </Grid>
      <RightSubmitButton disabled={isLoading} />
    </form>
  );

  function getOptions(field: string) {
    switch (field) {
      case "manufacturerId":
        return manufacturers;
      case "categoryId":
        return categories;
      default:
        return [];
    }
  }
};

export default ProductForm;

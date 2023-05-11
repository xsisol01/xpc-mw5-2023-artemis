import { FC, memo, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { globalStyles } from "@/app/assets/styles/global.styles";
import { IProduct, IProductField } from "@/app/types/product.type";

import { productPageData } from "@/app/components/pages/productPage/productPage.data";
import { capitalize, Grid } from "@mui/material";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import UploadImage from "@/app/components/shared/uploadImage/UploadImage";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";
import FormSelect from "@/app/components/shared/formFields/formSelect/FormSelect";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";
import { CategoryContext } from "@/app/providers/categoryContextProvider";
import { newProductData } from "@/app/components/pages/productPage/newProduct.data";

interface IProps {
  onSubmit: (data: any) => void;
  defaultValues: any;
  isLoading: boolean;
  shouldReset?: boolean;
}

const ProductForm: FC<IProps> = memo(
  ({ onSubmit, defaultValues, isLoading, shouldReset = false }) => {
    const { manufacturers } = useContext(ManufacturerContext);
    const { categories } = useContext(CategoryContext);

    const { control, handleSubmit, getValues, reset } = useForm({
      defaultValues,
    });

    const submitForm: SubmitHandler<IProduct> = async (data: IProduct) => {
      onSubmit(data);

      if (shouldReset) {
        reset(newProductData);
      }
    };

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

    return (
      <form onSubmit={handleSubmit(submitForm)}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <UploadImage
              control={control}
              name="imageUrl"
              imageUrl={getValues("imageUrl") || "/imagePlaceholder.png"}
            />
          </Grid>
          <Grid item xs={6} sx={{ pt: 2, ...globalStyles.fullScroll }}>
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
                  placeholder,
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
            <RightSubmitButton disabled={isLoading} />
          </Grid>
        </Grid>
      </form>
    );
  }
);

ProductForm.displayName = "ProductForm";

export default ProductForm;

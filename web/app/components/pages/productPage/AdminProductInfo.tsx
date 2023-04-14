import { FC, memo } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { productPageData } from "@/app/components/pages/productPage/productPage.data";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { Grid} from "@mui/material";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { IProduct, IProductField } from "@/app/types/product.type";
import { useUpdateProduct } from "@/app/hooks/product/useUpdateProduct";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";
import FormSelect from "@/app/components/shared/formFields/formSelect/FormSelect";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import UploadImage from "@/app/components/shared/button/uploadImage/UploadImage";

const AdminProductInfo: FC<IProduct> = memo((props) => {
  const { categories } = useGetAllCategories();
  const { manufacturers } = useGetAllManufacturers();
  const { isLoading, updateProduct } = useUpdateProduct(props);
  const { handleSubmit, control } = useForm<IProduct>({
    defaultValues: props,
  });

  const onSubmit: SubmitHandler<IProduct> = async (data: IProduct) => {
    await updateProduct(data);
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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <Grid container>
        <Grid item xs={6}>
          <UploadImage />
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            {productPageData.fields.map(
              ({ type, name, xs, md, required, rows, validation }: IProductField) => (
                  <Grid key={name} item xs={xs} md={md}>
                    {type === "text" ? (
                      <FormInput
                        name={name}
                        defaultValue={capitalizeText(
                          props[name]?.toString())
                        }
                        control={control}
                        required={required}
                        rows={rows}
                        validation={validation}
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
                            (t) => t.id === props[name]
                          )}
                          control={control}
                          rows={rows}
                          required={required}
                          validation={validation}
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
});

export default AdminProductInfo;

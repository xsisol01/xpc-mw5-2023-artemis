import { FC, memo, useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { productPageData } from "../../../data/productPage.data";
import ProductInfoImages from "./productInfoImage/ProductInfoImages";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { IProduct, IProductField } from "@/app/types/product.type";
import { useUpdateProduct } from "@/app/hooks/product/useUpdateProduct";
import { PhotoCamera } from "@mui/icons-material";
import { Box } from "@mui/system";
import FormInput from "../../shared/formFields/FormInput";
import FormSelect from "../../shared/formFields/FormSelect";
import SubmitButton from "../../shared/button/submitButton/SubmitButton";

const AdminProductInfo: FC<IProduct> = memo((props) => {
  const { categories } = useGetAllCategories();
  const { manufacturers } = useGetAllManufacturers();
  const { isLoading, updateProduct } = useUpdateProduct(props);
  const { handleSubmit, control, watch } = useForm<IProduct>({
    defaultValues: props,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log("watch", value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<IProduct> = async (data: IProduct) => {
    await updateProduct(data);
  };

  function getOptions(field: string) {
    switch (field) {
      case "manufacturer":
        return manufacturers;
      case "category":
        return categories;
      default:
        return [];
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <Grid container>
        <Grid item xs={6}>
          <ProductInfoImages image={props.imageUrl} />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            {productPageData.fields.map(
              ({ type, name, xs, md, required, rows }: IProductField) => {
                return (
                  <Grid key={name} item xs={xs} md={md}>
                    {type === "text" ? (
                      <FormInput
                        name={name}
                        defaultValue={capitalizeText(props[name]?.toString())}
                        control={control}
                        required={required}
                        rows={rows}
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
                        />
                      )
                    ) : (
                      <></>
                    )}
                  </Grid>
                );
              }
            )}
          </Grid>
        </Grid>
      </Grid>

      <Box
        component="div"
        sx={{ display: "flex", justifyContent: "end", height: 40 }}
      >
        <SubmitButton disabled={isLoading} />
      </Box>
    </form>
  );
});

export default AdminProductInfo;

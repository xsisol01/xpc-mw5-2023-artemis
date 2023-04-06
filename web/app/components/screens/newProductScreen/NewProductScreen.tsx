import { FC, memo, useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import { newProductData } from "./newProduct.data";
import { productPageData } from "@/app/data/productPage.data";
import { ICreateProduct, IProductField } from "@/app/types/product.type";
import { capitalizeText } from "@/app/utils/capitalizeText";

import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { useCreateProduct } from "@/app/hooks/product/useCreateProduct";

import { Container, Grid } from "@mui/material";
import HeaderLayout from "@/app/components/layout/headerLayout/HeaderLayout";
import FormInput from "@/app/components/shared/formFields/FormInput";
import FormSelect from "@/app/components/shared/formFields/FormSelect";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import UploadImage from "@/app/components/shared/button/uploadImage/UploadImage";
import { ManufacturerContext } from "@/app/providers/manufacturerContextProvider";



const NewProductScreen: FC = memo(() => {
  const { categories } = useGetAllCategories();
  const { manufacturers } = useGetAllManufacturers();
  const { isLoading, createProduct } = useCreateProduct(newProductData);

  const {currentManufacturer} = useContext(ManufacturerContext)

  let defaultValues = newProductData

  if (currentManufacturer) {
    defaultValues = {
        ...defaultValues,
        manufacturer: currentManufacturer
    }
  }

  console.log('defaultValues', defaultValues)

  const { handleSubmit, control } = useForm<ICreateProduct>({
    defaultValues,
  });


  const onSubmit: SubmitHandler<ICreateProduct> = async (
    data: ICreateProduct
  ) => {
    await createProduct(data);
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
    <HeaderLayout>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <Grid container>
            <Grid item xs={6}>
              {/* <ProductInfoImages image={props.image} /> */}
              <UploadImage />
            </Grid>
            <Grid item xs={6} sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                {productPageData.fields.map(
                  ({ type, name, xs, md, required, rows }: IProductField) => {
          
                    return (
                      <Grid key={name} item xs={xs} md={md}>
                        {type === "text" 
                        ? (
                          <FormInput
                            name={name}
                            defaultValue={capitalizeText(
                                defaultValues[name]?.toString() ?? ""
                            )}
                            control={control}
                            required={required}
                            rows={rows}
                          />
                        ) : type === "select" 
                        ? (
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

          <RightSubmitButton disabled={isLoading} />
        </form>
      </Container>
    </HeaderLayout>
  );
});

export default NewProductScreen;

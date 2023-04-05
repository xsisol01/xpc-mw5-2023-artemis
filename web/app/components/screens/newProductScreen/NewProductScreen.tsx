import {FC, memo, useEffect} from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

import { newProductData } from "./newProduct.data"
import { productPageData } from '@/app/data/productPage.data'
import { ICreateProduct, IProductField } from "@/app/types/product.type"
import { capitalizeText } from "@/app/utils/capitalizeText"

import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllManufacturers } from "@/app/hooks/manufacturer/useGetAllManufacturers";
import { useCreateProduct } from "@/app/hooks/product/useCreateProduct";

import { Button, Container, Grid, IconButton, Stack } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Box } from "@mui/system";
import HeaderLayout from '@/app/components/layout/headerLayout/HeaderLayout'
import FormInput from "@/app/components/shared/formFields/FormInput";
import FormSelect from "@/app/components/shared/formFields/FormSelect";
import SubmitButton from '@/app/components/shared/button/submitButton/SubmitButton';

const NewProductScreen: FC = memo(() => {
  const { categories } = useGetAllCategories();
  const { manufacturers } = useGetAllManufacturers();
  const { isLoading, createProduct } = useCreateProduct(newProductData);
  const { handleSubmit, control, watch } = useForm<ICreateProduct>({defaultValues: newProductData});

  useEffect(() => {
      const subscription = watch((value, { name, type }) => console.log('watch', value, name, type));
      return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<ICreateProduct> = async (data: ICreateProduct) => {
      await createProduct(data);
  };

  function getOptions(field: string) {
      switch (field) {
          case 'manufacturer':
              return manufacturers
          case 'category':
              return categories
          default:
              return []
      }
  }

  return (
    <HeaderLayout>
      <Container>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
            <Grid container >
                <Grid item xs={6}>
                    {/* <ProductInfoImages image={props.image} /> */}
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
                <Grid item xs={6} sx={{mb: 2}}>
                    <Grid container spacing={2}>
                        {productPageData.fields.map(({type, name, xs, md, required, rows}: IProductField)  => {
                            return (
                                <Grid key={name} item xs={xs} md={md}>
                                    {
                                        type === 'text' 
                                        ? (
                                            <FormInput
                                                name={name}
                                                defaultValue={capitalizeText(newProductData[name]?.toString() ?? '')}
                                                control={control}
                                                required={required}
                                                rows={rows}
                                            />
                                        )
                                        : type === 'select' 
                                        ? getOptions(name)?.length && (
                                                <FormSelect
                                                    name={name}
                                                    options={getOptions(name)?.map(t => ({...t, label: t.name}))}
                                                    defaultValue={
                                                        getOptions(name)?.find(t => 
                                                            t.name.toLowerCase() === newProductData[name]?.toString().toLowerCase()
                                                        )
                                                    }
                                                    control={control}
                                                    rows={rows}
                                                    required={required}
                                                />
                                        ) : <></>
                                    }
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>

            <Box component='div' sx={{ display: "flex", justifyContent: "end", height: 40 }}>
                <SubmitButton disabled={isLoading} />
            </Box>
        </form>
      </Container>
    </HeaderLayout>
  ) 
})

export default NewProductScreen
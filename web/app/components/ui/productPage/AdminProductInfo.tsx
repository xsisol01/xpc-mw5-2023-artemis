import { FC, memo, useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { IProductField, productPageData } from "./productPage.data";
import ProductInfoImages from "./productInfoImage/ProductInfoImages";
import { useRouter } from "next/router";
import { useGetAllCategories } from "@/app/hooks/category/useGetAllCategories";
import { useGetAllProducers } from "@/app/hooks/producer/useGetAllProducers";
import {
    Button,
    Grid,
    IconButton,
    Stack,
} from "@mui/material";
import { capitalizeText } from "@/app/utils/capitalizeText";
import { IProduct } from "@/app/types/product.type";
import { useUpdateProduct } from "@/app/hooks/product/useUpdateProduct";
import { PhotoCamera } from "@mui/icons-material";
import { Box } from "@mui/system";
import FormInput from "../../shared/formFields/FormInput";
import FormSelect from "../../shared/formFields/FormSelect";

const AdminProductInfo: FC<IProduct> = memo((props) => {
    const [formData, setFormData] = useState<IProduct>(props);

    console.log(props);

    const { categories } = useGetAllCategories();
    const { producers } = useGetAllProducers();

    const router = useRouter();
    const { producer } = router.query;

    const { handleSubmit, control, watch } = useForm<IProduct>({defaultValues: formData});

    useEffect(() => {
        const subscription = watch((value, { name, type }) => console.log(value, name, type));
        return () => subscription.unsubscribe();
    }, [watch]);


    const { isLoading, updateProduct } = useUpdateProduct(formData);

    const onSubmit: SubmitHandler<IProduct> = async (data: IProduct) => {
        await updateProduct(data);
    };

    function getOptions(field: string) {
        switch (field) {
            case 'producer':
                return producers
            case 'category':
                return categories
            default:
                return []
        }
    }

    return (
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
                                                defaultValue={capitalizeText(formData[name]?.toString())}
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
                                                            t.name.toLowerCase() === formData[name].toString().toLowerCase()
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
                <Button
                    variant="contained"
                    disabled={isLoading}
                    type="submit"
                    color="success"
                >
                    {productPageData.submit}
                </Button>
            </Box>
        </form>
    );
});

export default AdminProductInfo;

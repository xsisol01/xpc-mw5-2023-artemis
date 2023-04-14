import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form";

import { ICreateManufacturer, IManufacturerField } from "@/app/types/manufacturer.type";

import { useCreateManufacturer } from "@/app/hooks/manufacturer/useCreateManufacturer";

import { Grid } from "@mui/material"
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import UploadImage from "@/app/components/shared/button/uploadImage/UploadImage";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";
import { manufacturerPageData } from "@/app/components/pages/manufacturerPage/manufacturerPage.data";



const CreateManufacturerScreen: FC = () => {

  const {defaultValues} = manufacturerPageData

  const { isLoading, createManufacturer } =
    useCreateManufacturer(defaultValues);

  const { handleSubmit, control } = useForm<ICreateManufacturer>({
    defaultValues
  });

  const onSubmit: SubmitHandler<ICreateManufacturer> = async (
    data: ICreateManufacturer
  ) => {
    await createManufacturer(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} md={5} sx={{mb: 2}}>
            <UploadImage />
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2} sx={{mb: 2}}>
              {manufacturerPageData.fields.map(({name, rows, xs, md, required}: IManufacturerField) => (
                <Grid item key={name} xs={xs} md={md}>
                  <FormInput
                    defaultValue={defaultValues[name]}
                    control={control}
                    name={name}
                    required={required}
                    rows={rows}
                  />
                </Grid>
              ))}
            </Grid>
            <RightSubmitButton disabled={isLoading} />
          </Grid>
        </Grid>
      </form>
  )
}

export default CreateManufacturerScreen
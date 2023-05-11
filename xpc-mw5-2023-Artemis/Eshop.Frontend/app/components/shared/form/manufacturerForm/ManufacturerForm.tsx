import { manufacturerPageData } from "@/app/components/pages/manufacturerPage/manufacturerPage.data";
import { routes } from "@/app/data/routes";
import { RoleContext } from "@/app/providers/roleContextProvider";
import {
  ICreateManufacturer,
  IManufacturerField,
} from "@/app/types/manufacturer.type";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { FC, memo, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import FormInput from "@/app/components/shared//formFields/formInput/FormInput";
import UploadImage from "@/app/components/shared//uploadImage/UploadImage";

interface IProps {
  defaultValues: ICreateManufacturer;
  onSubmit: (data: ICreateManufacturer) => void;
  shouldReset?: boolean;
  isLoading: boolean;
}

const ManufacturerForm: FC<IProps> = memo((props) => {
  const { push } = useRouter();
  const { isAdmin } = useContext(RoleContext);
  const { defaultValues, onSubmit, shouldReset = false, isLoading } = props;
  const { handleSubmit, reset, control, getValues } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  if (!isAdmin) {
    push(routes.manufacturer);
  }

  let imageUrl: string = getValues("imageUrl");

  if (!imageUrl.length) {
    imageUrl = "/imagePlaceholder.png";
  }

  const submitForm: SubmitHandler<ICreateManufacturer> = async (
    data: ICreateManufacturer
  ) => {
    onSubmit(data);

    if (shouldReset) {
      reset(defaultValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Grid container sx={{ mb: 2 }} spacing={2}>
        <Grid item xs={12} md={6} sx={{ mb: 2, pt: 3 }}>
          <UploadImage
            control={control}
            name=""
            imageUrl={imageUrl}
            sx={{
              mt: 4.5,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {manufacturerPageData.fields.map(
              ({ name, rows, xs, md, required }: IManufacturerField) => (
                <Grid item key={name} xs={xs} md={md}>
                  <FormInput
                    defaultValue={defaultValues[name]}
                    control={control}
                    name={name}
                    required={required}
                    rows={rows}
                  />
                </Grid>
              )
            )}
          </Grid>
          <RightSubmitButton disabled={isLoading} />
        </Grid>
      </Grid>
    </form>
  );
});

ManufacturerForm.displayName = "ManufacturerForm";

export default ManufacturerForm;

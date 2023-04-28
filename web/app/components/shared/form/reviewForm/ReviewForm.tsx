import { FC, memo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

// import { useGetProduct } from "@/app/hooks/product/useGetProduct";
// import { useUpdateProduct } from "@/app/hooks/product/useUpdateProduct";
// import { IProduct } from "@/app/types/product.type";
import { ICreateProductReview, IProductReview } from "@/app/types/review.type";

import { CircularProgress, Paper } from "@mui/material";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";
import Rating from "@/app/components/shared/rating/Rating";

const reviewFromData = Object.freeze({
  title: "title",
  description: "description",
  stars: "stars",
});

interface IProps {
  productId: string;
}

const ReviewForm: FC<IProps> = memo(({ productId }) => {
  // const {product, isLoading: isProductLoading} = useGetProduct(productId)

  // if (!product && isProductLoading) {
  //   return null
  // }

  // if(!product) {
  //   return null
  // }

  const { control, handleSubmit } = useForm({
    defaultValues: {} as IProductReview,
  });

  //const { isLoading, updateProduct } = useUpdateProduct({} as IProduct);

  const onSubmit: SubmitHandler<ICreateProductReview> = async (
    data: ICreateProductReview
  ) => {
    console.log(data);
  };

  return (
    <Paper
      elevation={0}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ px: 1 }}
    >
      <FormInput control={control} name={reviewFromData.title} sx={{ my: 2 }} />
      <Controller
        control={control}
        name={reviewFromData.stars}
        render={({ field: { onChange } }) => (
          <Rating
            disabled={false}
            onChange={onChange}
            style={{ marginBottom: "8px" }}
            readOnly={false}
          />
        )}
      />
      <FormInput control={control} name={reviewFromData.description} rows={5} />
      <RightSubmitButton disabled={false} />
    </Paper>
  );
});

ReviewForm.displayName = "ReviewForm";

export default ReviewForm;

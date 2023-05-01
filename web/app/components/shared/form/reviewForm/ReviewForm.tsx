import { FC, memo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

// import { useGetProduct } from "@/app/hooks/product/useGetProduct";
// import { useUpdateProduct } from "@/app/hooks/product/useUpdateProduct";
// import { IProduct } from "@/app/types/product.type";
import { ICreateProductReview, IProductReview } from "@/app/types/review.type";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import RightSubmitButton from "@/app/components/shared/button/submitButton/RightSubmitButton";
import FormInput from "@/app/components/shared/formFields/formInput/FormInput";
import Rating from "@/app/components/shared/rating/Rating";
import { useCreateReview } from "@/app/hooks/review/useCreateReview";
import { ReviewFormData } from "./reviewFormData";

const reviewFromData = Object.freeze({
  title: "title",
  description: "description",
  stars: "stars",
});

interface IProps {
  productId: string;
}

const ReviewForm: FC<IProps> = memo(({ productId }) => {
  const { createReview, isLoading } = useCreateReview(
    ReviewFormData.defaultValues
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: ReviewFormData.defaultValues,
  });

  const onSubmit: SubmitHandler<IProductReview> = async (
    data: IProductReview
  ) => {
    const newReview = {
      ...data,
      id: productId,
    };

    if (isValid(data)) {
      createReview(newReview);
      reset(ReviewFormData.defaultValues)
    } else {
      alert("Fill all fields");
    }
  };

  const isValid = (obj: IProductReview) => {
    return (
      obj.description &&
      obj.description.length > 0 &&
      obj.title &&
      obj.title.length > 0
    );
  };

  return (
    <Paper
      elevation={0}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ px: 1 }}
    >
      <FormInput
        control={control}
        required={true}
        name={reviewFromData.title}
        sx={{ my: 2 }}
        autoFocus={true}
      />
      <Controller
        rules={{
          required: true,
        }}
        control={control}
        name={reviewFromData.stars}
        render={({ field: { onChange, value } }) => (
            <Rating
              rate={value}
              disabled={false}
              onChange={onChange}
              style={{ marginBottom: "16px" }}
              readOnly={false}
            />
        )}
      />
      <FormInput
        control={control}
        required={true}
        name={reviewFromData.description}
        rows={5}
      />
      <RightSubmitButton disabled={isLoading} />
    </Paper>
  );
});

ReviewForm.displayName = "ReviewForm";

export default ReviewForm;

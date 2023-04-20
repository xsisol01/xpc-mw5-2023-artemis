import { useGetProduct } from "@/app/hooks/product/useGetProduct";
import { useUpdateProduct } from "@/app/hooks/product/useUpdateProduct";
import { IProduct } from "@/app/types/product.type";
import { ICreateProductReview, IProductReview } from "@/app/types/review.type";
import { CircularProgress } from "@mui/material";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RightSubmitButton from "../../button/submitButton/RightSubmitButton";
import FormInput from "../../formFields/formInput/FormInput";
import Rating from "../../rating/Rating";

const reviewFromData = Object.freeze({
  title: "title",
  description: "description",
  stars: 'stars'
});

interface IProps {
  productId: string
}

const ReviewForm: FC<IProps> = ({productId}) => {

  const {product, isLoading: isProductLoading} = useGetProduct(productId)

  if (!product && isProductLoading) {
    return null
  }

  if(!product) {
    return null
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {} as IProductReview
  });

  // const { isLoading, updateProduct } = useUpdateProduct({} as IProduct);

  // const onSubmit: SubmitHandler<IProduct> = async (data: ICreateProductReview) => {
  //   await updateProduct({
  //     ...product,
  //     reviews: [
  //       ...product?.reviews,
  //       ...data
  //     ]
  //   });
  // };

  return null

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <FormInput control={control} name={reviewFromData.title} sx={{ mb: 2 }} />
  //     <Controller
  //       control={control}
  //       name={reviewFromData.stars}
  //       render={({
  //         field: { onChange },
  //       }) => (
  //         <Rating disabled={false} onChange={onChange} />
  //       )}
  //     />
      
  //     <FormInput control={control} name={reviewFromData.description} rows={5} />
  //     <RightSubmitButton disabled={isLoading} />
  //   </form>
  // );
};

export default ReviewForm;

import { IProductReview } from "@/app/types/review.type";

export const ReviewFormData = Object.freeze({
  defaultValues: {
    id: "",
    stars: 0,
    description: "",
    title: "",
  } as IProductReview,
});

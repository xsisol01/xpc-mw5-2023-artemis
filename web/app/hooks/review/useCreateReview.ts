import { notificationType } from "@/app/providers/notificationContextProvider";
import { useContext } from "react";
import { NotificationContext } from "@/app/providers/notificationContextProvider";
import { useRouter } from "next/router";
import { ReviewService } from "./../../services/review.service";
import { IProductReview } from "@/app/types/review.type";
import { useMutation } from "react-query";

export const useCreateReview = (data: IProductReview) => {
  const { addMessage } = useContext(NotificationContext);
  const { push } = useRouter();

  const {
    isLoading,
    mutateAsync: createReview,
    isSuccess,
  } = useMutation(
    ["create review", data],
    (data: IProductReview) => ReviewService.create(data),
    {
      onSuccess: ({ config }) => {
        addMessage({
          type: notificationType.success,
          text: "Review has been created",
        });
        const { data: reviewData } = config;
        const parsedReviewData = JSON.parse(reviewData);

        push(`/product/${parsedReviewData.id}`);
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "Review has not been created",
        });
        console.log(error);
      },
    }
  );

  return { isLoading, createReview, isSuccess };
};

import { notificationType } from '@/app/providers/notificationContextProvider';
import { useContext } from 'react';
import { NotificationContext } from '@/app/providers/notificationContextProvider';
import { ReviewService } from './../../services/review.service';
import { useRouter } from "next/router";
import { useMutation } from "react-query";

export const useDeleteReview = (id: string) => {
  const {addMessage} = useContext(NotificationContext)
  const router = useRouter();
  const { push } = router;

  const { isLoading, mutateAsync: deleteReview } = useMutation(
    ["delete review", id],
    (id: string) => ReviewService.delete(id),
    {
      onSuccess: () => {
        addMessage({
          type: notificationType.success,
          text: "Review has been deleted"
        })

        push("/");
      },
      onError: (error) => {
        addMessage({
          type: notificationType.error,
          text: "Review has not been deleted"
        })
        console.log(error);
      },
    }
  );

  return { isLoading, deleteReview };
};

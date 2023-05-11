import { FC, memo } from "react";

import { reviewsData } from "./reviewsData";
import { IProductReview } from "@/app/types/review.type";

import ReviewItem from "@/app/components/ui/reviewItem/ReviewItem";
import Dropdown from "@/app/components/shared/dropdown/Dropdown";
import ReviewCreate from "@/app/components/ui/reviewItem/ReviewCreate";

interface IProps {
  reviews: IProductReview[];
  productId: string;
}

const Reviews: FC<IProps> = memo(({ productId, reviews }) => {
  const reverseReviews = [...reviews].reverse();

  return (
    <Dropdown
      contentHeight={0}
      wrapperHeight={0}
      wrapperWidth={0}
      title={reviewsData.title}
      defaultOpen={true}
    >
      <ReviewCreate productId={productId} />
      {reverseReviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </Dropdown>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;

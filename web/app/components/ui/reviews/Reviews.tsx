import { FC, memo } from "react";

import { reviewsData } from "./reviewsData";
import { IProductReview } from "@/app/types/review.type";

import ReviewItem from "./reviewItem/ReviewItem";
import Dropdown from "@/app/components/shared/dropdown/Dropdown";
import ReviewCreate from "./reviewItem/ReviewCreate";

interface IProps {
  reviews: IProductReview[];
}

const Reviews: FC<IProps> = memo(({ reviews }) => {
  return (
    <Dropdown
      contentHeight={0}
      wrapperHeight={0}
      wrapperWidth={0}
      title={reviewsData.title}
    >
      <ReviewCreate productId={"1"} />
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </Dropdown>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;

import { FC } from "react";

import { IProductReview } from "@/app/types/review.type";
import ReviewItem from "./reviewItem/ReviewItem";
import Dropdown from "../../shared/dropdown/Dropdown";
import { reviewsData } from "./reviewsData";
import ReviewCreate from "./reviewItem/ReviewCreate";

interface IProps {
  reviews: IProductReview[];
}

const Reviews: FC<IProps> = ({ reviews }) => {
  return (
    <Dropdown
      contentHeight={0}
      wrapperHeight={0}
      wrapperWidth={0}
      title={reviewsData.title}
    >
      <ReviewCreate productId={'1'} />
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </Dropdown>
  );
};

export default Reviews;

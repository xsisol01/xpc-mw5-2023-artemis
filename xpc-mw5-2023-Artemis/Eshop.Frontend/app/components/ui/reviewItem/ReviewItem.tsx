import { FC, memo } from "react";

import { IProductReview } from "@/app/types/review.type";

import {
  Box,
  capitalize,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Rating from "@/app/components/shared/rating/Rating";

const ReviewItem: FC<IProductReview> = memo(
  ({ id, title, stars, description }) => {
    return (
      <Card sx={{ mb: 1 }}>
        <CardHeader title={title} sx={{ pb: 1 }} />
        <CardContent sx={{ pt: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Rating rate={stars} />
          </Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {capitalize(description)}
          </Typography>
        </CardContent>
      </Card>
    );
  }
);

ReviewItem.displayName = "ReviewItem";

export default ReviewItem;

import { FC, useState, memo } from "react";

import { reviewData } from "./review.data";

import { Box, Button, Card } from "@mui/material";
import ReviewForm from "@/app/components/shared/form/reviewForm/ReviewForm";
import AddIcon from "@mui/icons-material/Add";

interface IProps {
  productId: string;
}

const ReviewCreate: FC<IProps> = memo(({ productId }) => {
  const [isFormShown, setIsFormShown] = useState(false);

  const toggleForm = () => {
    setIsFormShown((isShown) => !isShown);
  };

  return (
    <Card sx={{ mb: 1, width: "100%", minHeight: 48 }}>
      {!isFormShown ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 48,
            cursor: "pointer",
          }}
          onClick={toggleForm}
        >
          <AddIcon />
        </Box>
      ) : (
        <>
          <ReviewForm productId={productId} />
          <Button variant="text" onClick={toggleForm}>
            {reviewData.cancel}
          </Button>
        </>
      )}
    </Card>
  );
});

ReviewCreate.displayName = "ReviewCreate";

export default ReviewCreate;

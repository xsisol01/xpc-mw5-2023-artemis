import {
  Box,
  Button,
  capitalize,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import Rating from "@/app/components/shared/rating/Rating";
import ReviewForm from "@/app/components/shared/form/reviewForm/ReviewForm";
import AddIcon from "@mui/icons-material/Add";

interface IProps {
  productId: string
}

const ReviewCreate: FC<IProps> = ({productId}) => {
  const [isFormShown, setIsFormShown] = useState(false);

  const toggleForm = () => {
    setIsFormShown(isShown => !isShown)
  }

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
            cursor: 'pointer'
          }}
          onClick={toggleForm}
        >
          <AddIcon />
        </Box>
      ) : (
        <>
          <ReviewForm productId={productId} />
          <Button variant="text" onClick={toggleForm}>Cancel</Button>
        </>
        
      )}
    </Card>
  );
};

export default ReviewCreate;

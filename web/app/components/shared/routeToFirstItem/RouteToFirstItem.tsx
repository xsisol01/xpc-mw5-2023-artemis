import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";

interface IProps {
  items: any[] | undefined
  isLoading: boolean
  baseUrl: string
}

const RouteToFirstItem: FC<IProps> = ({ items, isLoading, baseUrl }) => {
  const router = useRouter();
  const { push } = router;

  if (isLoading) {
    return <CircularProgress />;
  }

  if (items?.length) {
    const firstCategoryId = items[0].id;

    push(`${baseUrl}/${firstCategoryId}`);
    return null;
  }

  return null;
};

export default RouteToFirstItem;

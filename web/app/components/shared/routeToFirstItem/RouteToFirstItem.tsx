import { FC, memo } from "react";
import { useRouter } from "next/router";

interface IProps {
  items: any[] | undefined;
  baseUrl: string;
}

const RouteToFirstItem: FC<IProps> = memo(({ items, baseUrl }) => {
  const router = useRouter();
  const { push } = router;

  if (items?.length) {
    const firstCategoryId = items[0].id;

    push(`${baseUrl}/${firstCategoryId}`);
    return null;
  }

  push("/404");
  return null;
});

RouteToFirstItem.displayName = "RouteToFirstItem";

export default RouteToFirstItem;

import { useDeleteCategory } from "@/app/hooks/category/useDeleteCategory";
import { useDeleteManufacturer } from "@/app/hooks/manufacturer/useDeleteManufacturer";
import { useDeleteProduct } from "@/app/hooks/product/useDeleteProduct";
import { Button } from "@mui/material";
import { FC, memo, useEffect } from "react";
import { UseMutateAsyncFunction } from "react-query";
import { deleteButtonData } from "./deleteButtonData";

interface IProps {
  className?: string;
  id: string | number;
  elementType: string;
  children?: React.ReactNode;
  style?: any
  sx?: any
}

const DeleteButton: FC<IProps> = memo(
  ({ className = "", id, elementType, children, style, sx }) => {

    const { isLoading: isProductLoading, deleteProduct } = useDeleteProduct(
      id.toString()
    );
    const { isLoading: isCategoryLoading, deleteCategory } = useDeleteCategory(
      id.toString()
    );
    const { isLoading: isManufacturerLoading, deleteManufacturer } =
      useDeleteManufacturer(id.toString());

    let deleteMethod: UseMutateAsyncFunction<void, unknown, string, unknown>;

    useEffect(() => {
      switch (elementType) {
        case "product":
          deleteMethod = deleteProduct;
          break;
        case "category":
          deleteMethod = deleteCategory;
          break;
        case "manufacturer":
          deleteMethod = deleteManufacturer;
          break;
        default:
          break;
      }
    }, []);

    function onDelete(event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation();
      event.preventDefault();
      event.nativeEvent.stopImmediatePropagation();

      const isConfirmed = confirm("Are you sure?");

      if (isConfirmed) {
        deleteMethod(id.toString());
      }
    }

    return (
      <Button
        variant="contained"
        disabled={isProductLoading || isCategoryLoading || isManufacturerLoading}
        type="submit"
        color="error"
        onClick={onDelete}
        style={style}
        sx={{
          color: '#d32f2f',
          border: '1px solid #d32f2f',
          '&:hover': {
            color: '#fff'
          },
          ...sx
        }}
        >
        {children ?? deleteButtonData.delete}
      </Button>
    );
  }
);

export default DeleteButton;

import { FC, memo, useEffect, useRef } from "react";
import { AxiosResponse } from "axios";
import { UseMutateAsyncFunction } from "react-query";

import { useDeleteCategory } from "@/app/hooks/category/useDeleteCategory";
import { useDeleteManufacturer } from "@/app/hooks/manufacturer/useDeleteManufacturer";
import { useDeleteProduct } from "@/app/hooks/product/useDeleteProduct";

import { Button } from "@mui/material";
import { deleteButtonData } from "./deleteButtonData";

interface IProps {
  id: string | number;
  elementType: string;
  children?: React.ReactNode;
  style?: any;
  sx?: any;
}

const DeleteButton: FC<IProps> = memo(
  ({ id, elementType, children, style, sx }) => {
    const { isLoading: isProductLoading, deleteProduct } = useDeleteProduct(
      id.toString()
    );
    const { isLoading: isCategoryLoading, deleteCategory } = useDeleteCategory(
      id.toString()
    );
    const { isLoading: isManufacturerLoading, deleteManufacturer } =
      useDeleteManufacturer(id.toString());

    const deleteMethod =
      useRef<
        UseMutateAsyncFunction<
          AxiosResponse<any, any>,
          unknown,
          string,
          unknown
        >
      >(deleteProduct);

    useEffect(() => {
      switch (elementType) {
        case "product":
          deleteMethod.current = deleteProduct;
          break;
        case "category":
          deleteMethod.current = deleteCategory;
          break;
        case "manufacturer":
          deleteMethod.current = deleteManufacturer;
          break;
        default:
          break;
      }
    }, [elementType]);

    function onDelete(event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation();
      event.preventDefault();
      event.nativeEvent.stopImmediatePropagation();

      const isConfirmed = confirm("Are you sure?");

      if (isConfirmed) {
        deleteMethod.current(id?.toString());
      }
    }

    return (
      <Button
        variant="contained"
        disabled={
          isProductLoading || isCategoryLoading || isManufacturerLoading
        }
        type="submit"
        color="error"
        onClick={onDelete}
        style={style}
        sx={{
          color: "#d32f2f",
          border: "1px solid #d32f2f",
          "&:hover": {
            color: "#fff",
          },
          ...sx,
        }}
      >
        {children ?? deleteButtonData.delete}
      </Button>
    );
  }
);

DeleteButton.displayName = "DeleteButton";

export default DeleteButton;

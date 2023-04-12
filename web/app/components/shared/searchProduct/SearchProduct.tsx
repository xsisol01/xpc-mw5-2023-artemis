import { useEffect, useState, FC, memo } from "react";

import classNames from "classnames";

import { FaSearch } from "react-icons/fa";

import { searchProductData } from "./searchProduct.data";

import style from "./searchProduct.module.scss";
import { getLoweredLetters } from "@/app/utils/getLoweredLetters";
import { CircularProgress, IconButton, InputBase, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "./SearchIcon";

export interface ISearchProductProps {
  uid: string;
  getParam?: (name: string) => string;
  setParam?: (name: string, value: string) => void;
}

const SearchProduct: FC<ISearchProductProps> = memo(
  ({ uid, getParam, setParam }) => {
    const { control, reset, watch } = useForm({
      defaultValues: {
        [uid]: getUrlParams(),
      },
    });

    useEffect(() => {
      const subscription = watch((value, { name }) => {
        if (value && name) {
          setUrlParams(value[uid] ?? "");
        }
      });

      return () => subscription.unsubscribe();
    }, [watch]);

    function resetSearchBar() {
      setUrlParams("");
      reset({ [uid]: "" });
    }

    function setUrlParams(text: string) {
      if (setParam) {
        setParam(uid, getLoweredLetters(text));
      }
    }

    function getUrlParams() {
      return getParam ? getParam(uid) : "";
    }

    return (
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          mb: 2,
        }}
      >
        <Controller
          control={control}
          name={"search"}
          render={({ field }) => (
            <>
              <InputBase
                {...field}
                sx={{ ml: 1, flex: 1 }}
                placeholder={searchProductData.placeholder}
                inputProps={{ "aria-label": searchProductData.ariaLabel }}
              />

              <SearchIcon value={field.value} onClose={resetSearchBar} />
            </>
          )}
        />
      </Paper>
    );
  }
);

export default SearchProduct;

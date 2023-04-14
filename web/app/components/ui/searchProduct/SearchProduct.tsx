import { useEffect, FC, memo, useState, useContext } from "react";

import { searchProductData } from "./searchProduct.data";

import { getLoweredLetters } from "@/app/utils/getLoweredLetters";
import { InputBase, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import SearchIcon from "./SearchIcon";
import { UrlSearchParamsContext } from "@/app/providers/urlSearchParamsProvider";


const SearchProduct: FC = memo(() => {
    const {getParam, setParam} = useContext(UrlSearchParamsContext)
    const {uid, placeholder, ariaLabel} = searchProductData

    const { control, reset, watch } = useForm({
      defaultValues: {
        [uid]: getParam(uid) ,
      },
    });

    useEffect(() => {
      const subscription = watch(value => {
          setUrlParams(value[uid]?.toString() ?? '');
      });

      return () => subscription.unsubscribe();
    }, [watch]);

    function resetSearchBar() {
      setUrlParams("");
      reset({ [uid]: "" });
    }

    function setUrlParams(text: string) {
      setParam(uid, getLoweredLetters(text));
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
                placeholder={placeholder}
                inputProps={{ "aria-label": ariaLabel }}
              />
              <SearchIcon value={field.value?.toString() ?? ''} onClose={resetSearchBar} />
            </>
          )}
        />
      </Paper>
    );
  }
);

export default SearchProduct;

import { useEffect, FC, memo, useState, useContext } from "react";

import { searchProductData } from "./searchProduct.data";

import { getLoweredLetters } from "@/app/utils/getLoweredLetters";
import { InputBase, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import SearchIcon from "./SearchIcon";
import { UrlSearchParamsContext } from "@/app/providers/urlSearchParamsProvider";
import FormInput from "../../shared/formFields/formInput/FormInput";

const SearchProduct: FC = memo(() => {
    const {getParam, setParam} = useContext(UrlSearchParamsContext)
    const {uid, placeholder, ariaLabel} = searchProductData

    console.log('SearchProduct', uid, getParam(uid))

    const { control, reset, watch, getValues } = useForm({
      defaultValues: {
        [uid]: getParam(uid)
      }
    });


    console.log('getValues', getValues())

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
          name={uid}
          render={({ field: { value, name, ref, ...restFieldData } }) => (
            <>
              <InputBase
                {...restFieldData}
                sx={{ ml: 1, flex: 1 }}
                defaultValue={value}
                placeholder={placeholder}
                inputRef={ref}
                inputProps={{ "aria-label": ariaLabel }}
              />
              <SearchIcon value={value?.toString() ?? ''} onClose={resetSearchBar} />
            </>
          )}
        />
        
      </Paper>
    );
  }
);

export default SearchProduct;

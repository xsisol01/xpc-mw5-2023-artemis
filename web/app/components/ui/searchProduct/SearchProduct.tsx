import { useEffect, FC, memo, useContext, useCallback } from "react";

import { searchProductData } from "./searchProduct.data";

import { getLoweredLetters } from "@/app/utils/getLoweredLetters";
import { InputBase, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import SearchIcon from "./SearchIcon";
import { UrlSearchParamsContext } from "@/app/providers/urlSearchParamsProvider";

const SearchProduct: FC = memo(() => {
  const { getParam, setParam } = useContext(UrlSearchParamsContext);
  const { uid, placeholder, ariaLabel } = searchProductData;

  const { control, reset, watch } = useForm({
    defaultValues: {
      [uid]: getParam(uid),
    },
  });

  const setUrlParams = useCallback(
    (text: string) => {
      setParam(uid, getLoweredLetters(text));
    },
    [setParam, uid]
  );

  useEffect(() => {
    const subscription = watch((value) => {
      setUrlParams(value[uid]?.toString() ?? "");
    });

    return () => subscription.unsubscribe();
  }, [watch, setUrlParams, uid]);

  function resetSearchBar() {
    setUrlParams("");
    reset({ [uid]: "" });
  }

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        mb: 2
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
            <SearchIcon
              value={value?.toString() ?? ""}
              onClose={resetSearchBar}
            />
          </>
        )}
      />
    </Paper>
  );
});

SearchProduct.displayName = "SearchProduct";

export default SearchProduct;

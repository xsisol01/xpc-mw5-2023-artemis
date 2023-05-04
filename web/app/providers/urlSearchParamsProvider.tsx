import { createContext, useMemo, FC, memo, useState, useEffect } from "react";
import { useRouter } from "next/router";

interface IContext {
  getParam: (name: string) => string | string[] | undefined;
  setParam: (name: string, value: string) => void;
  allParams: any;
  reset: () => void;
}

export const UrlSearchParamsContext = createContext<IContext>({} as IContext);

interface IProps {
  children: React.ReactNode;
}

const UrlSearchParamsProvider: FC<IProps> = memo(({ children }) => {
  const router = useRouter();

  const [searchParams, setSearchParams] = useState<typeof router.query>({});
  const [isDefaultValue, setIsDefaultValue] = useState(false);

  useEffect(() => {
    if (!isDefaultValue && router.isReady) {
      setSearchParams((prev) => ({ ...prev, ...router.query }));
      setIsDefaultValue(true);
    }
  });

  useEffect(() => {
    router.push({ query: searchParams });
  }, [searchParams]);

  const value = useMemo(
    () => ({
      getParam,
      setParam,
      allParams: searchParams,
      reset,
    }),
    [searchParams]
  );

  function reset() {
    setSearchParams({});
  }

  function getParam(paramName: string) {
    return searchParams[paramName as keyof typeof searchParams];
  }

  function setParam(name: string, value: string) {
    if (!value.length) {
      removeParam(name);
      return;
    }

    setSearchParams((prev) => ({
      ...prev,
      [name.toLowerCase()]: value.toLowerCase(),
    }));
  }

  function removeParam(name: string) {
    setSearchParams((prev) => {
      const filteredQueries = Object.entries(prev).filter(
        ([key, value]) => key !== name
      );

      return Object.fromEntries(filteredQueries);
    });
  }

  return router.isReady && isDefaultValue ? (
    <UrlSearchParamsContext.Provider value={value}>
      {children}
    </UrlSearchParamsContext.Provider>
  ) : null;
});

UrlSearchParamsProvider.displayName = "UrlSearchParamsProvider";

export default UrlSearchParamsProvider;

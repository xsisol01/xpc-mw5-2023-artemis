import { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { isObjectEqual } from "@/app/utils/isObjectEqual";

function withUrlSearchParams<T>(Component: FC<T>): FC<T> {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({});

  const [isDefaultValue, setIsDefaultValue] = useState(false);

  useEffect(() => {
    if (router.isReady && !isDefaultValue) {
      const { query } = router;
      setSearchParams(query);
      setIsDefaultValue(true);
    }
  });

  useEffect(() => {
    if (!isObjectEqual(searchParams, router.query)) {
      setSearchParams(router.query);
    }
  }, [router.query]);

  useEffect(() => {
    if (!isObjectEqual(searchParams, router.query)) {
      router.push({ query: searchParams });
    }
  }, [searchParams]);

  function getParam(paramName: string) {
    return searchParams[paramName as keyof typeof searchParams];
  }

  function setParam(name: string, value: string) {
    if (!value.length) {
      removeParam(name);
      return;
    }

    setSearchParams(prev => {
      return {
        ...prev,
        [name.toLowerCase()]: value.toLowerCase(),
      }
      
    });
  }

  function removeParam(name: string) {
    const filteredQueries = Object.entries(searchParams).filter(
      ([key, value]) => key !== name
    );

    setSearchParams(Object.fromEntries(filteredQueries));
  }

  return (props: T) => {
    return <Component {...props} getParam={getParam} setParam={setParam} />;
  };
}

export default withUrlSearchParams;

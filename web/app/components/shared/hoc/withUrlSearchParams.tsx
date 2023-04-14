import { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { isObjectEqual } from "@/app/utils/isObjectEqual";

function withUrlSearchParams<T>(Component: FC<T>): FC<T> {
  const router = useRouter();
  const {query: routerQuery} = router

  function getParam(paramName: string) {
    return  routerQuery[paramName as keyof typeof routerQuery];
  }

  function setParam(name: string, value: string) {
    if (!value.length) {
      removeParam(name);
      return;
    }

    router.push({ query: {
      ...routerQuery,
      [name.toLowerCase()]: value.toLowerCase()
    }})
  }

  function removeParam(name: string) {
    const filteredQueries = Object.entries(routerQuery).filter(
      ([key, value]) => key !== name
    );

    router.push({ query: Object.fromEntries(filteredQueries) as typeof routerQuery})
  }

  return (props: T) => (
      <Component {...props} getParam={getParam} setParam={setParam} />
    );
}

export default withUrlSearchParams;

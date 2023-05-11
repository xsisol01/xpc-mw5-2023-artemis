import { FC, memo, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

interface IProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryProvider: FC<IProps> = memo(({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
});

ReactQueryProvider.displayName = "ReactQueryProvider";

export default ReactQueryProvider;

import type { AppProps } from "next/app";

import ReactQueryProvider from "@/app/providers/reactQueryProvider";
import RoleContextProvider from "@/app/providers/roleContextProvider";
import ManufacturerContextProvider from "@/app/providers/manufacturerContextProvider";
import UrlSearchParamsProvider from "@/app/providers/urlSearchParamsProvider";
import ProductContextProvider from "@/app/providers/productContextProvider";
import CategoryContextProvider from "@/app/providers/categoryContextProvider";
import NotificationContextProvider from "@/app/providers/notificationContextProvider";

import "@/app/assets/styles/globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
        <ReactQueryProvider>
          <RoleContextProvider>
            <ProductContextProvider>
              <ManufacturerContextProvider>
                <CategoryContextProvider>
                  <UrlSearchParamsProvider>
                    <NotificationContextProvider>
                      <Component {...pageProps} />
                    </NotificationContextProvider>
                  </UrlSearchParamsProvider>
                </CategoryContextProvider>
              </ManufacturerContextProvider>
            </ProductContextProvider>
          </RoleContextProvider>
        </ReactQueryProvider>
      )
}

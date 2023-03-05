import '@/app/assets/styles/globals.css'
import type { AppProps } from 'next/app'

import {StoreProvider, RoleContextProvider} from '@/app/config/globalExport'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <RoleContextProvider>
        <Component {...pageProps} />
      </RoleContextProvider>
    </StoreProvider>
  ) 
}

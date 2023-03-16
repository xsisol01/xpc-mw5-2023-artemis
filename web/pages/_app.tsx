import '@/app/assets/styles/globals.css'
import RoleContextProvider from '@/app/providers/roleContextProvider'
import StoreProvider from '@/app/providers/storeProvider'
import type { AppProps } from 'next/app'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <RoleContextProvider>
        <Component {...pageProps} />
      </RoleContextProvider>
    </StoreProvider>
  ) 
}

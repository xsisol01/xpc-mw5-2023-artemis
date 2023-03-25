import '@/app/assets/styles/globals.css'
import ReactQueryProvider from '@/app/providers/reactQueryProvider'
import RoleContextProvider from '@/app/providers/roleContextProvider'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
        <RoleContextProvider>
          <Component {...pageProps} />
        </RoleContextProvider>
    </ReactQueryProvider>
  ) 
}

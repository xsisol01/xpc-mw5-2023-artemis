import Head from 'next/head'
import HomeScreen from '@/app/components/screens/homeScreen/HomeScreen'
import { useEffect } from 'react'
import { ProductService } from '@/app/services/product.service'

export default function Home() {

  return (
    <>
      <Head>
        <title>xpc-mw5</title>
        <meta name="description" content="xpc-mw5" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeScreen />
    </>
  )
}

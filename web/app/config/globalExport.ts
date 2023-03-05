
//COMPONENTS
import HeadButton from '@/app/components/ui/headButton/HeadButton'
import HeadLink from '@/app/components/ui/headButton/HeadLink'
import Container from '@/app/components/layout/container/Container'
import ProductInfo from '@/app/components/ui/productPage/ProductInfo' 
import ProductPage from '@/app/components/ui/productPage/ProductPage' 
import LoadMoreButton from "@/app/components/ui/loadMoreButton/LoadMoreButton"
import Product from "@/app/components/ui/productItem/ProductItem"
import Preloader from "@/app/components/shared/preloader/Preloader"
import Rating from "@/app/components/shared/rating/Rating"
import FilterProduct from '@/app/components/ui/filterProduct/FilterProduct'
import Products from '@/app/components/ui/products/Products'
import HeaderLayout from '@/app/components/layout/headerLayout/HeaderLayout'
import FilterDropdown from "@/app/components/shared/dropdown/dropdown"
import Slider from "@/app/components/shared/slider/Slider"
import ScrollableList from "@/app/components/shared/scrollableList/ScrollableList"
import SearchProduct from '@/app/components/shared/searchProduct/SearchProduct'
import Logo from '@/app/components/shared/logo/Logo'
import Navbar from '@/app/components/ui/navbar/Navbar'
import ErrorScreen from '@/app/components/screens/errorScreen/ErrorScreen'
import AdminScreen from '@/app/components/screens/adminScreen/AdminScreen'
import AdminLayout from '@/app/components/layout/adminLayout/AdminLayout'
import AdminMenu from "@/app/components/ui/adminMenu/AdminMenu"
import AdminContainer from "@/app/components/layout/adminContainer/AdminContainer"
import AdminProducts from '@/app/components/ui/adminProducts/AdminProducts'
import AdminProducers from '@/app/components/ui/adminProducers/AdminProducers'
import ResizingButton from '@/app/components/shared/ResizingButton/ResizingButton'


export {
    HeadButton,
    Container,
    ProductInfo,
    ProductPage,
    LoadMoreButton,
    Product,
    Preloader,
    Rating,
    FilterProduct,
    Products,
    HeaderLayout,
    FilterDropdown,
    Slider,
    ScrollableList,
    SearchProduct,
    Logo,
    Navbar,
    ErrorScreen,
    AdminScreen,
    AdminLayout,
    AdminMenu,
    AdminContainer,
    AdminProducts,
    AdminProducers,
    HeadLink,
    ResizingButton
}

//UTILS
import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { capitalizeText } from "@/app/utils/capitalizeText"

export {
    currencyFormatter,
    capitalizeText
}


//STORE

import { useGetProductsQuery } from '@/app/store/product/product.api'
import { useGetCategoriesQuery } from "@/app/store/product/product.api"
import { useGetProductQuery } from '@/app/store/product/product.api';

export {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetProductQuery
}


//TYPES
import { IProduct } from '@/app/store/product/product.type'

export type {
    IProduct
}


//PROVIDERS
import StoreProvider from '@/app/providers/storeProvider'
import RoleContextProvider from '@/app/providers/roleContextProvider'

export {
    RoleContextProvider,
    StoreProvider
}


//CONTEXTS
import {RoleContext} from '@/app/providers/roleContextProvider'

export {
    RoleContext
}
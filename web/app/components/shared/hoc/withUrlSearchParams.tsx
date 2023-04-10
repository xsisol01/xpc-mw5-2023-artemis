import { FC } from 'react'

import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material';

function withUrlSearchParams <T>(Component: FC<T>): FC<T> {
    const router = useRouter();

    if (!router.isReady) {
        return () => <CircularProgress />
    }

    return (props: T) => {
        return <Component {...props} getParam={getParam} setParam={setParam} />
    } 

    function getParam(paramName: string) {
        const urlParams = getNewUrlSearchParams()
        if (urlParams) {
            return urlParams.get && urlParams.get(paramName)
        }
    }

    function setParam(name:string, value:string) {
            if (!value || !value.length) {
                removeParam(name)
                return
            }
    
            const currentQuery = router.query
    
            router.push({query: {
                ...currentQuery,
                [name.toLowerCase()]: value.toLowerCase()
            }})
    }

    function removeParam(name: string) {
        let currentQuery = {}

        if (Object.keys(router.query).length) {
            currentQuery = router.query
        }

        const filteredQueries = Object
            .entries(currentQuery)
            .filter(([key, value]) => key !== name)

        const newRouter = {
            query: Object.fromEntries(filteredQueries)
        }

        router.push({query: Object.fromEntries(filteredQueries)})
    }

    function getNewUrlSearchParams() {
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href)
            return new URLSearchParams(url.search)
        }
    }
}

export default withUrlSearchParams
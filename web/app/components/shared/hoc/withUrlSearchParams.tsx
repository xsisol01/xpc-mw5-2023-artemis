import { useState, useEffect, FC } from 'react'

import { useRouter } from 'next/router'

function withUrlSearchParams <T>(Component: FC<T>) {
    
    const [urlSearchParams, setUrlSearchParams] = useState({} as URLSearchParams)

    const router = useRouter();

    useEffect(() => {
        const url = new URL(window.location.href)
        const urlParams = new URLSearchParams(url.search)

        setUrlSearchParams(urlParams)
    }, [])

    return (props: T) => {
        return <Component {...props} getParam={getParam} setParam={setParam} />
    } 

    function getParam(paramName: string) {
        debugger
        return urlSearchParams.get && urlSearchParams.get(paramName)
    }

    function setParam(name:string, value:string) {
        let currentQuery = {}

        if (Object.keys(router.query).length) {
            currentQuery = router.query
        }

        router.push({query: {
            ...currentQuery,
            [name.toLowerCase()]: value.toLowerCase()
        }})

        debugger
    }
}

export default withUrlSearchParams
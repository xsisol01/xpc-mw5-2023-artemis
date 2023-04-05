import { useState, useEffect, FC } from 'react'

import { useRouter } from 'next/router'

function withUrlSearchParams <T>(Component: FC<T>): FC<T> {
    
    const [urlSearchParams, setUrlSearchParams] = useState({} as URLSearchParams)

    const router = useRouter();

    useEffect(() => {
        const urlParams = getNewUrlSearchParams()

        setUrlSearchParams(urlParams)
    }, [])

    return (props: T) => {
        return <Component {...props} getParam={getParam} setParam={setParam} />
    } 

    function getParam(paramName: string) {
        const urlParams = getNewUrlSearchParams()
        return urlParams.get && urlParams.get(paramName)
    }

    function setParam(name:string, value:string) {
        let currentQuery = {}

        if(!value && !value.length) {
            return
        }

        if (Object.keys(router.query).length) {
            currentQuery = router.query
        }

        router.push({query: {
            ...currentQuery,
            [name.toLowerCase()]: value.toLowerCase()
        }})
    }

    function getNewUrlSearchParams() {
        const url = new URL(window.location.href)
        return new URLSearchParams(url.search)
    }
}

export default withUrlSearchParams
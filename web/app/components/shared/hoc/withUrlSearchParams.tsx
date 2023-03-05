import {useState, useEffect} from 'react'

interface IProps {
    Component: React.FC
    searchParam: string
}

const withUrlSearchParams = ({Component, searchParam} :IProps) => {
    const [urlSearchParams, setUrlSearchParams] = useState({})

    useEffect(() => {
        const url = new URL(window.location.href)
        const query = new URLSearchParams(url.search)
        const allParams = query.values()

        setUrlSearchParams(allParams)

    }, [])

    return (props: any) => (
        <Component {...props} urlSearchParams={urlSearchParams} />
    )
}

export default withUrlSearchParams
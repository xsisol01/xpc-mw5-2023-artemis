import {FC, memo} from 'react'

interface IProps {
    height: number
}

const WhiteSpace: FC<IProps> = memo(({height}) => {
    return <div style={{height: `${height}px`}}></div>
})

export default WhiteSpace
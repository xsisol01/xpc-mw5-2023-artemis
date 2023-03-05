interface IProps {
    height: number
}

const WhiteSpace: React.FC<IProps> = ({height}) => {
    return <div style={{height: `${height}px`}}></div>
} 

export default WhiteSpace
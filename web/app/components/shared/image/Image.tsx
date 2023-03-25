import { FC, memo } from "react";

interface IProps {
  src: string
  width?: number
  height?: number
  className?: string
  size?: string 
  position?: string
}

const Image: FC<IProps> = memo((
  {
    src,
    width,
    height,
    className,
    size = 'contain',
    position = 'center'
  }) => {

  const imageStyle = {
    backgroundImage: `url("${src}")`,
    backgroundSize: size,
    backgroundPosition: position,
    backgroundRepeat: 'no-repeat',
    width,
    height,
  }

  return (
    <div style={imageStyle} className={className}></div>
  )
})

export default Image
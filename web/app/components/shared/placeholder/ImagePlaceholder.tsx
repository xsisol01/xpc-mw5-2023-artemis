import { FC, memo } from "react";

interface IProps {
  alt: string
  height: number | string
  width?: number | string
}

const ImagePlaceholder: FC<IProps> = memo(({alt, height, width = '100%'}) => {
  return (
    <img
      src="imagePlaceholder.png"
      alt={alt}
      style={{ height, width }}
      loading="lazy"
    />
  );
});

export default ImagePlaceholder
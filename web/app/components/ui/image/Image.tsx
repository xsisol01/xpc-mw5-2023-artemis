import { FC, memo } from "react";

import NextImage from "next/image";
import { imageData } from "./imageData";

interface IProps {
  alt?: string;
  src: string;
  width: number;
  height: number;
  style?: any;
}

const Image: FC<IProps> = memo(
  ({ alt = "", src, width, height, style = {} }) => {
    return (
      <NextImage
        alt={alt}
        src={src || imageData.imagePlaceholder}
        width={width}
        height={height}
        style={style}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;

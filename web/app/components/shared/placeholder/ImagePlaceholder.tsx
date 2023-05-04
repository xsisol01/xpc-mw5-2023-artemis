import { FC, memo } from "react";
import Image from "next/image";

interface IProps {
  alt: string;
  height: number;
  width: number;
}

const ImagePlaceholder: FC<IProps> = memo(({ alt, height, width = 200 }) => {
  return (
    <Image
      src="/imagePlaceholder.png"
      alt={alt}
      loading="lazy"
      height={height}
      width={width}
    />
  );
});

ImagePlaceholder.displayName = "ImagePlaceholder";

export default ImagePlaceholder;

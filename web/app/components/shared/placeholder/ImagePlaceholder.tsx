import { FC, memo } from "react";
import Image from "next/image";

interface IProps {
  alt: string;
  height: number | string;
  width?: number | string;
}

const ImagePlaceholder: FC<IProps> = memo(({ alt, height, width = "100%" }) => {
  return (
    <Image
      src="imagePlaceholder.png"
      alt={alt}
      style={{ height, width }}
      loading="lazy"
    />
  );
});

ImagePlaceholder.displayName = "ImagePlaceholder";

export default ImagePlaceholder;

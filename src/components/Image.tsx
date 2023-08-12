import { useState, useEffect, FC, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  height?: string;
  width?: string;
  blurImage?: string;
}

const SImage: FC<LazyImageProps> = ({ height, width, src, alt, blurImage, className, ...rest }) => {
  const imgRef = useRef<HTMLImageElement>(new Image());
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) return;
    imgRef.current.src = src;
    imgRef.current.onload = () => {
      console.log("图片加载完成");
      setIsLoading(false);
      setImageSrc(src);
    };
  }, [src]);

  return (
    <div className={twMerge("relative", height, width)}>
      {isLoading && (
        <div
          className={twMerge(
            "absolute inset-0 w-full h-full object-cover filter blur-sm bg-gray-200/20",
            className
          )}
        />
      )}
      <img
        className={twMerge(isLoading ? "opacity-0" : "opacity-100", "h-full w-full", className)}
        src={imageSrc}
        alt={alt}
        {...rest}
      />
    </div>
  );
};

export default SImage;

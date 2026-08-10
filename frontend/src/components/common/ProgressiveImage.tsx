import { useState, type ReactNode, type CSSProperties } from "react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fallback?: ReactNode;
}

const ProgressiveImage = ({
  src,
  alt,
  className = "",
  style = {},
  fallback,
}: ProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="progressive-img-container">
      {!isLoaded && !hasError && (
        <div className="progressive-img-skeleton" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`progressive-img ${
          isLoaded ? "progressive-img-loaded" : "progressive-img-loading"
        } ${className}`}
        style={style}
      />
    </div>
  );
};

export default ProgressiveImage;

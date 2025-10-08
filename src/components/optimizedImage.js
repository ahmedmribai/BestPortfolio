import React, { useState } from 'react';
import styled from 'styled-components';
import useLazyLoad from '../hooks/useLazyLoad';
import { SkeletonLoader } from './loadingSpinner';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${props => props.$rounded ? '8px' : '0'};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.$objectFit || 'cover'};
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  display: block;
`;

const ImageSkeleton = styled(SkeletonLoader)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const OptimizedImage = ({ 
  src, 
  alt, 
  placeholder,
  rounded = false,
  objectFit = 'cover',
  className,
  style,
  onLoad,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const { targetRef, hasLoaded } = useLazyLoad({
    threshold: 0.01,
    rootMargin: '100px'
  });

  React.useEffect(() => {
    if (hasLoaded && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setImageLoaded(true);
        if (onLoad) onLoad();
      };
    }
  }, [hasLoaded, src, onLoad]);

  return (
    <ImageWrapper 
      ref={targetRef}
      $rounded={rounded}
      className={className}
      style={style}
    >
      {!imageLoaded && <ImageSkeleton />}
      <StyledImage
        src={imageSrc}
        alt={alt}
        $loaded={imageLoaded}
        $objectFit={objectFit}
        {...props}
      />
    </ImageWrapper>
  );
};

export default OptimizedImage;

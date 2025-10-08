import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const SpinnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.$size === 'small' ? '10px' : '20px'};
`;

const Spinner = styled.div`
  width: ${props => props.$size === 'small' ? '20px' : props.$size === 'large' ? '60px' : '40px'};
  height: ${props => props.$size === 'small' ? '20px' : props.$size === 'large' ? '60px' : '40px'};
  border: 3px solid rgba(100, 255, 218, 0.1);
  border-top-color: var(--green);
  border-radius: 50%;
  animation: ${spin} 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
`;

const DotsWrapper = styled.div`
  display: inline-flex;
  gap: 8px;
  align-items: center;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background: var(--green);
  border-radius: 50%;
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  height: ${props => props.$height || '20px'};
  background: linear-gradient(90deg, 
    rgba(100, 255, 218, 0.05) 25%, 
    rgba(100, 255, 218, 0.1) 50%, 
    rgba(100, 255, 218, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export const LoadingSpinner = ({ size = 'medium' }) => (
  <SpinnerWrapper $size={size}>
    <Spinner $size={size} />
  </SpinnerWrapper>
);

export const LoadingDots = () => (
  <DotsWrapper>
    <Dot $delay={0} />
    <Dot $delay={0.2} />
    <Dot $delay={0.4} />
  </DotsWrapper>
);

export const SkeletonLoader = ({ height, width, style }) => (
  <SkeletonWrapper $height={height} style={{ width, ...style }} />
);

export default LoadingSpinner;

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const TransitionWrapper = styled.div`
  animation: ${fadeIn} 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
  opacity: 0;
`;

const PageLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--green) 0%, var(--blue) 50%, var(--pink) 100%);
  transform: scaleX(${props => props.$progress / 100});
  transform-origin: left;
  transition: transform 0.3s ease;
  z-index: 1000;
`;

const PageTransition = ({ children, loading = false }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [loading]);

  return (
    <>
      {progress > 0 && <PageLoader $progress={progress} />}
      <TransitionWrapper>
        {children}
      </TransitionWrapper>
    </>
  );
};

export default PageTransition;

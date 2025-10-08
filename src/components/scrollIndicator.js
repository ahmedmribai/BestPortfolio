import React from 'react';
import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const ScrollContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;

const Mouse = styled.div`
  width: 26px;
  height: 40px;
  border: 2px solid var(--green);
  border-radius: 13px;
  position: relative;
  
  &::before {
    content: '';
    width: 4px;
    height: 8px;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--green);
    border-radius: 2px;
    animation: ${scroll} 2s infinite;
  }
`;

const ScrollIndicator = () => {
  return (
    <ScrollContainer>
      <Mouse />
    </ScrollContainer>
  );
};

export default ScrollIndicator;

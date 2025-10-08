import styled, { css } from 'styled-components';

export const glassEffect = css`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

export const GlassCard = styled.div`
  ${glassEffect}
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #fda085 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

export const NeonGlow = css`
  text-shadow: 
    0 0 10px rgba(100, 255, 218, 0.8),
    0 0 20px rgba(100, 255, 218, 0.6),
    0 0 30px rgba(100, 255, 218, 0.4),
    0 0 40px rgba(100, 255, 218, 0.2);
`;

export const AnimatedBorder = styled.div`
  position: relative;
  padding: 3px;
  border-radius: 20px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: borderGradient 3s ease infinite;
  
  @keyframes borderGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  & > div {
    background: var(--navy);
    border-radius: 17px;
    padding: 2rem;
  }
`;

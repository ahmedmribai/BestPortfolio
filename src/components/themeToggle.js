import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';

const ToggleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(10, 25, 47, 0.9) 0%, rgba(10, 25, 47, 0.7) 100%);
  backdrop-filter: blur(10px);
  border: 2px solid var(--green);
  color: var(--green);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 10;
  box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 30px -10px rgba(100, 255, 218, 0.3);
    background: linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(10, 25, 47, 0.9) 100%);
  }
  
  &:focus {
    outline: none;
  }
  
  svg {
    width: 22px;
    height: 22px;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: rotate(180deg);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
`;

const ThemeIcon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  
  .sun-icon, .moon-icon {
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s ease;
  }
  
  .sun-icon {
    opacity: ${props => props.$isDark ? 0 : 1};
    transform: ${props => props.$isDark ? 'rotate(180deg) scale(0)' : 'rotate(0deg) scale(1)'};
  }
  
  .moon-icon {
    opacity: ${props => props.$isDark ? 1 : 0};
    transform: ${props => props.$isDark ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0)'};
  }
`;

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <ThemeIcon $isDark={isDark}>
        <div className="sun-icon">
          <SunIcon />
        </div>
        <div className="moon-icon">
          <MoonIcon />
        </div>
      </ThemeIcon>
    </ToggleButton>
  );
};

export default ThemeToggle;

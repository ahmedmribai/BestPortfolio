import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: ${props => props.theme.colors?.darkNavy || '#020c1b'};
    --navy: ${props => props.theme.colors?.navy || '#0a192f'};
    --light-navy: ${props => props.theme.colors?.lightNavy || '#112240'};
    --lightest-navy: ${props => props.theme.colors?.lightestNavy || '#233554'};
    --navy-shadow: ${props => props.theme.colors?.navyShadow || 'rgba(2, 12, 27, 0.7)'};
    --dark-slate: ${props => props.theme.colors?.darkSlate || '#495670'};
    --slate: ${props => props.theme.colors?.slate || '#8892b0'};
    --light-slate: ${props => props.theme.colors?.lightSlate || '#a8b2d1'};
    --lightest-slate: ${props => props.theme.colors?.lightestSlate || '#ccd6f6'};
    --white: ${props => props.theme.colors?.white || '#e6f1ff'};
    --green: ${props => props.theme.colors?.green || '#64ffda'};
    --green-tint: ${props => props.theme.colors?.greenTint || 'rgba(100, 255, 218, 0.1)'};
    --pink: ${props => props.theme.colors?.pink || '#f57dff'};
    --blue: ${props => props.theme.colors?.blue || '#57cbff'};

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;

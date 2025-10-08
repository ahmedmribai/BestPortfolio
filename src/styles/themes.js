import mixins from './mixins';

const darkTheme = {
  bp: {
    mobileS: `max-width: 330px`,
    mobileM: `max-width: 400px`,
    mobileL: `max-width: 480px`,
    tabletS: `max-width: 600px`,
    tabletL: `max-width: 768px`,
    desktopXS: `max-width: 900px`,
    desktopS: `max-width: 1080px`,
    desktopM: `max-width: 1200px`,
    desktopL: `max-width: 1400px`,
  },
  colors: {
    darkNavy: '#020c1b',
    navy: '#0a192f',
    lightNavy: '#112240',
    lightestNavy: '#233554',
    navyShadow: 'rgba(2, 12, 27, 0.7)',
    darkSlate: '#495670',
    slate: '#8892b0',
    lightSlate: '#a8b2d1',
    lightestSlate: '#ccd6f6',
    white: '#e6f1ff',
    green: '#64ffda',
    greenTint: 'rgba(100, 255, 218, 0.1)',
    pink: '#f57dff',
    blue: '#57cbff',
  },
  mixins,
};

const lightTheme = {
  bp: {
    mobileS: `max-width: 330px`,
    mobileM: `max-width: 400px`,
    mobileL: `max-width: 480px`,
    tabletS: `max-width: 600px`,
    tabletL: `max-width: 768px`,
    desktopXS: `max-width: 900px`,
    desktopS: `max-width: 1080px`,
    desktopM: `max-width: 1200px`,
    desktopL: `max-width: 1400px`,
  },
  colors: {
    darkNavy: '#ffffff',
    navy: '#f6f9fc',
    lightNavy: '#e1e8ed',
    lightestNavy: '#d1dce6',
    navyShadow: 'rgba(0, 0, 0, 0.1)',
    darkSlate: '#64748b',
    slate: '#475569',
    lightSlate: '#334155',
    lightestSlate: '#1e293b',
    white: '#0f172a',
    green: '#059669',
    greenTint: 'rgba(5, 150, 105, 0.1)',
    pink: '#ec4899',
    blue: '#3b82f6',
  },
  mixins,
};

export { darkTheme, lightTheme };
export default darkTheme;

import { useEffect, useState } from 'react';

const useParallax = (offset = 0, multiplier = 0.5) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return -(scrollY - offset) * multiplier;
};

export default useParallax;

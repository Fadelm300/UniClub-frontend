import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }, 200); 
    return () => clearTimeout(scrollTimeout); 
  }, [pathname]);

  return null; 
};

export default ScrollToTop;

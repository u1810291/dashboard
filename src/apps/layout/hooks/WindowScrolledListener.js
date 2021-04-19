import { useCallback, useEffect, useState } from 'react';

export function useWindowsScrolledListener() {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = useCallback(() => {
    setIsScrolled(window.pageYOffset > 1);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, [handleScroll]);

  return isScrolled;
}

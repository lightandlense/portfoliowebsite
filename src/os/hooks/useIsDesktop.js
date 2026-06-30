import { useEffect, useState } from 'react';

const query = '(min-width: 900px) and (pointer: fine)';

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia?.(query).matches ?? true);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

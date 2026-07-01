import { Desktop } from './Desktop';
import Home from '../pages/Home';
import { useIsDesktop } from './hooks/useIsDesktop';

export function OSApp() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <Desktop /> : <Home />;
}

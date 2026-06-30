import { Desktop } from './Desktop';
import { MobileInterstitial } from './MobileInterstitial';
import { useIsDesktop } from './hooks/useIsDesktop';

export function OSApp() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <Desktop /> : <MobileInterstitial />;
}

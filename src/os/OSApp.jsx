import { Navigate } from 'react-router-dom';
import { Desktop } from './Desktop';
import Home from '../pages/Home';
import { useIsDesktop } from './hooks/useIsDesktop';
import { getProject } from './data/projects';

// Phones can't open OS windows, so ?open=project:X goes to that project's classic page.
function mobileTarget(search) {
  const first = new URLSearchParams(search).get('open')?.split(',').find((id) => id.startsWith('project:'));
  const p = first && getProject(first.slice('project:'.length));
  return p ? `/classic/work/${p.slug}` : null;
}

export function OSApp() {
  const isDesktop = useIsDesktop();
  if (isDesktop) return <Desktop />;
  const target = mobileTarget(window.location.search);
  return target ? <Navigate to={target} replace /> : <Home />;
}

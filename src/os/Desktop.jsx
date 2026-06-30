import { useEffect, useReducer, useState } from 'react';
import './os.css';
import { TopBar } from './TopBar';
import { DesktopIcons } from './DesktopIcons';
import { Dock } from './Dock';
import { Window } from './Window';
import { BootScreen } from './BootScreen';
import { LAUNCHERS, buildOpenAction } from './launchers';
import {
  initialState, windowReducer, openWindow, closeWindow, focusWindow, moveWindow, minimizeWindow,
} from './state/windowManager';
import { ProjectWindow } from './windows/ProjectWindow';
import { ProjectsFinder } from './windows/ProjectsFinder';
import { ReelsApp } from './windows/ReelsApp';
import { AboutWindow } from './windows/AboutWindow';
import { ContactWindow } from './windows/ContactWindow';
import { useReducedMotion } from './hooks/useReducedMotion';

function readOpenParam() {
  const ids = new URLSearchParams(window.location.search).get('open');
  return ids ? ids.split(',').filter(Boolean) : [];
}

function lazyInit() {
  const ids = readOpenParam();
  return ids.reduce((state, id) => {
    const l = LAUNCHERS.find((x) => x.id === id);
    return l ? windowReducer(state, openWindow(buildOpenAction(l))) : state;
  }, initialState);
}

function renderContent(win, dispatch) {
  switch (win.type) {
    case 'project': return <ProjectWindow projectId={win.payload} />;
    case 'finder': return <ProjectsFinder onOpenProject={(pid) => {
      const l = LAUNCHERS.find((x) => x.id === `project:${pid}`);
      if (l) dispatch(openWindow(buildOpenAction(l)));
    }} />;
    case 'reels': return <ReelsApp />;
    case 'about': return <AboutWindow />;
    case 'contact': return <ContactWindow />;
    default: return null;
  }
}

export function Desktop() {
  const [booting, setBooting] = useState(true);
  const [state, dispatch] = useReducer(windowReducer, undefined, lazyInit);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ids = state.windows.filter((w) => !w.minimized).map((w) => w.id);
    const qs = ids.length ? `?open=${ids.join(',')}` : '';
    window.history.replaceState({}, '', `${window.location.pathname}${qs}`);
  }, [state.windows]);

  const onOpen = (launcher) => dispatch(openWindow(buildOpenAction(launcher)));
  const topZ = Math.max(0, ...state.windows.map((w) => w.z));
  const openIds = new Set(state.windows.map((w) => w.id));

  return (
    <div className="os-root">
      {booting && <BootScreen onDone={() => setBooting(false)} />}
      <TopBar />
      <DesktopIcons onOpen={onOpen} />
      {state.windows.map((win) => (
        <Window
          key={win.id}
          window={win}
          isFocused={win.z === topZ}
          reducedMotion={reducedMotion}
          onClose={(id) => dispatch(closeWindow(id))}
          onMinimize={(id) => dispatch(minimizeWindow(id))}
          onFocus={(id) => dispatch(focusWindow(id))}
          onMove={(id, x, y) => dispatch(moveWindow(id, x, y))}
        >
          {renderContent(win, dispatch)}
        </Window>
      ))}
      <Dock openIds={openIds} onOpen={onOpen} />
    </div>
  );
}

import { useCallback, useEffect, useReducer, useState } from 'react';
import './os.css';
import { TopBar } from './TopBar';
import { DesktopIcons } from './DesktopIcons';
import { Window } from './Window';
import { BootScreen } from './BootScreen';
import { IdleToast } from './IdleToast';
import { DesktopStickers } from './DesktopStickers';
import { PetalBackground } from './PetalBackground';
import { GardenBackground } from './GardenBackground';
import { snapReducer, loadSnapState, completeZone } from './state/snapReducer';
import { ProjectWindow } from './windows/ProjectWindow';
import { ProjectsFinder } from './windows/ProjectsFinder';
import { ReelsApp } from './windows/ReelsApp';
import { AboutWindow } from './windows/AboutWindow';
import { ContactWindow } from './windows/ContactWindow';
import { LAUNCHERS, buildOpenAction } from './launchers';
import { useReducedMotion } from './hooks/useReducedMotion';
import {
  initialState, windowReducer, openWindow, closeWindow, focusWindow,
  moveWindow, minimizeWindow, resizeWindow, bumpWindows,
} from './state/windowManager';

function overlaps(a, b) {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
}

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
    case 'project': return <ProjectWindow projectId={win.payload} dispatch={dispatch} />;
    case 'experiment': return (
      <iframe
        src={win.payload}
        title={win.title}
        style={{ display: 'block', width: '100%', height: '100%', border: 'none' }}
        allow="camera; microphone"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    );
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
  const [snapState, snapDispatch] = useReducer(snapReducer, undefined, loadSnapState);
  const reducedMotion = useReducedMotion();
  const handleSnap = useCallback((zoneId) => snapDispatch(completeZone(zoneId)), []);

  useEffect(() => {
    const ids = state.windows.filter((w) => !w.minimized).map((w) => w.id);
    const qs = ids.length ? `?open=${ids.join(',')}` : '';
    window.history.replaceState({}, '', `${window.location.pathname}${qs}`);
  }, [state.windows]);

  const onOpen = (launcher) => dispatch(openWindow(buildOpenAction(launcher)));
  const topZ = Math.max(0, ...state.windows.map((w) => w.z));

  function handleMove(id, x, y) {
    dispatch(moveWindow(id, x, y));
    const movedWin = state.windows.find((w) => w.id === id);
    if (!movedWin) return;
    const moved = { ...movedWin, x, y };
    const bumps = state.windows
      .filter((w) => w.id !== id && !w.minimized && overlaps(moved, w))
      .map((w) => {
        const dx = (w.x + w.w / 2) - (x + moved.w / 2);
        const dy = (w.y + w.h / 2) - (y + moved.h / 2);
        const mag = Math.sqrt(dx * dx + dy * dy) || 1;
        return { id: w.id, x: w.x + (dx / mag) * 40, y: w.y + (dy / mag) * 40 };
      });
    if (bumps.length) dispatch(bumpWindows(bumps));
  }

  return (
    <div className="os-root">
      {booting && <BootScreen onDone={() => setBooting(false)} />}
      <PetalBackground reducedMotion={reducedMotion} />
      <GardenBackground completedZones={snapState.completedZones} />
      <TopBar onOpen={onOpen} />
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
          onMove={handleMove}
          onResize={(id, w, h) => dispatch(resizeWindow(id, w, h))}
        >
          {renderContent(win, dispatch)}
        </Window>
      ))}
      <DesktopStickers
        completedZones={snapState.completedZones}
        onSnap={handleSnap}
      />
      <IdleToast />
    </div>
  );
}

import { useEffect, useReducer, useState } from 'react';
import './os.css';
import { TopBar } from './TopBar';
import { DesktopIcons } from './DesktopIcons';
import { Window } from './Window';
import { BootScreen } from './BootScreen';
import { IdleToast } from './IdleToast';
import { PetalBackground } from './PetalBackground';
import { ArtSceneCanvas } from '../pages/ArtSceneCanvas';
import { ProjectWindow } from './windows/ProjectWindow';
import { ProjectsFinder } from './windows/ProjectsFinder';
import { ReelsApp } from './windows/ReelsApp';
import { AboutWindow } from './windows/AboutWindow';
import { ResumeWindow } from './windows/ResumeWindow';
import { ContactWindow } from './windows/ContactWindow';
import { LAUNCHERS, buildOpenAction } from './launchers';
import { useReducedMotion } from './hooks/useReducedMotion';
import {
  initialState, windowReducer, openWindow, closeWindow, focusWindow,
  moveWindow, minimizeWindow, resizeWindow, bumpWindows, cascade, DEFAULT_W, DEFAULT_H,
} from './state/windowManager';

function overlaps(a, b) {
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
}

const TOPBAR_H = 38;

function clampPos(x, y, w, h) {
  const maxX = Math.max(0, window.innerWidth - w);
  const maxY = Math.max(TOPBAR_H, window.innerHeight - h);
  return { x: Math.min(Math.max(0, x), maxX), y: Math.min(Math.max(TOPBAR_H, y), maxY) };
}

function clampSize(w, h) {
  return { w: Math.min(w, window.innerWidth), h: Math.min(h, window.innerHeight - TOPBAR_H) };
}

function readOpenParam() {
  const ids = new URLSearchParams(window.location.search).get('open');
  return ids ? ids.split(',').filter(Boolean) : [];
}

function lazyInit() {
  const ids = readOpenParam();
  return ids.reduce((state, id) => {
    const l = LAUNCHERS.find((x) => x.id === id);
    if (!l) return state;
    const action = buildOpenAction(l);
    const { w, h } = clampSize(action.w ?? DEFAULT_W, action.h ?? DEFAULT_H);
    const pos = cascade(state.windows.length);
    const { x, y } = clampPos(pos.x, pos.y, w, h);
    return windowReducer(state, openWindow({ ...action, w, h, x, y }));
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
    case 'about': return <AboutWindow onOpenResume={() => {
      const l = LAUNCHERS.find((x) => x.id === 'resume');
      if (l) dispatch(openWindow(buildOpenAction(l)));
    }} />;
    case 'resume': return <ResumeWindow />;
    case 'contact': return <ContactWindow />;
    default: return null;
  }
}

export function Desktop() {
  const [booting, setBooting] = useState(true);
  const [state, dispatch] = useReducer(windowReducer, undefined, lazyInit);
  const [sceneResetTick, setSceneResetTick] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ids = state.windows.filter((w) => !w.minimized).map((w) => w.id);
    const qs = ids.length ? `?open=${ids.join(',')}` : '';
    window.history.replaceState({}, '', `${window.location.pathname}${qs}`);
  }, [state.windows]);

  const onOpen = (launcher) => {
    const action = buildOpenAction(launcher);
    const { w, h } = clampSize(action.w ?? DEFAULT_W, action.h ?? DEFAULT_H);
    const pos = cascade(state.windows.length);
    const { x, y } = clampPos(pos.x, pos.y, w, h);
    dispatch(openWindow({ ...action, w, h, x, y }));
  };
  const topZ = Math.max(0, ...state.windows.map((w) => w.z));

  function handleMove(id, rawX, rawY) {
    const movedWin = state.windows.find((w) => w.id === id);
    if (!movedWin) return;
    const { x, y } = clampPos(rawX, rawY, movedWin.w, movedWin.h);
    dispatch(moveWindow(id, x, y));
    const moved = { ...movedWin, x, y };
    const bumps = state.windows
      .filter((w) => w.id !== id && !w.minimized && overlaps(moved, w))
      .map((w) => {
        const dx = (w.x + w.w / 2) - (x + moved.w / 2);
        const dy = (w.y + w.h / 2) - (y + moved.h / 2);
        const mag = Math.sqrt(dx * dx + dy * dy) || 1;
        return { id: w.id, ...clampPos(w.x + (dx / mag) * 40, w.y + (dy / mag) * 40, w.w, w.h) };
      });
    if (bumps.length) dispatch(bumpWindows(bumps));
  }

  function handleResize(id, w, h) {
    const win = state.windows.find((win) => win.id === id);
    if (!win) return;
    const maxW = Math.max(280, window.innerWidth - win.x);
    const maxH = Math.max(200, window.innerHeight - win.y);
    dispatch(resizeWindow(id, Math.min(w, maxW), Math.min(h, maxH)));
  }

  return (
    <div className="os-root">
      {booting && <BootScreen onDone={() => setBooting(false)} />}
      <PetalBackground reducedMotion={reducedMotion} />
      {!booting && <ArtSceneCanvas resetTrigger={sceneResetTick} />}
      <TopBar onOpen={onOpen} onResetScene={() => setSceneResetTick((t) => t + 1)} />
      {!booting && <DesktopIcons onOpen={onOpen} />}
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
          onResize={handleResize}
        >
          {renderContent(win, dispatch)}
        </Window>
      ))}
      <IdleToast />
    </div>
  );
}

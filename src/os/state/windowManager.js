export const initialState = { windows: [], nextZ: 1 };

const cascade = (n) => ({ x: 120 + (n % 5) * 36, y: 96 + (n % 5) * 36 });

export const openWindow = (w) => ({ type: 'OPEN', window: w });
export const closeWindow = (id) => ({ type: 'CLOSE', id });
export const focusWindow = (id) => ({ type: 'FOCUS', id });
export const moveWindow = (id, x, y) => ({ type: 'MOVE', id, x, y });
export const minimizeWindow = (id) => ({ type: 'MINIMIZE', id });
export const restoreWindow = (id) => ({ type: 'RESTORE', id });

const raise = (state, id) => ({
  ...state,
  nextZ: state.nextZ + 1,
  windows: state.windows.map((w) => (w.id === id ? { ...w, z: state.nextZ, minimized: false } : w)),
});

export function windowReducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      const exists = state.windows.some((w) => w.id === action.window.id);
      if (exists) return raise(state, action.window.id);
      const pos = cascade(state.windows.length);
      const win = {
        x: pos.x, y: pos.y, minimized: false,
        ...action.window,
        z: state.nextZ,
      };
      return { ...state, nextZ: state.nextZ + 1, windows: [...state.windows, win] };
    }
    case 'CLOSE':
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) };
    case 'FOCUS':
      return raise(state, action.id);
    case 'MOVE':
      return {
        ...state,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, x: action.x, y: action.y } : w)),
      };
    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, minimized: true } : w)),
      };
    case 'RESTORE':
      return raise(state, action.id);
    default:
      return state;
  }
}

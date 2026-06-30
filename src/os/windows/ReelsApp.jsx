import { useState } from 'react';
import { REELS } from '../data/projects';
import './windows.css';

export function ReelsApp() {
  const [playing, setPlaying] = useState(null);
  return (
    <div className="reels">
      <div className="reels__banner">
        <b>91M+</b> views · <b>4.6M+</b> likes · <b>Olympics</b> commissioned
      </div>
      <div className="reels__grid">
        {REELS.map((r) =>
          playing === r.id ? (
            <video key={r.id} data-testid="reel-player" className="reels__cell" src={r.src} poster={r.poster} controls autoPlay playsInline />
          ) : (
            <button key={r.id} type="button" aria-label={`Play reel ${r.id}`} className="reels__cell reels__cell--poster" style={{ backgroundImage: `url(${r.poster})` }} onClick={() => setPlaying(r.id)}>
              <span className="reels__play">▶</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}

import { Suspense, lazy, useState } from 'react';
import './SplineBackground.css';

// Lazy-load Spline — it's ~500KB+
const Spline = lazy(() => import('@splinetool/react-spline'));

const SCENE_URL = 'https://prod.spline.design/gmDrOsXHUqBU4H-k/scene.splinecode';

function ShimmerLoader({ visible }) {
    return (
        <div className={`spline-bg__loader ${!visible ? 'spline-bg__loader--hidden' : ''}`}>
            <div className="spline-bg__shimmer" />
            <div className="spline-bg__pulse" />
        </div>
    );
}

export default function SplineBackground() {
    const [loaded, setLoaded] = useState(false);

    const handleLoad = () => {
        // Small delay so the transition feels smooth
        setTimeout(() => setLoaded(true), 300);
    };

    return (
        <div className="spline-bg" aria-hidden="true">
            <ShimmerLoader visible={!loaded} />
            <Suspense fallback={<ShimmerLoader visible />}>
                <div className="spline-bg__canvas">
                    <Spline
                        scene={SCENE_URL}
                        onLoad={handleLoad}
                    />
                </div>
            </Suspense>
            {/* Brand color tint overlay */}
            <div className="spline-bg__tint" />
        </div>
    );
}

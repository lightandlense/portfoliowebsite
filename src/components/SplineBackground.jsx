import { Suspense, lazy, useState } from 'react';
import { useIsDesktop } from '../os/hooks/useIsDesktop';
import './SplineBackground.css';

// Lazy-load Spline — it's ~500KB+. Only desktop visitors pay this cost;
// mobile gets a lightweight static gradient instead.
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
    const isDesktop = useIsDesktop();
    const [loaded, setLoaded] = useState(false);

    const handleLoad = () => {
        // Small delay so the transition feels smooth
        setTimeout(() => setLoaded(true), 300);
    };

    if (!isDesktop) {
        return (
            <div className="spline-bg spline-bg--static" aria-hidden="true" data-testid="spline-bg-static">
                <div className="spline-bg__tint" />
            </div>
        );
    }

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

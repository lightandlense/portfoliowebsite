import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import './SplineScene.css';

// Lazy-load Spline only when a URL is provided
const Spline = lazy(() => import('@splinetool/react-spline'));

function Placeholder() {
    return (
        <motion.div
            className="spline-scene__placeholder"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
        >
            {/* Floating particles */}
            <span className="spline-scene__particle" />
            <span className="spline-scene__particle" />
            <span className="spline-scene__particle" />
            <span className="spline-scene__particle" />

            <div className="spline-scene__glow-ring">
                <span className="spline-scene__icon">◎</span>
            </div>
            <span className="spline-scene__label">3D Scene</span>
        </motion.div>
    );
}

export default function SplineScene({ sceneUrl }) {
    return (
        <div className="spline-scene" id="spline-container">
            {sceneUrl ? (
                <Suspense fallback={<Placeholder />}>
                    <div className="spline-scene__canvas">
                        <Spline scene={sceneUrl} />
                    </div>
                </Suspense>
            ) : (
                <Placeholder />
            )}
        </div>
    );
}

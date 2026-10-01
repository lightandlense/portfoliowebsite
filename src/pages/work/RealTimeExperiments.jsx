import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AiHairExtensions.css';
import './RealTimeExperiments.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay, ease: 'easeOut' },
    }),
};

// Live, hands-on browser experiences (camera / hand tracking + generative weather)
const liveExperiments = [
    {
        id: 'weather',
        category: 'Generative',
        title: 'Artistic Weather',
        description: 'A generative weather experience that paints live conditions into a moving, atmospheric sky.',
        thumb: '/images/experiments/weather.png',
        url: 'https://lightandlense.com/weather/',
    },
    {
        id: 'infinity-mirror',
        category: 'Hand Tracking',
        title: 'Infinity Mirror',
        description: 'Wave your hands in front of the camera to bend an endless mirrored tunnel of light.',
        thumb: '/images/experiments/infinity-mirror.png',
        url: 'https://lightandlense.com/infinity-mirror/',
    },
    {
        id: 'interactive-particles',
        category: 'Hand Tracking',
        title: 'Interactive Particles',
        description: 'A living particle field that scatters, swirls, and gathers around your hands in real time.',
        thumb: '/images/experiments/interactive-particles.png',
        url: 'https://lightandlense.com/interactive-particles/',
    },
    {
        id: 'hidden-image',
        category: 'Hand Tracking',
        title: 'Hidden Image',
        description: 'Move your hands across the frame to wipe away the surface and reveal the image underneath.',
        thumb: '/images/experiments/hidden-image.png',
        url: 'https://lightandlense.com/reveal-2/',
    },
    {
        id: 'stardust',
        category: 'Hand Tracking Game',
        title: 'Stardust Collector',
        description: 'A hand-tracked mini game. Reach out and sweep up drifting stardust before it fades.',
        thumb: '/images/experiments/stardust.png',
        url: 'https://lightandlense.com/stardust/',
    },
    {
        id: 'tetris',
        category: 'Hand Tracking Game',
        title: 'Gesture Tetris',
        description: 'The classic, played with your hands. Gestures move, rotate, and drop every piece.',
        thumb: '/images/experiments/tetris.png',
        url: 'http://lightandlense.com/tetris/',
    },
];

// TouchDesigner real-time interaction videos (YouTube)
const tdVideos = [
    {
        id: 'VxuFGdGFW9U',
        title: 'Interactive Watercolor',
        description: 'Watercolor that blooms and flows in response to movement, built in TouchDesigner.',
    },
    {
        id: '2Gh6FCq7we8',
        title: 'Real-Time Interaction',
        description: 'A live interactive projection driven by real-time camera input.',
    },
    {
        id: 'WEFQi-VK6-w',
        title: 'Real-Time Interaction II',
        description: 'A second real-time study, reacting to motion frame by frame.',
    },
];

function LiveCard({ item, index }) {
    return (
        <motion.a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rte-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
        >
            <div className="rte-card__thumb">
                <img src={item.thumb} alt={item.title} loading="lazy" />
                <span className="rte-card__badge">Live</span>
            </div>
            <div className="rte-card__body">
                <p className="rte-card__category text-label">{item.category}</p>
                <h3 className="rte-card__title">{item.title}</h3>
                <p className="rte-card__description">{item.description}</p>
                <span className="rte-card__link">Try it live &#8599;</span>
            </div>
        </motion.a>
    );
}

function VideoCard({ video, index }) {
    const [playing, setPlaying] = useState(false);

    return (
        <motion.div
            className="rte-video"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
        >
            <div className="rte-video__frame">
                {playing ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <button
                        type="button"
                        className="rte-video__poster"
                        onClick={() => setPlaying(true)}
                        aria-label={`Play ${video.title}`}
                        style={{ backgroundImage: `url(https://img.youtube.com/vi/${video.id}/hqdefault.jpg)` }}
                    >
                        <span className="rte-video__play" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                    </button>
                )}
            </div>
            <div className="rte-video__meta">
                <h3 className="rte-video__title">{video.title}</h3>
                <p className="rte-video__description">{video.description}</p>
            </div>
        </motion.div>
    );
}

export default function RealTimeExperiments() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="cs">

            {/* ── Back nav ── */}
            <Link to="/" className="cs__back">
                ← Back to Work
            </Link>

            {/* ── Hero ── */}
            <header className="cs__hero">
                <motion.p
                    className="cs__label text-label"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
                >
                    // CASE STUDY — INTERACTIVE & REAL-TIME
                </motion.p>

                <motion.h1
                    className="cs__title text-display"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                >
                    Real-Time Experiments
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    A collection of camera-driven, hands-on browser experiences and real-time
                    interaction studies. Each one runs live in the browser, no install. Open any
                    of them and use your hands.
                </motion.p>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">6</span>
                        <span className="cs__stat-label">Live Experiences</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">Hand Tracking</span>
                        <span className="cs__stat-label">In-Browser</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">TouchDesigner</span>
                        <span className="cs__stat-label">Real-Time Studies</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Body ── */}
            <div className="cs__body cs__body--wide">

                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Try Them Live</h2>
                    <p className="cs__text">
                        These run right in your browser using the camera for hand tracking. Click
                        any one to open the working experience in a new tab.
                    </p>

                    <div className="rte-grid">
                        {liveExperiments.map((item, i) => (
                            <LiveCard key={item.id} item={item} index={i} />
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    className="cs__section cs__section--last"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">TouchDesigner Studies</h2>
                    <p className="cs__text">
                        Real-time interaction pieces built in TouchDesigner. Click to play.
                    </p>

                    <div className="rte-videos">
                        {tdVideos.map((video, i) => (
                            <VideoCard key={video.id} video={video} index={i} />
                        ))}
                    </div>
                </motion.section>

            </div>

            {/* ── Footer nav ── */}
            <div className="cs__footer-nav">
                <Link to="/" className="cs__back cs__back--footer">
                    ← Back to All Work
                </Link>
            </div>

        </div>
    );
}

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './VideoWork.css';

const reels = [
    {
        id: 'CosDuregYp4',
        title: '100 Years of Women\'s Fashion',
        description: 'AI-animated timeline of women\'s fashion from the 1910s through the 2010s. The piece that broke through.',
        views: '59.9M',
        likes: '3.4M',
        url: 'https://www.instagram.com/reel/CosDuregYp4/',
        videoSrc: '/videos/CosDuregYp4.mp4',
        thumb: '/images/reels/CosDuregYp4.jpg',
        client: null,
    },
    {
        id: 'CqS9h_bpvSJ',
        title: '100 Years of Hair & Makeup',
        description: 'A century of women\'s beauty standards as a single AI-animated reel.',
        views: '13.8M',
        likes: '380K',
        url: 'https://www.instagram.com/reel/CqS9h_bpvSJ/',
        videoSrc: '/videos/CqS9h_bpvSJ.mp4',
        thumb: '/images/reels/CqS9h_bpvSJ.jpg',
        client: null,
    },
    {
        id: 'Co43aVOPOgq',
        title: '100 Years of Men\'s Fashion',
        description: 'The men\'s counterpart to the original viral reel. Same prompt-travel approach, new century.',
        views: '9.6M',
        likes: '346K',
        url: 'https://www.instagram.com/reel/Co43aVOPOgq/',
        videoSrc: '/videos/Co43aVOPOgq.mp4',
        thumb: '/images/reels/Co43aVOPOgq.jpg',
        client: null,
    },
    {
        id: 'C6gu4kiC0xf',
        title: 'Olympic Uniforms — 100 Years',
        description: 'Commissioned by The Olympics for Milano Cortina 2026 promotion. A century of athlete uniforms in one continuous animation.',
        views: '527K',
        likes: '13.6K',
        url: 'https://www.instagram.com/reel/C6gu4kiC0xf/',
        videoSrc: '/videos/C6gu4kiC0xf.mp4',
        thumb: '/images/reels/C6gu4kiC0xf.jpg',
        client: 'The Olympics',
    },
    {
        id: 'Cpxh5hcOm-P',
        title: 'Mona Lisa — Across Cultures',
        description: 'Da Vinci\'s Mona Lisa morphing through ethnicities in a seamless loop.',
        views: '3.4M',
        likes: '283K',
        url: 'https://www.instagram.com/reel/Cpxh5hcOm-P/',
        videoSrc: '/videos/Cpxh5hcOm-P.mp4',
        thumb: '/images/reels/Cpxh5hcOm-P.jpg',
        client: null,
    },
    {
        id: 'Cv-J7e7tf0b',
        title: 'Mona Lisa — 100 Years of Fashion',
        description: 'The Mona Lisa restyled across a century of American women\'s fashion using prompt-travel.',
        views: '1.7M',
        likes: '80.3K',
        url: 'https://www.instagram.com/reel/Cv-J7e7tf0b/',
        videoSrc: '/videos/Cv-J7e7tf0b.mp4',
        thumb: '/images/reels/Cv-J7e7tf0b.jpg',
        client: null,
    },
    {
        id: 'CqDxinDJcGN',
        title: 'Pearl Earring — 8 Cultures',
        description: 'Vermeer\'s Girl with a Pearl Earring reimagined across eight cultural representations.',
        views: '1.5M',
        likes: '79.9K',
        url: 'https://www.instagram.com/reel/CqDxinDJcGN/',
        videoSrc: '/videos/CqDxinDJcGN.mp4',
        thumb: '/images/reels/CqDxinDJcGN.jpg',
        client: null,
    },
    {
        id: 'CrBZHkSsOZf',
        title: 'Disney Princesses — Anime',
        description: 'Loopback wave technique transforming Disney princesses into anime portraits.',
        views: '1.1M',
        likes: '47.6K',
        url: 'https://www.instagram.com/reel/CrBZHkSsOZf/',
        videoSrc: '/videos/CrBZHkSsOZf.mp4',
        thumb: '/images/reels/CrBZHkSsOZf.jpg',
        client: null,
    },
];

function ReelCard({ reel, index, onPlay }) {
    const isClientWork = Boolean(reel.client);

    return (
        <motion.button
            type="button"
            onClick={() => onPlay(reel)}
            className={`reel-card${isClientWork ? ' reel-card--client' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
            aria-label={`Play ${reel.title}`}
        >
            <div className="reel-card__thumb">
                <img
                    src={reel.thumb}
                    alt={reel.title}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement.classList.add('reel-card__thumb--placeholder');
                    }}
                />
                <div className="reel-card__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
                {isClientWork && (
                    <div className="reel-card__client-badge">{reel.client}</div>
                )}
            </div>

            <div className="reel-card__body">
                <h3 className="reel-card__title">{reel.title}</h3>
                <p className="reel-card__description">{reel.description}</p>

                <div className="reel-card__stats">
                    <div className="reel-card__stat">
                        <span className="reel-card__stat-value">{reel.views}</span>
                        <span className="reel-card__stat-label">views</span>
                    </div>
                    <div className="reel-card__stat">
                        <span className="reel-card__stat-value">{reel.likes}</span>
                        <span className="reel-card__stat-label">likes</span>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

function ReelLightbox({ reel, onClose }) {
    const videoRef = useRef(null);

    // Lock body scroll while open
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    // Escape key closes
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    // Try to enable sound (user already interacted by clicking the card)
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = false;
        v.volume = 1;
        const playPromise = v.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
                // If browser still blocks autoplay-with-sound, fall back to muted autoplay.
                v.muted = true;
                v.play().catch(() => {});
            });
        }
    }, [reel.id]);

    return (
        <motion.div
            className="reel-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={reel.title}
        >
            <motion.div
                className="reel-lightbox__stage"
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="reel-lightbox__close"
                    onClick={onClose}
                    aria-label="Close video"
                >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <div className="reel-lightbox__player">
                    <video
                        ref={videoRef}
                        className="reel-lightbox__video"
                        controls
                        autoPlay
                        playsInline
                        muted={false}
                        preload="none"
                        poster={reel.thumb}
                    >
                        <source src={reel.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="reel-lightbox__meta">
                    <h3 className="reel-lightbox__title">{reel.title}</h3>
                    <a
                        className="reel-lightbox__ig-link"
                        href={reel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on Instagram &rarr;
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function VideoWork() {
    const [activeReel, setActiveReel] = useState(null);

    return (
        <section className="video-work" id="video">
            <div className="video-work__inner">

                <motion.div
                    className="video-work__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="video-work__label text-label">// VIDEO WORK</p>
                    <h2 className="video-work__title text-display">Reels in the Wild</h2>
                </motion.div>

                <motion.div
                    className="video-work__stats"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <div className="video-work__stat">
                        <span className="video-work__stat-value">91M+</span>
                        <span className="video-work__stat-label">Combined Views</span>
                    </div>
                    <div className="video-work__stat">
                        <span className="video-work__stat-value">4.6M+</span>
                        <span className="video-work__stat-label">Combined Likes</span>
                    </div>
                    <div className="video-work__stat video-work__stat--highlight">
                        <span className="video-work__stat-value">The Olympics</span>
                        <span className="video-work__stat-label">Commissioned Client</span>
                    </div>
                </motion.div>

                <div className="video-work__grid">
                    {reels.map((reel, i) => (
                        <ReelCard key={reel.id} reel={reel} index={i} onPlay={setActiveReel} />
                    ))}
                </div>

                <motion.a
                    className="video-work__cta"
                    href="https://www.instagram.com/lightnlense/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    See More on Instagram &#8599;
                </motion.a>

            </div>

            <AnimatePresence>
                {activeReel && (
                    <ReelLightbox
                        key={activeReel.id}
                        reel={activeReel}
                        onClose={() => setActiveReel(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

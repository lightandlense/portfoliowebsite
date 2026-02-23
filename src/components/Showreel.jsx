import { motion } from 'framer-motion';
import './Showreel.css';

export default function Showreel() {
    return (
        <section className="showreel" id="reel">
            <div className="showreel__inner">

                <motion.p
                    className="showreel__label text-label"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    // SHOWREEL
                </motion.p>

                <motion.h2
                    className="showreel__title text-display"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    The Work in Motion
                </motion.h2>

                {/* Video stage — replace the inner div with a <video> or YouTube iframe */}
                <motion.div
                    className="showreel__stage"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* PLACEHOLDER — swap for:
                        <video src="/videos/reel-loop.mp4" autoPlay muted loop playsInline />
                        or a YouTube embed iframe */}
                    <div className="showreel__placeholder">
                        <div className="showreel__play-btn" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <p className="showreel__placeholder-text">Reel coming soon</p>
                    </div>
                </motion.div>

                <motion.a
                    className="showreel__cta"
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Watch Full Reel ↗
                </motion.a>

            </div>
        </section>
    );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const textReveal = {
    hidden: { opacity: 0, y: 80, skewY: 3 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        skewY: 0,
        transition: {
            duration: 0.9,
            delay: 0.4 + i * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: 'easeOut' },
    }),
};

export default function Hero() {
    return (
        <section className="hero">
            {/* Headline */}
            <div className="hero__headline">
                {/* Eyebrow — personal intro */}
                <motion.p
                    className="hero__eyebrow"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                >
                    // HI, I&apos;M
                </motion.p>

                {/* Top Row — first name */}
                <div className="hero__headline-row hero__headline-row--top">
                    <motion.h1
                        className="hero__title hero__title--massive"
                        variants={textReveal}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                    >
                        RUSSELL
                    </motion.h1>
                </div>

                {/* Side text — role, sits between the two headline rows */}
                <motion.div
                    className="hero__side-text"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={1.0}
                >
                    <p>CREATIVE<br />TECHNOLOGIST<br />PROJECTION &amp; AI</p>
                </motion.div>

                {/* Bottom Row — last name */}
                <div className="hero__headline-row hero__headline-row--bottom">
                    <motion.h1
                        className="hero__title hero__title--massive"
                        variants={textReveal}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        style={{ marginLeft: 'auto' }}
                    >
                        KLIMAS
                    </motion.h1>
                </div>
            </div>

            {/* Description */}
            <motion.div
                className="hero__description"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={1.5}
            >
                <p className="hero__description-label">
          // WHAT I DO
                </p>
                <p className="hero__description-text">
                    I turn walls and architecture into moving image, and build
                    the AI tools and automated workflows that make ambitious
                    creative work actually ship.
                </p>
            </motion.div>

            {/* Phones: show real work on the first screen */}
            <motion.div
                className="hero__featured"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={0.8}
            >
                <Link to="/classic/work/paintsong" className="hero__featured-link">
                    <img src="/work/paintsong/images/wall-painted.jpg" alt="Russell's shadow painting a projected wall in neon light" />
                    <span className="hero__featured-caption">Featured: Paintsong, a projected wall you play with your shadow ↗</span>
                </Link>
            </motion.div>
        </section>
    );
}

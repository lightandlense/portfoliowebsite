import { motion } from 'framer-motion';
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
                {/* Top Row */}
                <div className="hero__headline-row hero__headline-row--top">
                    <motion.h1
                        className="hero__title hero__title--massive"
                        variants={textReveal}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                    >
                        THE FUTURE
                    </motion.h1>
                </div>

                {/* Side text — sits between the two headline rows */}
                <motion.div
                    className="hero__side-text"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={1.0}
                >
                    <p>// AI THAT<br />TRANSFORMS<br />YOUR VISION</p>
                </motion.div>

                {/* Bottom Row */}
                <div className="hero__headline-row hero__headline-row--bottom">
                    <motion.h1
                        className="hero__title hero__title--massive"
                        variants={textReveal}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        style={{ marginLeft: 'auto' }}
                    >
                        IS LUMINOUS
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
          // WE ARE LIGHT & LENSE
                </p>
                <p className="hero__description-text">
                    An AI solutions and experimental art agency crafting
                    immersive digital experiences, generative visuals, and
                    intelligent systems that push the boundaries of what's possible.
                </p>
            </motion.div>
        </section>
    );
}

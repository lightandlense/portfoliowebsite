import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AiHairExtensions.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay, ease: 'easeOut' },
    }),
};

function CsImage({ src, alt, caption, bleed }) {
    return (
        <motion.figure
            className={`cs__image${bleed ? ' cs__image--bleed' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
        >
            <img src={src} alt={alt} />
            {caption && <figcaption className="cs__image-caption">{caption}</figcaption>}
        </motion.figure>
    );
}

export default function WonderMachine() {
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
                    // CASE STUDY — GOOGLE CREATIVE FELLOWSHIP
                </motion.p>

                <motion.h1
                    className="cs__title text-display"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                >
                    Wonder Machine
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    A portfolio you can play with. An illustrated retro machine with four physical
                    controls — each one unlocking a different chapter of a creative life,
                    powered by real-time ML and Web Audio synthesis.
                </motion.p>

                <motion.div
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.45}
                    style={{ marginBottom: '2.5rem' }}
                >
                    <a
                        href="https://googlefellowshiprussellklimas.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cs__live-link"
                    >
                        Try the Machine ↗
                    </a>
                </motion.div>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">4</span>
                        <span className="cs__stat-label">Interactive Experiences</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">30+</span>
                        <span className="cs__stat-label">FPS ML Tracking</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">0</span>
                        <span className="cs__stat-label">Server Required</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Hero image ── */}
            <CsImage
                src="/images/work/wonder-machine/machine-front.jpeg"
                alt="Russell's Wonder Machine — illustrated retro cash register with interactive controls"
                caption="The Wonder Machine — an illustrated retro device with four physical controls, each triggering a unique experience"
                bleed
            />

            {/* ── Body content ── */}
            <div className="cs__body">

                {/* Overview */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Concept</h2>
                    <p className="cs__text">
                        The Google Creative Fellowship application asked for a digital artifact
                        that showcases creative identity using Google AI tools. Most applicants
                        build portfolios. This one became a machine.
                    </p>
                    <p className="cs__text">
                        Russell's creative path spans poetry, music, dance, photography, and
                        projection mapping. Rather than presenting those as a list or a grid,
                        the Wonder Machine packages each discipline into a physical-feeling
                        interactive control — a rotary dial, a pull-down lever, a shutter button,
                        a flip switch. Visitors don't browse the work. They play with it.
                    </p>
                </motion.section>

                {/* The four interactions */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Four Controls</h2>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Rotary Dial → Theremin</h3>
                            <p className="cs__pillar-text">
                                MediaPipe hand tracking maps your right hand's X position to pitch
                                (200–2000 Hz) and left hand's Y position to volume. Move your
                                hands in front of the webcam and play synthesized music — no
                                instrument required.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Lever → Dance</h3>
                            <p className="cs__pillar-text">
                                Pull the lever to trigger a YMCA pose-matching game. MediaPipe
                                Pose tracks 33 body landmarks in real time, overlays a skeleton
                                on the webcam feed, and scores how well you match each pose.
                                Shareable scorecards generated on completion.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Shutter → Polaroid</h3>
                            <p className="cs__pillar-text">
                                A webcam countdown leads to an instant polaroid capture —
                                complete with the vintage frame overlay and the photo sliding
                                out of the receipt slot. The physical metaphor runs all the
                                way through. Download-ready.
                            </p>
                        </div>
                    </div>

                    <div className="cs__pillars" style={{ marginTop: '1.5rem' }}>
                        <div className="cs__pillar" style={{ gridColumn: '1 / -1' }}>
                            <h3 className="cs__pillar-title">Flip Switch → Projection Mapping</h3>
                            <p className="cs__pillar-text">
                                Flip the switch to trigger a theatrical reveal of Russell's
                                downtown Colorado Springs projection mapping installations —
                                five murals lit across a single 6-hour window. The machine
                                transforms, a projector unfolds from the compartment, and
                                the work plays.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Machine transformation */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Machine Transforms</h2>
                    <p className="cs__text">
                        Each interaction doesn't just trigger content — it physically changes
                        the machine. GSAP animation timelines orchestrate each reveal:
                        a disco ball descends from the ceiling compartment for the dance
                        experience, a camera rises from the back for polaroids, a projector
                        unfolds for the mapping reel. The machine is alive.
                    </p>

                    <div className="cs__spec-grid">
                        <div className="cs__spec">
                            <span className="cs__spec-label">Machine Asset</span>
                            <span className="cs__spec-value">6 AI-generated ImageFX images of the illustrated machine in each state — every control position, every compartment configuration</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Animations</span>
                            <span className="cs__spec-value">GSAP 3.14 timeline engine — sequenced, smooth transitions between machine states with mechanical audio feedback</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">3D Elements</span>
                            <span className="cs__spec-value">Three.js + @react-three/fiber — disco ball, gramophone, and coil rendered in 3D alongside the 2D illustrated machine</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">ML Vision</span>
                            <span className="cs__spec-value">@mediapipe/tasks-vision 0.10.32 — hand tracking and 33-landmark pose detection running at 30+ FPS, entirely client-side</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Audio</span>
                            <span className="cs__spec-value">Tone.js oscillators for theremin synthesis + Howler.js for mechanical click sounds and shutter audio</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Stack</span>
                            <span className="cs__spec-value">TypeScript + Vite — fully static, no backend, no server required. Built and deployed as pure client-side HTML/CSS/JS</span>
                        </div>
                    </div>
                </motion.section>

                {/* Google tools */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Built with Google</h2>
                    <div className="cs__roi">
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">MediaPipe</h3>
                            <p className="cs__roi-text">
                                Google's own ML vision framework powers both the theremin and
                                the dance game — running <strong>real-time inference in the browser</strong>
                                with no server roundtrips. The fellowship brief asked for
                                Google AI tools; MediaPipe is the load-bearing beam.
                            </p>
                        </div>
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">ImageFX + Antigravity</h3>
                            <p className="cs__roi-text">
                                Every machine state image was generated with <strong>Google ImageFX</strong>.
                                The code itself was developed with <strong>Antigravity</strong>,
                                Google's AI IDE — making the project a demonstration of the
                                full Google creative stack, not just one tool.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Takeaways */}
                <motion.section
                    className="cs__section cs__section--last"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Key Takeaways</h2>
                    <div className="cs__takeaways">
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">01</span>
                            <div>
                                <h3 className="cs__takeaway-title">The Metaphor Is the Experience</h3>
                                <p className="cs__takeaway-text">
                                    Wrapping four completely different interactions inside one
                                    coherent physical metaphor is what makes the machine memorable.
                                    Without the metaphor, you have four demos. With it, you have
                                    a world.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">02</span>
                            <div>
                                <h3 className="cs__takeaway-title">Real-Time ML as Creative Material</h3>
                                <p className="cs__takeaway-text">
                                    Hand tracking and pose detection aren't just features — they're
                                    the medium. Using the visitor's own body as an instrument
                                    collapses the distance between the work and the audience
                                    in a way that no grid of images can.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">03</span>
                            <div>
                                <h3 className="cs__takeaway-title">Scope as Strategy</h3>
                                <p className="cs__takeaway-text">
                                    Four polished, complete interactions beat six half-finished
                                    ones. Every cut was a decision to go deeper on what was there,
                                    not wider. The machine is a proof of concept that creative
                                    vision and technical execution aren't in tension — they're
                                    the same thing.
                                </p>
                            </div>
                        </div>
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

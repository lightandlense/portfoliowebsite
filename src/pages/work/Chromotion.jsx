import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AiHairExtensions.css';
import './Chromotion.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay, ease: 'easeOut' },
    }),
};

export default function Chromotion() {
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
                    // CASE STUDY — CREATIVE TECHNOLOGY
                </motion.p>

                <motion.h1
                    className="cs__title text-display"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                >
                    Chromotion
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    Color a printed template with crayons. Hold it up to the camera. Watch it
                    come alive on screen — painted in your exact colors, pulled from the paper
                    in real time.
                </motion.p>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">4</span>
                        <span className="cs__stat-label">Installations</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">Real-Time</span>
                        <span className="cs__stat-label">Color Extraction</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">Zero</span>
                        <span className="cs__stat-label">App Install</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Hero image ── */}
            <motion.div
                className="chr__hero-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="cs__image cs__image--bleed">
                    <img
                        src="/images/casestudyimages/Chromotion/plane-screenshot.jpg"
                        alt="Draw A Plane — scanned WWII fighters flying over a carrier scene, part of the same scan-to-life pipeline Chromotion pioneered."
                    />
                    <p className="cs__image-caption">
                        Draw A Plane, running the same pipeline Chromotion pioneered.
                    </p>
                </div>
            </motion.div>

            {/* ── Body ── */}
            <div className="cs__body">

                {/* Overview */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Project Overview</h2>
                    <p className="cs__text">
                        Chromotion is the pipeline behind four coloring-to-life installations.
                        Visitors receive a printed template — ArUco registration markers in each
                        corner — and color it however they want. When they hold it up to the
                        camera, a computer vision pipeline reads the color of each region, maps
                        it to the matching part, and applies the colors to a real-time animated
                        scene. The subject comes alive on screen wearing exactly what was drawn
                        on the paper.
                    </p>
                    <p className="cs__text">
                        The scanning pipeline auto-discovers new templates dropped into its
                        folder — adding a new subject requires no config changes. That same
                        scan-to-life pipeline now powers three more installations: Draw A Dino,
                        Draw A Fish, and Draw A Plane.
                    </p>
                </motion.section>

                {/* Challenge */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Challenge</h2>
                    <p className="cs__text">
                        Coloring is one of the oldest creative acts. Screens are everywhere.
                        Getting the two to actually talk to each other — so that the crayon marks
                        on the paper become real attributes of something that moves — is harder
                        than it looks.
                    </p>

                    <div className="cs__math-block">
                        <p className="cs__math-equation">
                            Paper + crayon = static. Paper + camera + code = alive.
                        </p>
                        <p className="cs__math-result">Make the coloring matter. Make it move.</p>
                    </div>

                    <p className="cs__text">
                        The technical constraints were tight. Color extraction had to tolerate
                        crayon texture, uneven lighting, and imprecise coloring within region
                        boundaries. Registration had to work without asking the user to do
                        anything precise. The whole pipeline had to run fast enough that the
                        result felt instant.
                    </p>
                </motion.section>

                {/* How it works */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">How It Works</h2>
                    <p className="cs__text">
                        Three steps. No instructions needed.
                    </p>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Color the Template</h3>
                            <p className="cs__pillar-text">
                                Visitors receive a printed template with ArUco registration
                                markers in each corner. They color it with any crayons or markers.
                                No rules about staying inside the lines.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Scan and Extract</h3>
                            <p className="cs__pillar-text">
                                The camera detects the ArUco markers and corrects for tilt
                                and distance. Computer vision samples each region and extracts the
                                dominant color. The result is a color map tied to the subject's parts.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Bring to Life</h3>
                            <p className="cs__pillar-text">
                                The color map is sent to the real-time scene. Each part updates
                                to match — the subject comes alive wearing exactly what was
                                colored on the paper.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Color it yourself */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Color It Yourself</h2>
                    <p className="cs__text">
                        The coloring page is the same idea across all three: pick a species,
                        pick colors, no rules about staying inside the lines.
                    </p>

                    <div className="chr__before-after">
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <img
                                    src="/images/casestudyimages/Chromotion/dino-coloring.jpg"
                                    alt="Draw A Dino online coloring page"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Dino</strong></p>
                        </div>
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <img
                                    src="/images/casestudyimages/Chromotion/fish-coloring.jpg"
                                    alt="Draw A Fish online coloring page"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Fish</strong></p>
                        </div>
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <img
                                    src="/images/casestudyimages/Chromotion/plane-coloring.jpg"
                                    alt="Draw A Plane online coloring page"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Plane</strong></p>
                        </div>
                    </div>
                </motion.section>

                {/* Print it instead */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Print It Instead</h2>
                    <p className="cs__text">
                        The original, kiosk-friendly path: a printable sheet with a scan code,
                        colored with real crayons or markers.
                    </p>

                    <div className="chr__before-after">
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <img
                                    src="/images/casestudyimages/Chromotion/dino-printable.jpg"
                                    alt="Draw A Dino printable coloring sheet with scan code"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Dino</strong></p>
                        </div>
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <img
                                    src="/images/casestudyimages/Chromotion/fish-printable.jpg"
                                    alt="Draw A Fish printable coloring sheet with scan code"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Fish</strong></p>
                        </div>
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <img
                                    src="/images/casestudyimages/Chromotion/plane-printable.jpg"
                                    alt="Draw A Plane printable coloring sheet with scan code"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Plane</strong></p>
                        </div>
                    </div>
                </motion.section>

                {/* Before / After */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Where It Went Next</h2>
                    <p className="cs__text">
                        Same registration + scan pipeline, different worlds: a prehistoric
                        landscape, an aquarium, and a WWII carrier scene.
                    </p>

                    <div className="chr__before-after">
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <img
                                    src="/images/casestudyimages/Chromotion/dino-screenshot.jpg"
                                    alt="Draw A Dino scene with scanned dinosaurs"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Dino</strong></p>
                        </div>
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <img
                                    src="/images/casestudyimages/Chromotion/fish-screenshot.jpg"
                                    alt="Draw A Fish aquarium with scanned sea creatures"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Fish</strong> — shared globally</p>
                        </div>
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <img
                                    src="/images/casestudyimages/Chromotion/plane-screenshot.jpg"
                                    alt="Draw A Plane carrier scene with scanned WWII fighters"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Plane</strong></p>
                        </div>
                    </div>

                    <p className="cs__text">
                        <a href="https://draw-a-dino.vercel.app/welcome.html" target="_blank" rel="noreferrer">Draw A Dino ↗</a>
                        {' · '}
                        <a href="https://draw-a-fish-mu.vercel.app/welcome.html" target="_blank" rel="noreferrer">Draw A Fish ↗</a>
                        {' · '}
                        <a href="https://draw-a-plane.vercel.app/welcome.html" target="_blank" rel="noreferrer">Draw A Plane ↗</a>
                    </p>
                </motion.section>

                {/* Demo video */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">In Action</h2>
                    <div className="chr__before-after">
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <video
                                    src="/images/casestudyimages/Chromotion/dino-demo.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    aria-label="Draw A Dino demo — scanned dinosaurs walking a prehistoric scene"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Dino</strong> Scanned dinosaurs walking a prehistoric scene.</p>
                        </div>
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <video
                                    src="/images/casestudyimages/Chromotion/fish-demo.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    aria-label="Draw A Fish demo — scanned sea creatures swimming a projected aquarium"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Fish</strong> Scanned sea creatures swimming a projected aquarium — synced globally, so fish scanned anywhere in the world swim in too.</p>
                        </div>
                        <div className="chr__ba-item">
                            <div className="chr__ba-image">
                                <video
                                    src="/images/casestudyimages/Chromotion/plane-demo.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    aria-label="Draw A Plane demo — scanned WWII fighters flying over a carrier"
                                />
                            </div>
                            <p className="cs__image-caption"><strong>Draw A Plane</strong> Scanned WWII fighters flying over a carrier.</p>
                        </div>
                    </div>
                </motion.section>

                {/* Implementation */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Implementation</h2>
                    <div className="cs__spec-grid">
                        <div className="cs__spec">
                            <span className="cs__spec-label">Color Extraction</span>
                            <span className="cs__spec-value">Python + OpenCV. Per-region sampling with percentile-based color selection to handle crayon texture and edge noise.</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Registration</span>
                            <span className="cs__spec-value">ArUco markers at all four corners. Perspective correction handles tilt, distance, and hand tremor without user effort.</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Rendering</span>
                            <span className="cs__spec-value">Pixi.js sprite scene. Each part is a separate sprite layer — colors swap without re-rendering the full scene.</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Server</span>
                            <span className="cs__spec-value">Python HTTP server auto-discovers new templates by folder name. Adding a new subject requires no config changes.</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Hardware</span>
                            <span className="cs__spec-value">Any USB camera, any display. Runs in a browser tab. Kiosk mode needs no native install on the host machine.</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Sibling Builds</span>
                            <span className="cs__spec-value">Draw A Dino, Draw A Fish, and Draw A Plane all run this exact pipeline — swap the template art, the pipeline doesn't change.</span>
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
                                <h3 className="cs__takeaway-title">The Paper Is the Input Device</h3>
                                <p className="cs__takeaway-text">
                                    Removing the touchscreen from the equation changes who can
                                    participate. A three-year-old with a red crayon has the same
                                    access as anyone else. The coloring sheet is the controller.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">02</span>
                            <div>
                                <h3 className="cs__takeaway-title">Registration Without Effort</h3>
                                <p className="cs__takeaway-text">
                                    ArUco markers handle all the geometry correction invisibly.
                                    Visitors never align anything, hold anything still, or follow
                                    any instruction about distance or angle. The system compensates
                                    for all of it.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">03</span>
                            <div>
                                <h3 className="cs__takeaway-title">Extensible by Design</h3>
                                <p className="cs__takeaway-text">
                                    The pipeline discovers new templates by folder — dropping in
                                    a new subject requires no config edits. Draw A Dino, Draw A
                                    Fish, and Draw A Plane are proof: same scan-and-render core,
                                    entirely different worlds.
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

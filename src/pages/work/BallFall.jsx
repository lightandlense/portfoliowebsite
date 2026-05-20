import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AiHairExtensions.css';
import './BallFall.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay, ease: 'easeOut' },
    }),
};

// Source GIFs were 373MB combined. Converted to MP4 with ffmpeg (autoplay +
// loop + muted reproduces the GIF behavior at ~2% of the size). Originals
// live in /Behance for Russell's Behance uploads.
//
// objectPosition controls how the 16:9 tile crops each clip. "50% Y%" where
// Y < 50 shows more of the top of the source, Y > 50 shows more of the bottom.
// First two clips have the action in the lower half, so we nudge the crop
// window upward (Y=70) to keep the cup visible.
const processVideos = [
    { src: '/images/casestudyimages/BallFall/process-1.mp4',
      objectPosition: '50% 30%',
      label: 'First prototype. Color only.',
      caption: 'Red cardboard blocks divert white balls into a cup. A hidden number seven sits inside the cup as the win reveal. No fiducial markers on the blocks yet.' },
    { src: '/images/casestudyimages/BallFall/process-2.mp4',
      objectPosition: '50% 40%',
      label: 'First digital mechanic.',
      caption: 'Same red blocks, same white balls, but now a digital bumper joins the simulation. The physical and the digital are starting to talk.' },
    { src: '/images/casestudyimages/BallFall/process-3.mp4',
      objectPosition: '50% 50%',
      label: 'ArUco markers arrive.',
      caption: 'Each block gets a printed ArUco marker. Placing one over a fan turns the fan off. The blocks become tools for removing obstacles, not only adding them.' },
    { src: '/images/casestudyimages/BallFall/process-4.mp4',
      objectPosition: '50% 50%',
      label: 'The current build.',
      caption: 'Sprites redrawn in Adobe Firefly so every mechanic scales cleanly. Pipes, spikes, and a full set of new traps. A yellow spring block bounces balls in a new direction.' },
];

export default function BallFall() {
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
                    Ball Fall
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    A physical-digital puzzle wall where cardboard becomes physics. Players
                    arrange real blocks in front of a projection. A camera reads each block's
                    color and marker. The simulation responds within one frame.
                </motion.p>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">25</span>
                        <span className="cs__stat-label">Mechanics</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">2</span>
                        <span className="cs__stat-label">Block Types</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">&lt; 1</span>
                        <span className="cs__stat-label">Frame Response</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Hero image ── */}
            <motion.div
                className="bf__hero-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="cs__image cs__image--bleed">
                    <img
                        src="/images/casestudyimages/BallFall/install-layout-diagram.jpg"
                        alt="Ball Fall install layout. Ceiling-mounted camera and projector facing a wall, with a player and block shelf in front."
                    />
                    <p className="cs__image-caption">
                        System layout. The camera reads the wall. The projector writes to the wall. The player closes the loop.
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
                        Ball Fall is an interactive installation built for a wall. A projector
                        beams a physics sandbox onto a flat surface. Players place real cardboard
                        blocks in front of it. A camera reads each block's color and printed ArUco
                        marker. The simulation spawns the matching ramp, spring, or bumper at the
                        block's position and orientation. Balls drop from the top. The blocks
                        decide where they land.
                    </p>
                    <p className="cs__text">
                        The whole system is built from scratch in vanilla JavaScript and runs in
                        a browser tab. No game engine, no native app, no fabricated controls.
                        Cardboard plus a camera plus a projector.
                    </p>
                </motion.section>

                {/* Challenge */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Challenge</h2>
                    <p className="cs__text">
                        Most physics puzzle games live behind glass. You tap a screen, the screen
                        does the work, you watch. The tactile, social, share-a-block-with-the-kid-
                        next-to-you part is missing. The wall ought to be the game, and the
                        cardboard ought to be the controller.
                    </p>

                    <div className="cs__math-block">
                        <p className="cs__math-equation">
                            Screen + tap = passive. Wall + cardboard = social.
                        </p>
                        <p className="cs__math-result">Move the play off the screen, onto the wall.</p>
                    </div>

                    <p className="cs__text">
                        The constraints were strict. No proprietary hardware. No native app. No
                        fabricated controllers. Computer vision had to be reliable enough that
                        a museum or escape room could trust the system to run unattended.
                    </p>
                </motion.section>

                {/* Solution */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Strategic Solution</h2>
                    <p className="cs__text">
                        Three components, each kept as simple as possible so the system can be
                        installed without specialist support.
                    </p>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Physical Toolkit</h3>
                            <p className="cs__pillar-text">
                                Two block types. Red for blocking and routing. Yellow for
                                bouncing. Each block carries a printed ArUco marker. Replaceable
                                in seconds. No electronics inside the props.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Live Computer Vision</h3>
                            <p className="cs__pillar-text">
                                A camera tracks markers at twenty frames per second. A four-point
                                homography maps camera pixels to projection pixels. Calibration
                                takes thirty seconds and survives a refresh.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Browser-Native Engine</h3>
                            <p className="cs__pillar-text">
                                Matter.js physics, vanilla JavaScript, zero build step. The
                                same browser tab runs the editor, the engine, and the wall.
                                Levels save as readable JSON.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Process Timeline */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Process Timeline</h2>
                    <p className="cs__text">
                        Four short videos in chronological order, from the first cardboard-only
                        prototype to the current build with twenty-five mechanics and a level
                        editor.
                    </p>

                    <div className="bf__video-grid">
                        {processVideos.map((v, i) => (
                            <div key={i} className="bf__video-grid-item">
                                <div className="bf__gif">
                                    <video
                                        src={v.src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        aria-label={`Ball Fall — ${v.label}`}
                                        style={{ objectPosition: v.objectPosition || '50% 50%' }}
                                    />
                                </div>
                                <p className="cs__image-caption">
                                    <strong>{v.label}</strong> {v.caption}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* The Toolkit */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Toolkit</h2>
                    <p className="cs__text">
                        Twenty-five mechanics shipped in the first build. Ramps, bumpers, springs,
                        fans, pipes, conveyors, gates, magnets, containers, spike pits, lasers,
                        turrets, wrecking balls, and more. Each one earns its place by being
                        readable from across the room.
                    </p>
                    <div className="cs__image">
                        <img
                            src="/images/casestudyimages/BallFall/toolkit-edit.png"
                            alt="The Ball Fall level editor showing the toolkit palette with all twenty-five mechanics."
                        />
                        <p className="cs__image-caption">
                            The browser-based level editor. Every mechanic in the toolkit lives one drag away.
                        </p>
                    </div>
                </motion.section>

                {/* Architecture */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">System Architecture</h2>
                    <p className="cs__text">
                        A closed loop between physical blocks and projected physics. The player
                        moves a block. The camera sees the new position within one frame. The
                        browser updates the physics simulation. The projector writes the new
                        scene back onto the wall. The whole cycle runs at the speed of vision.
                    </p>
                    <div className="cs__image">
                        <img
                            src="/images/casestudyimages/BallFall/architecture-diagram.jpg"
                            alt="System architecture diagram showing the closed loop between wall, camera, browser pipeline, and projector."
                        />
                        <p className="cs__image-caption">
                            Wall → Camera → Browser → Projector → Wall. The player moves a block. The wall responds within one frame.
                        </p>
                    </div>
                </motion.section>

                {/* Calibration */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Calibration</h2>
                    <p className="cs__text">
                        The wall is never perfectly square to the camera. A four-point
                        calibration step fixes that. The user clicks the four corners of the
                        play area in the webcam feed, then clicks the matching corners on the
                        projected canvas. An eight-equation linear system solves for the
                        perspective transform between camera pixels and projection pixels. The
                        result saves to the browser and survives a refresh.
                    </p>
                    <div className="cs__image">
                        <img
                            src="/images/casestudyimages/BallFall/calibration-diagram.jpg"
                            alt="Calibration diagram showing four corner points mapped between a tilted webcam view and a clean projection canvas."
                        />
                        <p className="cs__image-caption">
                            Four-point homography. Same math as cv2.getPerspectiveTransform. Runs in thirty seconds.
                        </p>
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
                            <span className="cs__spec-label">Engine</span>
                            <span className="cs__spec-value">Vanilla JavaScript + Matter.js, zero build step, runs in a single browser tab</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Computer Vision</span>
                            <span className="cs__spec-value">js-aruco2 marker detection at 20 FPS, throttled to protect physics frame time</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Calibration</span>
                            <span className="cs__spec-value">4-point perspective homography, Gaussian elimination, ~30 second setup</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Hardware</span>
                            <span className="cs__spec-value">Any USB camera plus any HDMI projector. Mini PC sufficient for permanent install.</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Toolkit</span>
                            <span className="cs__spec-value">25 mechanics, 2 physical block types, browser-based level editor</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Source</span>
                            <span className="cs__spec-value">Open source on GitHub — github.com/lightandlense/ball-fall-editor</span>
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
                                <h3 className="cs__takeaway-title">Tangible Beats Tactile</h3>
                                <p className="cs__takeaway-text">
                                    Putting the game on a wall and the controls in players' hands
                                    changes the social shape of play. People hand each other
                                    blocks. They point at the wall. They argue about strategy.
                                    None of that happens around a screen.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">02</span>
                            <div>
                                <h3 className="cs__takeaway-title">Browser-Native Wins for Installs</h3>
                                <p className="cs__takeaway-text">
                                    The same browser tab runs the editor, the engine, the
                                    calibration, and the show. No build pipeline, no native
                                    binaries, no platform drift. A museum can update a level by
                                    editing a JSON file.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">03</span>
                            <div>
                                <h3 className="cs__takeaway-title">Replicable Without Specialists</h3>
                                <p className="cs__takeaway-text">
                                    The system runs on any USB camera and any HDMI projector. A
                                    venue with a laptop and a short-throw projector can install it
                                    in an afternoon. Marker cards are paper, replaceable on the
                                    spot. The system is open source.
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

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AiHairExtensions.css';
import './ProjectionMapping.css';

const additionalVideos = [
    { id: 'zUIReR9ckJ8', label: 'Site 02' },
    { id: 'D8kUmybstMA', label: 'Site 03' },
    { id: 'gVnhbEdxMCg', label: 'Site 04' },
    { id: 'ASF4NTmzxyk', label: 'Site 05' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay, ease: 'easeOut' },
    }),
};

export default function ProjectionMapping() {
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
                    // CASE STUDY — PROJECTION MAPPING
                </motion.p>

                <motion.h1
                    className="cs__title text-display"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                >
                    Urban Projection
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    A multi-site projection mapping feasibility study across five mural surfaces
                    in downtown Colorado Springs — deployed by a two-person team within a single
                    six-hour window, with zero structural modification to any site.
                </motion.p>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">5</span>
                        <span className="cs__stat-label">Sites Activated</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">6 hrs</span>
                        <span className="cs__stat-label">Deployment Window</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">2</span>
                        <span className="cs__stat-label">Person Team</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Hero Video ── */}
            <motion.div
                className="pm__video-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="pm__video">
                    <iframe
                        src="https://www.youtube.com/embed/UVEOhV4b6XM"
                        title="Projection Mapping — Downtown Colorado Springs, Site 01"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <p className="cs__image-caption pm__caption">
                    Site 01 — live activation, downtown Colorado Springs
                </p>
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
                        Five independent projection mapping installations were deployed across existing
                        murals in downtown Colorado Springs within a single six-hour window. The project
                        was self-initiated — a controlled feasibility demonstration rather than a
                        commissioned event.
                    </p>
                    <p className="cs__text">
                        The objective was to validate rapid deployment, operational efficiency, and
                        scalable creative production using existing architectural surfaces. Rather than
                        waiting for a brief, the initiative proactively demonstrated what programmable
                        public art could look like at city scale. A smaller projection-mapped piece was
                        also integrated into a New Year's Eve civic celebration, confirming compatibility
                        within structured municipal event environments.
                    </p>
                </motion.section>

                {/* Challenge */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Challenge</h2>
                    <p className="cs__text">
                        The primary barrier was not technical execution — it was perception. Projection
                        mapping is consistently viewed by mid-sized cities as logistically complex,
                        high-risk, and budget-prohibitive. Without a local precedent, immersive
                        activation remains theoretical for civic and commercial decision-makers.
                    </p>

                    <div className="cs__math-block">
                        <p className="cs__math-equation">
                            No local precedent = no budget allocation = no activation
                        </p>
                        <p className="cs__math-result">Break the loop. Build the proof.</p>
                    </div>

                    <p className="cs__text">
                        The challenge was to eliminate that uncertainty by proving deployment feasibility
                        under real-world conditions — active streets, existing surfaces, live urban
                        environment — without waiting for permission or commission.
                    </p>
                </motion.section>

                {/* Solution */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Strategic Solution</h2>
                    <p className="cs__text">
                        A lightweight, software-first production model was developed to minimize
                        physical infrastructure while maximizing scalability and documentation value.
                    </p>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Creative Pipeline</h3>
                            <p className="cs__pillar-text">
                                ~4 weeks of creative development using After Effects-based animation
                                with AI-assisted asset generation to accelerate visual experimentation
                                and iteration across five distinct mural surfaces.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Lean Deployment</h3>
                            <p className="cs__pillar-text">
                                A portable projection system built for rapid setup and teardown,
                                operated by two people across five unique locations — no fabrication,
                                no staging crew, no structural modification to any site.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Digital Canvas</h3>
                            <p className="cs__pillar-text">
                                By leveraging existing murals as projection surfaces, static
                                architecture was transformed into temporary programmable media —
                                maximizing visual impact at near-zero infrastructure cost.
                            </p>
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
                            <span className="cs__spec-label">Creative Production</span>
                            <span className="cs__spec-value">After Effects compositing + AI-assisted workflows for asset ideation and rapid iteration</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Operational Model</span>
                            <span className="cs__spec-value">Portable projection system — rapid setup and teardown, 2-person execution team</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Input</span>
                            <span className="cs__spec-value">Existing architectural mural surfaces + original motion content</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Output</span>
                            <span className="cs__spec-value">5 fully realized installations documented in vertical and horizontal formats for portfolio and civic presentation</span>
                        </div>
                    </div>
                </motion.section>

                {/* Additional Videos */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">All Five Sites</h2>
                    <p className="cs__text">
                        Each location presented a distinct mural surface and spatial context.
                        All five were activated within the same evening window.
                    </p>

                    <div className="pm__video-grid">
                        {additionalVideos.map(({ id, label }) => (
                            <div key={id} className="pm__video-grid-item">
                                <div className="pm__video">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${id}`}
                                        title={`Projection Mapping — Downtown Colorado Springs, ${label}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <p className="cs__image-caption">{label} — downtown Colorado Springs</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Impact */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Operational Impact</h2>
                    <p className="cs__text">
                        While not structured as a measured economic activation, the initiative
                        successfully demonstrated four capabilities that matter to future civic
                        and commercial partners.
                    </p>

                    <div className="cs__roi">
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Multi-Site Scalability</h3>
                            <p className="cs__roi-text">
                                Five locations activated in one evening validates repeatability
                                for larger event rollouts across an entire city block or district.
                            </p>
                        </div>
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Infrastructure Efficiency</h3>
                            <p className="cs__roi-text">
                                No LED walls, scenic builds, or permanent alterations. Existing
                                architecture becomes the medium — <strong>the city is the stage</strong>.
                            </p>
                        </div>
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Lean Execution</h3>
                            <p className="cs__roi-text">
                                Two operators executed full deployment without additional crew,
                                fabrication, or staging infrastructure — a fraction of traditional
                                public activation overhead.
                            </p>
                        </div>
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Content Flexibility</h3>
                            <p className="cs__roi-text">
                                All projection content is digitally adaptable. Seasonal events,
                                civic celebrations, brand overlays — marginal cost for content
                                updates is <strong>significantly lower</strong> than physical redesign.
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
                                <h3 className="cs__takeaway-title">Feasibility Proven</h3>
                                <p className="cs__takeaway-text">
                                    Multi-location projection mapping can be executed efficiently
                                    within downtown Colorado Springs under real-world urban conditions —
                                    the proof now exists on camera.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">02</span>
                            <div>
                                <h3 className="cs__takeaway-title">Repeatable Framework</h3>
                                <p className="cs__takeaway-text">
                                    The deployment model supports direct expansion into scheduled civic
                                    programming, festival integration, and sponsored events — the
                                    infrastructure and pipeline already exist.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">03</span>
                            <div>
                                <h3 className="cs__takeaway-title">Foundation for Growth</h3>
                                <p className="cs__takeaway-text">
                                    This pilot establishes a blueprint for future activations
                                    incorporating audience metrics, business partnerships, and
                                    structured event promotion — built on a deployment model
                                    that has already been tested in the field.
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

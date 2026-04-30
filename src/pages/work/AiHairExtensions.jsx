import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AiHairExtensions.css';

const metrics = [
    { label: 'Total Assets', traditional: '10,000', ai: '10,000', improvement: '—' },
    { label: 'Production Time', traditional: '10–12 Months', ai: '3–4 Weeks', improvement: '12× Faster' },
    { label: 'Estimated Cost', traditional: '$150,000–$300,000+', ai: '$5,000–$15,000', improvement: '95% Reduction' },
    { label: 'Styling Labor', traditional: '1,000+ hours', ai: '0 hours', improvement: '100% Eliminated' },
];

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

export default function AiHairExtensions() {
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
                    // CASE STUDY — GENERATIVE AI
                </motion.p>

                <motion.h1
                    className="cs__title text-display"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                >
                    AI Hair Extensions
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    How a custom ComfyUI pipeline replaced a six-figure photography
                    workflow — delivering 10,000 commercial assets in weeks,
                    not months, at a fraction of the cost.
                </motion.p>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">10,000</span>
                        <span className="cs__stat-label">Unique Assets</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">12×</span>
                        <span className="cs__stat-label">Faster Delivery</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">95%</span>
                        <span className="cs__stat-label">Cost Reduction</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Hero image — full bleed ── */}
            <CsImage
                src="/images/work/hair-extensions/hair extension example.png"
                alt="AI-generated hair extension output examples"
                caption="Real hair extensions (top) with AI-generated models wearing each style applied (bottom)"
                bleed
            />

            {/* ── Body content ── */}
            <div className="cs__body">
                {/* Overview */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Project Overview</h2>
                    <p className="cs__text">
                        The client required a comprehensive visual catalog for a hair product line.
                        The scope was massive: 8 product types — including complex styles like Balayage
                        and Ombré — across 50 color variations, 5 hair lengths, and 5 distinct poses.
                        In a traditional setting, this demands hundreds of hours of manual styling,
                        studio shooting, and post-production retouching.
                    </p>
                    <p className="cs__text">
                        Our challenge was to deliver every variation at commercial quality, on time,
                        and within a budget that traditional photography simply could not meet.
                    </p>
                </motion.section>

                {/* The Math */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Challenge</h2>
                    <p className="cs__text">
                        The core problem was a combinatorial explosion. The brief was straightforward
                        on paper — but the numbers told a different story.
                    </p>

                    <div className="cs__math-block">
                        <p className="cs__math-equation">
                            8 styles × 50 colors × 5 lengths × 5 poses
                        </p>
                        <p className="cs__math-result">= 10,000 unique assets</p>
                    </div>

                    <p className="cs__text">
                        Physical photography at this scale is practically impossible for most budgets.
                        It would require dozens of models or expensive wigs, hundreds of hours in the
                        stylist's chair, and a massive post-production team to maintain color consistency
                        across thousands of shots. A traditional execution would take 6–12 months
                        with a budget likely exceeding six figures.
                    </p>
                </motion.section>

                {/* The Solution */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The AI Solution</h2>
                    <p className="cs__text">
                        We built a custom automation pipeline in ComfyUI that transformed a single
                        “hero” model image into the full spectrum of required variations — without
                        stepping foot in a studio.
                    </p>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Color Mapping</h3>
                            <p className="cs__pillar-text">
                                Instead of manual recoloring in post, the system used brand-provided
                                hex references to apply hex-accurate colors directly to the model's
                                hair — maintaining tonal depth and realism across all 50 variations.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Dynamic Styling</h3>
                            <p className="cs__pillar-text">
                                The workflow procedurally adjusted hair length and applied complex
                                patterns like Balayage and Ombré while preserving the model's identity,
                                lighting, and background consistency throughout.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Automated Posing</h3>
                            <p className="cs__pillar-text">
                                Via API integration, we generated 5 distinct poses for every
                                color/length combination — ensuring the full catalog felt dynamic
                                and varied rather than repetitive.
                            </p>
                        </div>
                    </div>

                    <CsImage
                        src="/images/work/hair-extensions/hair length example.png"
                        alt="Hair length variation examples across 5 lengths"
                        caption="5 hair length variations applied procedurally — no reshooting required"
                    />
                    <CsImage
                        src="/images/work/hair-extensions/pose examples.png"
                        alt="5 distinct pose variations generated via API"
                        caption="5 pose variations generated per color/length combination via API integration"
                    />
                </motion.section>
                {/* Implementation */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Implementation</h2>
                    <div className="cs__spec-grid">
                        <div className="cs__spec">
                            <span className="cs__spec-label">Core Model</span>
                            <span className="cs__spec-value">Nano Banana (via API) — high-fidelity texture and realistic hair rendering</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Orchestration</span>
                            <span className="cs__spec-value">ComfyUI — logic gates for color application and length modification</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Input</span>
                            <span className="cs__spec-value">1 source model image + 1 color swatch per variation</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Output</span>
                            <span className="cs__spec-value">High-resolution, commercially ready images via batch processing</span>
                        </div>
                    </div>

                    <CsImage
                        src="/images/work/hair-extensions/workflow screenshot.png"
                        alt="ComfyUI workflow pipeline screenshot"
                        caption="The ComfyUI automation pipeline — color mapping, length adjustment, and pose generation in a single graph"
                    />
                </motion.section>

                {/* Impact Table */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Impact Analysis</h2>
                    <p className="cs__text">
                        The transition from lens-based to AI-driven production delivered exponential
                        gains in both speed and cost-efficiency.
                    </p>

                    <div className="cs__table-wrap">
                        <table className="cs__table">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Traditional Photography</th>
                                    <th>AI Workflow</th>
                                    <th>Improvement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.map(row => (
                                    <tr key={row.label}>
                                        <td>{row.label}</td>
                                        <td className="cs__table-trad">{row.traditional}</td>
                                        <td className="cs__table-ai">{row.ai}</td>
                                        <td className="cs__table-gain">{row.improvement}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="cs__roi">
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Time Saved</h3>
                            <p className="cs__roi-text">
                                At 20 finished assets per working day (traditional), the project would
                                require 500 working days. The AI workflow compressed this to weeks —
                                saving an estimated <strong>4,000+ man-hours</strong>.
                            </p>
                        </div>
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Perfect Consistency</h3>
                            <p className="cs__roi-text">
                                Unlike physical shoots where lighting and hair placement shift
                                between sessions, the AI workflow guaranteed <strong>100% consistency</strong> in
                                model features and background across all 10,000 frames.
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
                                <h3 className="cs__takeaway-title">Infinite Scalability</h3>
                                <p className="cs__takeaway-text">
                                    Adding a 51st color or a 6th hair length now takes minutes —
                                    not another studio booking.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">02</span>
                            <div>
                                <h3 className="cs__takeaway-title">Specification Over Capture</h3>
                                <p className="cs__takeaway-text">
                                    We moved from “capturing” reality to “generating” specifications.
                                    Balayage and Ombré patterns now match brand guidelines perfectly,
                                    every time.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">03</span>
                            <div>
                                <h3 className="cs__takeaway-title">Market Velocity</h3>
                                <p className="cs__takeaway-text">
                                    The client can now launch entire seasonal catalogs in the time
                                    it previously took to book a single model.
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

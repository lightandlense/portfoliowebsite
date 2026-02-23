import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AiHairExtensions.css';
import './AiVoiceAssistant.css';

const metrics = [
    { label: 'Call Capture Rate', before: '60% (Missed after-hours)', after: '100%', improvement: '+40% Lead Capture' },
    { label: 'Booking Speed', before: '4–12 Hours (Callback)', after: '< 3 Minutes (Instant)', improvement: '95% Faster' },
    { label: 'Owner Availability', before: 'On-call 24/7', after: '0 hrs after 6:00 PM', improvement: '100% Time Reclaimed' },
    { label: 'Data Accuracy', before: 'Manual / Handwritten', after: '100% Automated', improvement: 'Errors Eliminated' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay, ease: 'easeOut' },
    }),
};

export default function AiVoiceAssistant() {
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
                    // CASE STUDY — AI VOICE AGENT
                </motion.p>

                <motion.h1
                    className="cs__title text-display"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                >
                    AI Voice Assistant
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    How a 24/7 AI Voice Agent with MCP and Google Calendar integration
                    turned an HVAC owner's after-hours burnout into a fully automated,
                    always-on booking operation — reclaiming 100% of personal time while
                    increasing lead capture rate to 100%.
                </motion.p>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">+40%</span>
                        <span className="cs__stat-label">Lead Capture</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">95%</span>
                        <span className="cs__stat-label">Faster Booking</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">100%</span>
                        <span className="cs__stat-label">Time Reclaimed</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Demo Video ── */}
            <motion.div
                className="cs__video-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="cs__video">
                    <iframe
                        src="https://www.youtube.com/embed/UD4BS_9pIKc"
                        title="AI Voice Assistant Demo — HVAC Case Study"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <p className="cs__image-caption" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0.75rem 3rem 0' }}>
                    Live demo — the AI voice agent handling an after-hours HVAC inquiry and booking a technician in real time
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
                        The client, an HVAC service provider, was caught in a pattern that's common
                        in home services: a missed call after hours is almost always a lost lead.
                        But answering every late-night inquiry was destroying the owner's work-life
                        balance. This case study documents the transition from that high-stress,
                        reactive operation to a fully automated, always-on booking system.
                    </p>
                    <p className="cs__text">
                        By integrating a custom AI Voice Agent with the Model Context Protocol (MCP)
                        and Google Calendar, we didn't just automate a phone line — we reclaimed
                        the owner's personal time while simultaneously increasing the business's
                        capture rate to 100%.
                    </p>
                </motion.section>

                {/* Challenge */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Challenge</h2>
                    <p className="cs__text">
                        The business faced a three-fold problem that compounded on itself daily.
                    </p>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Operational Burnout</h3>
                            <p className="cs__pillar-text">
                                The owner had to remain on-call 24/7, leading to sleep deprivation
                                and reduced focus during the peak service hours that actually mattered.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Data Silos</h3>
                            <p className="cs__pillar-text">
                                Information gathered during late-night calls was scribbled on paper
                                or memorized, leading to data entry errors, missed follow-ups, and
                                zero audit trail.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Scheduling Friction</h3>
                            <p className="cs__pillar-text">
                                Without a live receptionist, customers waited hours for a callback
                                to confirm availability — giving them time to call a competitor instead.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Solution */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The AI Solution</h2>
                    <p className="cs__text">
                        We deployed a custom AI Voice Agent designed to act as a 24/7 virtual
                        dispatcher. Unlike a standard answering service, this agent has operational
                        intelligence — it doesn't just take messages, it resolves them.
                    </p>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Real-Time FAQ</h3>
                            <p className="cs__pillar-text">
                                Via an MCP (Model Context Protocol) server, the agent connects to
                                a technical knowledge base to answer specific questions about HVAC
                                models, pricing, and emergency procedures — accurately, every time.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Calendar Sync</h3>
                            <p className="cs__pillar-text">
                                The agent has read/write access to the company's Google Calendar,
                                allowing it to verify real-time openings and book technician slots
                                instantly — no callback required.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Structured Data Capture</h3>
                            <p className="cs__pillar-text">
                                Every call is transcribed. Key data — name, address, unit issue —
                                is automatically piped into a structured CRM database, with zero
                                manual entry and zero data loss.
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
                            <span className="cs__spec-label">Voice Orchestration</span>
                            <span className="cs__spec-value">Low-latency voice AI platform (Vapi / Retell) for natural, human-like conversation flow</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Knowledge Layer</span>
                            <span className="cs__spec-value">MCP server acting as the operational brain — pulls from a dynamic FAQ and parts database</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Calendar Integration</span>
                            <span className="cs__spec-value">Google Calendar API for real-time availability checks and instant booking event creation</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">CRM / Database</span>
                            <span className="cs__spec-value">Structured lead storage (Airtable / CRM) with automated SMS + email booking confirmations to client and technician</span>
                        </div>
                    </div>
                </motion.section>

                {/* Impact */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Impact Analysis</h2>
                    <p className="cs__text">
                        The implementation moved the business from a reactive state to an automated
                        growth state. Every metric improved simultaneously.
                    </p>

                    <div className="cs__table-wrap">
                        <table className="cs__table">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Before</th>
                                    <th>After</th>
                                    <th>Improvement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.map(row => (
                                    <tr key={row.label}>
                                        <td>{row.label}</td>
                                        <td className="cs__table-trad">{row.before}</td>
                                        <td className="cs__table-ai">{row.after}</td>
                                        <td className="cs__table-gain">{row.improvement}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="cs__roi">
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Time Reclaimed</h3>
                            <p className="cs__roi-text">
                                The owner previously spent an estimated <strong>10–15 hours per week</strong> managing
                                after-hours calls and administrative scheduling. That number is now zero
                                after 6:00 PM — every day, permanently.
                            </p>
                        </div>
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Revenue Unlocked</h3>
                            <p className="cs__roi-text">
                                At an average HVAC service call value of $300, capturing just
                                <strong> 3 additional leads per week</strong> that previously went to
                                competitors generates an extra <strong>$3,600/month</strong> in top-line revenue.
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
                                <h3 className="cs__takeaway-title">Standardization</h3>
                                <p className="cs__takeaway-text">
                                    Every customer receives the same high-quality, polite, and informed
                                    response regardless of the time of day — something no human on-call
                                    system can consistently deliver at 2 AM.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">02</span>
                            <div>
                                <h3 className="cs__takeaway-title">Reliability</h3>
                                <p className="cs__takeaway-text">
                                    The MCP-backed knowledge base ensures the AI never guesses on pricing
                                    or technical capabilities. Answers are pulled from a verified source,
                                    not improvised.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">03</span>
                            <div>
                                <h3 className="cs__takeaway-title">Scale</h3>
                                <p className="cs__takeaway-text">
                                    The system handles multiple simultaneous calls during a heatwave or
                                    storm — scenarios that would overwhelm any single owner or receptionist,
                                    and exactly when the business needs to capture the most leads.
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

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

export default function JobHunter() {
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
                    // CASE STUDY — AI AUTOMATION
                </motion.p>

                <motion.h1
                    className="cs__title text-display"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                >
                    Job Hunter
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    A fully autonomous job search agent that scrapes boards, scores matches,
                    tailors your resume with Claude, and delivers a curated digest to your inbox
                    — while you sleep.
                </motion.p>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">Any</span>
                        <span className="cs__stat-label">Job, Any Industry</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">100%</span>
                        <span className="cs__stat-label">Automated</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">0</span>
                        <span className="cs__stat-label">Hours of Manual Search</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Hero image — full bleed ── */}
            <CsImage
                src="/images/casestudyimages/Job Hunter/Screenshot 2026-04-13 113812.png"
                alt="Job Hunter dashboard — job inbox with match scores and resume generation"
                bleed
            />

            {/* ── Body content ── */}
            <div className="cs__body">

                {/* Overview */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Problem</h2>
                    <p className="cs__text">
                        Job searching is a grind no matter the field. Relevant postings are
                        scattered across LinkedIn, Indeed, and dozens of company boards that
                        don't talk to each other. Staying on top of every listing while tailoring
                        applications is a full-time job on top of finding one.
                    </p>
                    <p className="cs__text">
                        Job Hunter eliminates that overhead entirely. Configure your target roles
                        and boards once — it runs in the background, checks on a schedule, filters
                        for what actually matches, and produces a ready-to-send tailored resume
                        for every hit. No manual effort required.
                    </p>
                </motion.section>

                {/* How it works */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">How It Works</h2>
                    <p className="cs__text">
                        The system runs as a persistent Windows tray application with a FastAPI
                        backend. APScheduler triggers scraping runs on a configurable cadence.
                        Each new posting passes through a matching pipeline, then into Claude
                        for resume tailoring, and finally into a daily email digest.
                    </p>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Smart Scraping</h3>
                            <p className="cs__pillar-text">
                                Playwright handles headless browsing across job boards with
                                configurable delays and anti-detection behavior. BeautifulSoup
                                parses the results and stores new postings in a local SQLite
                                database — deduplication built in.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Title Matching</h3>
                            <p className="cs__pillar-text">
                                A configurable matcher filters postings against your defined
                                target role titles — however many you need — surfacing only
                                the listings that are actually relevant before any AI
                                processing happens.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Resume Tailoring</h3>
                            <p className="cs__pillar-text">
                                Matched postings are passed to Claude with the base resume
                                and the full job description. Claude rewrites the resume
                                to mirror the language and priorities of each specific role,
                                then exports a polished PDF via ReportLab.
                            </p>
                        </div>
                    </div>

                    <CsImage
                        src="/images/casestudyimages/Job Hunter/Screenshot 2026-04-13 113904.png"
                        alt="Job Hunter showing Claude-tailored resume for a specific job posting"
                        caption="Claude tailors the resume in real time — mirroring the language and priorities of each specific role"
                    />
                </motion.section>

                {/* Tech stack */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Under the Hood</h2>
                    <div className="cs__spec-grid">
                        <div className="cs__spec">
                            <span className="cs__spec-label">Scraping</span>
                            <span className="cs__spec-value">Playwright + BeautifulSoup — headless browsing with configurable delays</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">AI Layer</span>
                            <span className="cs__spec-value">Anthropic Claude API — resume analysis and job-specific tailoring</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Backend</span>
                            <span className="cs__spec-value">FastAPI server + SQLite database — persistent job tracking and deduplication</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Scheduling</span>
                            <span className="cs__spec-value">APScheduler — configurable scrape intervals running as a Windows tray app</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Output</span>
                            <span className="cs__spec-value">ReportLab PDF generation — tailored resume ready to attach and send</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Delivery</span>
                            <span className="cs__spec-value">Resend API — daily email digest with matched jobs and tailored resume links</span>
                        </div>
                    </div>
                </motion.section>

                {/* Impact */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Shift</h2>
                    <div className="cs__roi">
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">From Manual to Autonomous</h3>
                            <p className="cs__roi-text">
                                What used to take <strong>1–2 hours daily</strong> — checking boards,
                                filtering noise, rewriting resume bullets — now happens overnight,
                                automatically. The morning digest is waiting in your inbox.
                            </p>
                        </div>
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Tailored, Not Generic</h3>
                            <p className="cs__roi-text">
                                Every application goes out with a resume written <strong>specifically
                                for that role</strong>. No more sending the same document to a
                                Creative Technologist role and an AI Content Strategist role
                                and hoping it fits both.
                            </p>
                        </div>
                    </div>
                    <CsImage
                        src="/images/casestudyimages/Job Hunter/Screenshot 2026-04-13 113823.png"
                        alt="Job Hunter application history table showing all applied jobs with status tracking"
                        caption="Application history — every job tracked with board source, applied date, and current status"
                    />
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
                                <h3 className="cs__takeaway-title">AI as a Personal Agent</h3>
                                <p className="cs__takeaway-text">
                                    This isn't a tool you use — it's a system that works for you.
                                    Claude doesn't just summarize job listings; it understands the
                                    difference between what you've done and what each role needs, then
                                    closes that gap in the resume.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">02</span>
                            <div>
                                <h3 className="cs__takeaway-title">Automation at the Edges</h3>
                                <p className="cs__takeaway-text">
                                    The hardest part of job searching isn't writing applications —
                                    it's finding the right ones in the first place. Automating
                                    discovery and filtering is where the real leverage is.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">03</span>
                            <div>
                                <h3 className="cs__takeaway-title">Configure Once, Run Forever</h3>
                                <p className="cs__takeaway-text">
                                    Target roles, boards, and schedules are all configurable.
                                    Job Hunter works for any industry and any set of titles —
                                    the current setup is personalized for AI/creative tech,
                                    but the engine underneath is general purpose.
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

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

function CsImage({ src, alt, caption, bleed, half }) {
    return (
        <motion.figure
            className={`cs__image${bleed ? ' cs__image--bleed' : ''}${half ? ' cs__image--half' : ''}`}
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

export default function Callitin() {
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
                    // CASE STUDY — MOBILE APP
                </motion.p>

                <motion.h1
                    className="cs__title text-display"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                >
                    Callitin
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    A mobile invoicing app built for freelancers who'd rather be doing the work.
                    Create, send, and track professional invoices in seconds — with speech-to-text
                    input and PDF delivery built in.
                </motion.p>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">iOS</span>
                        <span className="cs__stat-label">+ Android</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">14</span>
                        <span className="cs__stat-label">Day Free Trial</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">PDF</span>
                        <span className="cs__stat-label">Instant Export</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Hero image — full bleed ── */}
            <CsImage
                src="/images/casestudyimages/callitin/feature-graphic.png"
                alt="Callitin — Invoice with your voice"
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
                        Freelancers don't want to spend time on invoicing — they want to get paid.
                        Most invoicing tools are desktop-first, built for accountants, and overkill
                        for someone who sends 5–10 invoices a month. The friction of logging in,
                        navigating dashboards, and formatting PDFs manually adds up to hours lost
                        every month on admin that should take seconds.
                    </p>
                    <p className="cs__text">
                        Callitin is mobile-first by design. Add a client, describe the work,
                        and send a professional PDF invoice — all from your phone, in under
                        a minute.
                    </p>
                </motion.section>

                {/* Features */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Core Features</h2>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Speech-to-Text Input</h3>
                            <p className="cs__pillar-text">
                                Dictate line items, client names, and notes instead of typing.
                                Built for invoicing on the go — finish a job, bill for it
                                before you've packed up.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">PDF Generation</h3>
                            <p className="cs__pillar-text">
                                Every invoice exports as a polished, professional PDF instantly.
                                Share directly via email or messaging — no desktop required,
                                no extra steps.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Client Management</h3>
                            <p className="cs__pillar-text">
                                Save client profiles so repeat invoicing takes seconds.
                                Full invoice history per client — always know what's been
                                sent, paid, or outstanding.
                            </p>
                        </div>
                    </div>

                    <div className="cs__image-row">
                        <CsImage
                            src="/images/casestudyimages/callitin/Photo Mar 26 2026, 8 42 18 AM.png"
                            alt="Callitin invoice creation form with client details and line items"
                            caption="Creating an invoice — client profile, line items, and totals in a single screen"
                        />
                        <CsImage
                            src="/images/casestudyimages/callitin/Photo Mar 26 2026, 8 42 41 AM.png"
                            alt="Callitin invoice preview ready to send"
                            caption="Review and send — polished PDF invoice ready to share in one tap"
                        />
                    </div>
                </motion.section>

                {/* Tech stack */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Technical Foundation</h2>
                    <div className="cs__spec-grid">
                        <div className="cs__spec">
                            <span className="cs__spec-label">Framework</span>
                            <span className="cs__spec-value">React Native + Expo — single codebase for iOS, Android, and Web</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Backend</span>
                            <span className="cs__spec-value">Supabase — PostgreSQL database, auth, storage, and edge functions</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Routing</span>
                            <span className="cs__spec-value">Expo Router — file-based navigation with auth, onboarding, and invoice flows</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Validation</span>
                            <span className="cs__spec-value">React Hook Form + Zod — type-safe form handling with real-time validation</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Money Handling</span>
                            <span className="cs__spec-value">dinero.js — cents-based arithmetic to prevent floating point errors on invoices</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Subscriptions</span>
                            <span className="cs__spec-value">RevenueCat — cross-platform subscription management with App Store + Play Store integration</span>
                        </div>
                    </div>
                </motion.section>

                {/* Impact */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Design Philosophy</h2>
                    <div className="cs__roi">
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Mobile-First, Always</h3>
                            <p className="cs__roi-text">
                                Every screen was designed for <strong>one-handed use on a phone</strong>.
                                The invoice creation flow was stress-tested for the scenario where you're
                                standing outside a client's door — not sitting at a desk.
                            </p>
                        </div>
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Financial Precision</h3>
                            <p className="cs__roi-text">
                                Invoicing apps that round wrong or miscalculate tax destroy trust.
                                Callitin uses <strong>integer arithmetic throughout</strong> — every
                                calculation happens in cents, then formats for display. No surprises.
                            </p>
                        </div>
                    </div>
                    <div className="cs__image-row">
                        <CsImage
                            src="/images/casestudyimages/callitin/Photo Mar 26 2026, 8 44 43 AM.png"
                            alt="Callitin dashboard showing outstanding invoices and recent activity"
                            caption="Dashboard — outstanding balance and recent activity at a glance"
                        />
                        <CsImage
                            src="/images/casestudyimages/callitin/Photo Mar 26 2026, 8 44 34 AM.png"
                            alt="Callitin clients list with invoice history per client"
                            caption="Client management — every contact saved with full invoice history"
                        />
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
                                <h3 className="cs__takeaway-title">Constraint as Design</h3>
                                <p className="cs__takeaway-text">
                                    Limiting the scope to invoicing — not accounting, not tax,
                                    not payroll — kept the app fast, focused, and learnable in minutes.
                                    Freelancers don't need QuickBooks. They need to get paid.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">02</span>
                            <div>
                                <h3 className="cs__takeaway-title">Cross-Platform Without Compromise</h3>
                                <p className="cs__takeaway-text">
                                    Building with Expo meant shipping to iOS and Android from one
                                    codebase without sacrificing native feel. RevenueCat unified
                                    subscription logic across both stores — no duplicated billing code.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">03</span>
                            <div>
                                <h3 className="cs__takeaway-title">The Voice Input Bet</h3>
                                <p className="cs__takeaway-text">
                                    Speech-to-text for invoicing was an unconventional call. For
                                    field-based freelancers — contractors, photographers, cleaners —
                                    it turned out to be the feature that made the app feel native
                                    to how they actually work.
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

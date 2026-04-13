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

export default function Spoonable() {
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
                    Spoonable
                </motion.h1>

                <motion.p
                    className="cs__subtitle"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                >
                    A recipe app built for the chronic illness community — where energy is the
                    scarcest ingredient. Every recipe is rated by how much it costs you,
                    not just how long it takes.
                </motion.p>

                <motion.div
                    className="cs__hero-stats"
                    variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                >
                    <div className="cs__stat">
                        <span className="cs__stat-value">3</span>
                        <span className="cs__stat-label">Spoon Tiers</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">$4.99</span>
                        <span className="cs__stat-label">Lifetime — No Subscription</span>
                    </div>
                    <div className="cs__stat">
                        <span className="cs__stat-value">100%</span>
                        <span className="cs__stat-label">Offline After First Sync</span>
                    </div>
                </motion.div>
            </header>

            {/* ── Body content ── */}
            <div className="cs__body">

                {/* Intro images */}
                <div className="cs__image-row">
                    <CsImage
                        src="/images/casestudyimages/Spoonable/spoonable-brand-card.jpg"
                        alt="Spoonable — Recipes by energy level"
                    />
                    <CsImage
                        src="/images/casestudyimages/Spoonable/Photo Apr 13 2026, 11 16 19 AM.png"
                        alt="Spoonable home screen — How are you feeling today?"
                    />
                </div>

                {/* The Problem */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Problem</h2>
                    <p className="cs__text">
                        People living with fibromyalgia, ME/CFS, POTS, ADHD, chronic pain, and
                        similar conditions face a paradox every day: cooking is necessary for
                        health, but cooking costs energy they may not have. Standard recipe apps
                        rate difficulty by time and skill — neither of which captures what actually
                        matters to this community.
                    </p>
                    <p className="cs__text">
                        The "spoon theory" framework — where spoons represent daily energy units —
                        has been used by the chronic illness community for decades to describe
                        this reality. Spoonable is built around it.
                    </p>

                    <div className="cs__math-block">
                        <p className="cs__math-equation">
                            active steps + pans to wash + time standing + ingredient count
                        </p>
                        <p className="cs__math-result">= real energy cost</p>
                    </div>
                </motion.section>

                {/* Core design */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">The Design</h2>
                    <p className="cs__text">
                        Every feature decision in Spoonable flows from one question: what does
                        this cost someone who has almost nothing to spare?
                    </p>

                    <div className="cs__pillars">
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Feel-Based Filtering</h3>
                            <p className="cs__pillar-text">
                                Filter by how you feel right now — exhausted, nauseous, in pain,
                                low mood, sensory sensitivity. Multiple feelings intersect using
                                AND logic, so "exhausted and nauseous" returns genuinely appropriate
                                results, not a union of two broader lists.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Spoon Cost Rating</h3>
                            <p className="cs__pillar-text">
                                1–3 spoons per recipe, calculated from real complexity factors:
                                active cooking steps, number of vessels to wash, time standing,
                                and ingredient count (spices excluded). Two or more pans always
                                equals 3 spoons — because dishwashing is a hidden cost.
                            </p>
                        </div>
                        <div className="cs__pillar">
                            <h3 className="cs__pillar-title">Offline-First</h3>
                            <p className="cs__pillar-text">
                                The entire recipe library works without internet after the first
                                sync. Delta sync via updated_at cursor means future syncs only
                                pull what changed — preserving battery and bandwidth for people
                                who can't afford to waste either.
                            </p>
                        </div>
                    </div>

                    <div className="cs__image-row">
                        <CsImage
                            src="/images/casestudyimages/Spoonable/Photo Apr 13 2026, 11 16 06 AM.png"
                            alt="Spoonable recipe detail showing spoon cost, nutrition, and Good for tags"
                            caption="Recipe detail — spoon cost, nutrition, and symptom tags at a glance"
                        />
                        <CsImage
                            src="/images/casestudyimages/Spoonable/Photo Apr 13 2026, 11 16 52 AM.png"
                            alt="Spoonable browse screen showing filtered recipe cards"
                            caption="Browse — filtered to match today's energy and dietary needs"
                        />
                    </div>
                </motion.section>

                {/* Tech stack */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Technical Architecture</h2>
                    <div className="cs__spec-grid">
                        <div className="cs__spec">
                            <span className="cs__spec-label">Framework</span>
                            <span className="cs__spec-value">Expo SDK 55 + React Native — requires dev client for native SQLite modules</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Local Database</span>
                            <span className="cs__spec-value">expo-sqlite with WAL mode + drizzle-orm — all recipe queries run locally, never over the network</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Remote Sync</span>
                            <span className="cs__spec-value">Supabase with RLS — delta sync using updated_at cursor prevents split-brain and wasted bandwidth</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">State</span>
                            <span className="cs__spec-value">Zustand — lightweight filter state for feel selections and allergen preferences</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Lists</span>
                            <span className="cs__spec-value">@shopify/flash-list — optimized rendering for long recipe lists without dropped frames</span>
                        </div>
                        <div className="cs__spec">
                            <span className="cs__spec-label">Monetization</span>
                            <span className="cs__spec-value">expo-iap — $4.99 one-time purchase. No subscription. Intentionally respectful of financially-constrained users.</span>
                        </div>
                    </div>
                </motion.section>

                {/* Values */}
                <motion.section
                    className="cs__section"
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    <h2 className="cs__section-title">Values in Code</h2>
                    <div className="cs__roi">
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">No Hustle Culture</h3>
                            <p className="cs__roi-text">
                                Copy throughout the app avoids advice like "meal prep on Sunday."
                                The tone is explicitly <strong>non-judgmental</strong> — no streaks,
                                no guilt, no performance metrics. Just food that's possible today.
                            </p>
                        </div>
                        <div className="cs__roi-item">
                            <h3 className="cs__roi-title">Respectful Monetization</h3>
                            <p className="cs__roi-text">
                                Subscription models extract money monthly from people with chronic
                                illness — often on fixed incomes. The <strong>$4.99 lifetime purchase</strong>
                                was a deliberate ethical choice, not just a business model decision.
                            </p>
                        </div>
                    </div>
                    <div className="cs__image-row">
                        <CsImage
                            src="/images/casestudyimages/Spoonable/Photo Apr 13 2026, 11 16 45 AM.png"
                            alt="Spoonable settings screen with allergen defaults and accessibility options"
                            caption="Settings — allergen filters, text size, dark mode, and dietary defaults"
                        />
                        <CsImage
                            src="/images/casestudyimages/Spoonable/Photo Apr 13 2026, 11 16 31 AM.png"
                            alt="Spoonable meal planning calendar — weekly spoon budget view"
                            caption="Meal planner — weekly view with spoon budget tracking across breakfast, lunch, dinner, and snacks"
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
                                <h3 className="cs__takeaway-title">Domain Knowledge as Architecture</h3>
                                <p className="cs__takeaway-text">
                                    Every technical decision — offline-first, AND-intersection filtering,
                                    spice exclusion from ingredient count — came from understanding how
                                    chronic illness actually works, not from generic app patterns.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">02</span>
                            <div>
                                <h3 className="cs__takeaway-title">Accessible by Default</h3>
                                <p className="cs__takeaway-text">
                                    Building for people with the least capacity means building
                                    something better for everyone. Offline-first, low-friction UI,
                                    and honest energy ratings are good design principles regardless
                                    of whether you're managing a chronic illness.
                                </p>
                            </div>
                        </div>
                        <div className="cs__takeaway">
                            <span className="cs__takeaway-num">03</span>
                            <div>
                                <h3 className="cs__takeaway-title">Community First</h3>
                                <p className="cs__takeaway-text">
                                    Community recipe submissions were built in from day one.
                                    The best knowledge about what's actually cookable on a
                                    bad fibromyalgia day lives in the community — not with the developer.
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

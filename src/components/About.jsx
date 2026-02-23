import { motion } from 'framer-motion';
import './About.css';

export default function About() {
    return (
        <section className="about" id="about">
            <div className="about__inner">

                <motion.div
                    className="about__text"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="about__label text-label">// ABOUT</p>

                    <h2 className="about__title text-display">
                        Russell Klimas
                    </h2>

                    <p className="about__role">
                        Creative Technologist — PROJECTION MAPPING & AI
                    </p>

                    <p className="about__bio">
                        I make projection-mapped environments and interactive installations — work that turns walls, structures, and architecture into moving image. Light becomes material. Space becomes story. Some pieces react to touch, sound, or presence; others are purely atmospheric. Either way, the work is precise, and it tends to sit somewhere between minimalism and spectacle without tipping into either.
                    </p>

                    <p className="about__bio">
                        Alongside the visual work, I build the systems that support it. Custom AI tools, automated workflows, production logistics — the behind-the-scenes infrastructure that keeps creative projects moving without the usual friction. Less overhead, more control.
                    </p>

                    <p className="about__bio">
                        I work with brands and event producers who want both sides of that equation: an experience that lands, and a process that doesn't fall apart getting there.
                    </p>

                    <div className="about__tools">
                        <p className="about__tools-label text-label">Tools & Technologies</p>
                        <div className="about__tools-list">
                            {['TouchDesigner', 'Madmapper', 'After Effects', 'Adobe Suite', 'ComfyUI', 'React', 'AI / Generative'].map(tool => (
                                <span key={tool} className="about__tool">{tool}</span>
                            ))}
                        </div>
                        <a
                            href="/images/Russell Klimas AI Resume 2026.pdf"
                            download
                            className="about__resume-link"
                        >
                            Download Resume ↓
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="about__image"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    <img src="/images/about me photo.jpg" alt="Russell Klimas" />
                </motion.div>

            </div>
        </section>
    );
}

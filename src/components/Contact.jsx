import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
    return (
        <section className="contact" id="contact">
            <div className="contact__inner">

                <motion.p
                    className="contact__label text-label"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    // CONTACT
                </motion.p>

                <motion.h2
                    className="contact__title text-display"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    Let's Make Something
                </motion.h2>

                <motion.a
                    className="contact__email"
                    href="mailto:mgmt@lightandlense.com"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                >
                    mgmt@lightandlense.com
                </motion.a>

                <motion.div
                    className="contact__links"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <a href="https://www.linkedin.com/in/russell-klimas/" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                        LinkedIn ↗
                    </a>
                    <span className="contact__social-divider" />
                    <a href="https://www.instagram.com/lightnlense/" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                        Instagram ↗
                    </a>
                    <span className="contact__social-divider" />
                    <a href="https://www.youtube.com/@RussellKlimas" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                        YouTube ↗
                    </a>
                </motion.div>

            </div>

            <div className="contact__footer">
                <p>© {new Date().getFullYear()} Light & Lense. All rights reserved.</p>
            </div>
        </section>
    );
}

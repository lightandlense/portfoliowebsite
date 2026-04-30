import { motion } from 'framer-motion';
import './Navbar.css';

const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Video', href: '#video' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    return (
        <motion.nav
            className="navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <a href="/" className="navbar__logo">
                <span className="navbar__logo-icon">✦</span>
                LIGHT & LENSE
            </a>

            <ul className="navbar__links">
                {navLinks.map((link, i) => (
                    <motion.li
                        key={link.label}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                        <a href={link.href} className="navbar__link">
                            {link.label}
                        </a>
                    </motion.li>
                ))}
            </ul>

            <motion.a
                href="#contact"
                className="navbar__cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
        // LET'S TALK
                <span className="navbar__cta-circle">↗</span>
            </motion.a>
        </motion.nav>
    );
}

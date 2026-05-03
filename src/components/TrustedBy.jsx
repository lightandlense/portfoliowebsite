import { motion } from 'framer-motion';
import './TrustedBy.css';

const logos = [
    { src: '/images/logos/olympics-logo-trans.png', alt: 'Olympics' },
    { src: '/images/logos/saudi-arabia-flag-trans.png', alt: 'Saudi Arabia' },
    { src: '/images/logos/adobe-transparent.png', alt: 'Adobe' },
    { src: '/images/logos/lumecube-logo-trans.png', alt: 'LumeCube' },
    { src: '/images/logos/nanlite-logo_brandlogos.net_jey7u.png', alt: 'Nanlite' },
    { src: '/images/logos/pubg-logo-trans.png', alt: 'PUBG' },
];

export default function TrustedBy() {
    return (
        <motion.section
            className="trusted-by"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
        >
            <div className="trusted-by__inner">
                <p className="trusted-by__label">
                    // Worked With
                </p>
                <div className="trusted-by__logos">
                    {logos.map(({ src, alt }) => (
                        <img
                            key={alt}
                            src={src}
                            alt={alt}
                            className={`trusted-by__logo${alt === 'Saudi Arabia' ? ' trusted-by__logo--color' : ''}`}
                            loading="lazy"
                        />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

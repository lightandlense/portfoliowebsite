import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Work.css';

const projects = [
    {
        id: 1,
        category: 'Generative Art — AI Workflow',
        title: 'AI Hair Extensions',
        description: '10,000 commercial hair catalog assets produced in weeks — not months. A custom ComfyUI pipeline replaced a $150K+ photography workflow with AI-generated variations at 95% cost reduction.',
        tags: ['ComfyUI', 'Generative AI', 'Commercial'],
        image: '/images/work/hair-extensions/hair extension example.png',
        slug: 'ai-hair-extensions',
    },
    {
        id: 2,
        category: 'AI Automation — Voice Agent',
        title: 'AI Voice Assistant',
        description: 'A 24/7 AI voice agent with MCP and Google Calendar integration that eliminated after-hours owner burnout, lifted call capture rate to 100%, and books technicians in under 3 minutes.',
        tags: ['Voice AI', 'MCP', 'Automation'],
        image: '/images/casestudyimages/ai assistant.jpg',
        slug: 'ai-voice-assistant',
    },
    {
        id: 3,
        category: 'Projection Mapping — Urban Activation',
        title: 'Urban Projection',
        description: 'Five projection mapping installations across downtown Colorado Springs murals — deployed by a 2-person team in a single 6-hour window. Zero structural modification. A feasibility study that built the proof of concept for city-scale programmable public art.',
        tags: ['Projection Mapping', 'Urban', 'Feasibility Study'],
        image: '/images/casestudyimages/butterflies.png',
        slug: 'projection-mapping-colorado-springs',
    },
    {
        id: 4,
        category: 'AI Automation — Job Search',
        title: 'Job Hunter',
        description: 'A fully autonomous job search agent — configure your target roles once, then let it scrape boards, score matches, tailor your resume with Claude, and deliver a digest to your inbox overnight.',
        tags: ['Claude API', 'Automation', 'Python'],
        image: '/images/casestudyimages/Job Hunter/Screenshot 2026-04-13 113812.png',
        slug: 'job-hunter',
    },
    {
        id: 5,
        category: 'Mobile App — Freelance Tools',
        title: 'Callitin',
        description: 'A mobile-first invoicing app for freelancers. Create professional PDF invoices with speech-to-text input, manage clients, and track payments — all from your phone in under a minute.',
        tags: ['React Native', 'Expo', 'Supabase'],
        image: '/images/casestudyimages/callitin/feature-graphic.png',
        slug: 'callitin',
    },
    {
        id: 6,
        category: 'Mobile App — Accessibility',
        title: 'Spoonable',
        description: 'A recipe app built for the chronic illness community. Every recipe is rated by real energy cost — spoon tiers based on active steps, pans to wash, and standing time. Offline-first. $4.99 lifetime.',
        tags: ['React Native', 'Expo', 'Offline-First'],
        image: '/images/casestudyimages/Spoonable/spoonable-brand-card.jpg',
        slug: 'spoonable',
    },
    {
        id: 7,
        category: 'Creative Technology — Google Fellowship',
        title: 'Wonder Machine',
        description: 'A portfolio you play with. An illustrated retro machine with four physical controls — each unlocking a different creative discipline via real-time MediaPipe ML, Web Audio theremin, and GSAP-animated machine transformations.',
        tags: ['MediaPipe', 'Three.js', 'GSAP'],
        image: '/images/work/wonder-machine/machine-front.jpeg',
        slug: 'wonder-machine',
    },
    {
        id: 8,
        category: 'Creative Technology — Physical-Digital Installation',
        title: 'Ball Fall',
        description: 'A physical-digital puzzle wall where cardboard becomes physics. Players arrange real blocks in front of a projection. A camera reads each block. The simulation responds within one frame. Twenty-five mechanics, two block types, vanilla JavaScript.',
        tags: ['Computer Vision', 'Matter.js', 'Projection Mapping'],
        image: '/images/casestudyimages/BallFall/mechanic-grid.jpg',
        slug: 'ball-fall',
    },
];

function WorkCard({ project, index }) {
    return (
        <motion.article
            className="work-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
        >
            <div className="work-card__image">
                {project.image ? (
                    <img src={project.image} alt={project.title} />
                ) : (
                    <div className="work-card__image-placeholder">
                        <span>// IMAGE PLACEHOLDER</span>
                    </div>
                )}
            </div>

            <div className="work-card__body">
                <p className="work-card__category text-label">{project.category}</p>
                <h3 className="work-card__title">{project.title}</h3>
                <p className="work-card__description">{project.description}</p>

                <div className="work-card__footer">
                    <div className="work-card__tags">
                        {project.tags.map(tag => (
                            <span key={tag} className="work-card__tag">{tag}</span>
                        ))}
                    </div>
                    <Link to={`/work/${project.slug}`} className="work-card__link">
                        View Case Study ↗
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}

export default function Work() {
    return (
        <section className="work" id="work">
            <div className="work__inner">

                <motion.div
                    className="work__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="work__label text-label">// SELECTED WORK</p>
                    <h2 className="work__title text-display">Case Studies</h2>
                </motion.div>

                <div className="work__grid">
                    {projects.map((project, i) => (
                        <WorkCard key={project.id} project={project} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}

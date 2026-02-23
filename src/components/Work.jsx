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

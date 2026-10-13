import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PROJECTS } from '../../os/data/projects';
import { ProjectWindow } from '../../os/windows/ProjectWindow';
import './ProjectPage.css';

// ponytail: phone/classic view of any OS project window, rendered from the same data.
// Hand-written /classic/work/* routes still win over this one.
export default function ProjectPage() {
    const { slug } = useParams();
    const p = PROJECTS.find((x) => x.slug === slug);
    useEffect(() => { window.scrollTo(0, 0); }, [slug]);
    if (!p) return <Navigate to="/classic" replace />;
    return (
        <div className="pp">
            <Link to="/classic" className="pp__back">← Back to Work</Link>
            <div className="pp__card"><ProjectWindow projectId={p.id} /></div>
        </div>
    );
}

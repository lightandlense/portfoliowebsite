import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectWindow } from './ProjectWindow';

describe('ProjectWindow', () => {
  it('renders a project with a video hero', () => {
    render(<ProjectWindow projectId="chromotion" />);
    expect(screen.getByText('Chromotion')).toBeInTheDocument();
    expect(screen.getByText('Real-Time')).toBeInTheDocument();
    expect(screen.getByText('Color Extraction')).toBeInTheDocument();
    expect(screen.getByText('Pixi.js')).toBeInTheDocument();
    const video = screen.getByTestId('project-hero-video');
    expect(video.querySelector('source')).toHaveAttribute('src', '/images/casestudyimages/Chromotion/demo.mp4');
  });
  it('renders an image hero project', () => {
    render(<ProjectWindow projectId="gizmo-factory" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/casestudyimages/GizmoFactory/title-card.jpg');
  });
  it('renders nothing for unknown id', () => {
    const { container } = render(<ProjectWindow projectId="nope" />);
    expect(container).toBeEmptyDOMElement();
  });
});

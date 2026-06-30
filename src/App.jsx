import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AiHairExtensions from './pages/work/AiHairExtensions';
import AiVoiceAssistant from './pages/work/AiVoiceAssistant';
import ProjectionMapping from './pages/work/ProjectionMapping';
import JobHunter from './pages/work/JobHunter';
import Callitin from './pages/work/Callitin';
import Spoonable from './pages/work/Spoonable';
import GizmoFactory from './pages/work/GizmoFactory';
import Chromotion from './pages/work/Chromotion';
import RealTimeExperiments from './pages/work/RealTimeExperiments';
import { OSApp } from './os/OSApp';
import { ArtScene } from './pages/ArtScene';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OSApp />} />
      <Route path="/art-scene" element={<ArtScene />} />
      <Route path="/classic" element={<Home />} />
      <Route path="/classic/work/ai-hair-extensions" element={<AiHairExtensions />} />
      <Route path="/classic/work/ai-voice-assistant" element={<AiVoiceAssistant />} />
      <Route path="/classic/work/projection-mapping-colorado-springs" element={<ProjectionMapping />} />
      <Route path="/classic/work/job-hunter" element={<JobHunter />} />
      <Route path="/classic/work/callitin" element={<Callitin />} />
      <Route path="/classic/work/spoonable" element={<Spoonable />} />
      <Route path="/classic/work/gizmo-factory" element={<GizmoFactory />} />
      <Route path="/classic/work/chromotion" element={<Chromotion />} />
      <Route path="/classic/work/real-time-experiments" element={<RealTimeExperiments />} />
    </Routes>
  );
}

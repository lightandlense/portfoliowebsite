import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AiHairExtensions from './pages/work/AiHairExtensions';
import AiVoiceAssistant from './pages/work/AiVoiceAssistant';
import ProjectionMapping from './pages/work/ProjectionMapping';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/ai-hair-extensions" element={<AiHairExtensions />} />
      <Route path="/work/ai-voice-assistant" element={<AiVoiceAssistant />} />
      <Route path="/work/projection-mapping-colorado-springs" element={<ProjectionMapping />} />
    </Routes>
  );
}

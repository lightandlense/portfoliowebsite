import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AiHairExtensions from './pages/work/AiHairExtensions';
import AiVoiceAssistant from './pages/work/AiVoiceAssistant';
import ProjectionMapping from './pages/work/ProjectionMapping';
import JobHunter from './pages/work/JobHunter';
import Callitin from './pages/work/Callitin';
import Spoonable from './pages/work/Spoonable';
import WonderMachine from './pages/work/WonderMachine';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/ai-hair-extensions" element={<AiHairExtensions />} />
      <Route path="/work/ai-voice-assistant" element={<AiVoiceAssistant />} />
      <Route path="/work/projection-mapping-colorado-springs" element={<ProjectionMapping />} />
      <Route path="/work/job-hunter" element={<JobHunter />} />
      <Route path="/work/callitin" element={<Callitin />} />
      <Route path="/work/spoonable" element={<Spoonable />} />
      <Route path="/work/wonder-machine" element={<WonderMachine />} />
    </Routes>
  );
}

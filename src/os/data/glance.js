// At-a-glance summary shown at the top of every case study, result first.
// Sourced only from each case study's own text. No line = the source didn't say.
export const GLANCE = {
  'projection-mapping-colorado-springs': {
    result: 'Five mural sites in downtown Colorado Springs were projection mapped in one six-hour window with no structural changes to any site.',
    role: 'Self-initiated, 2-person team',
    tech: 'Projection mapping, After Effects, portable projector rig, AI-assisted assets (one part of Site 04)',
    problem: 'Mid-sized cities see projection mapping as complex, risky and costly, and there was no local precedent to prove otherwise.',
  },
  'gizmo-factory': {
    result: 'A projected physics wall where cardboard blocks drive 25 mechanics, with the simulation responding within one frame.',
    role: 'Designed and built it, open source',
    tech: 'Vanilla JavaScript, Matter.js, js-aruco2, ArUco markers, projector, USB camera',
    problem: 'Physics puzzle games live behind glass, so the tactile, social part of play is missing.',
  },
  'chromotion': {
    result: 'A scan-to-life pipeline now powers four coloring installations: Draw A Dino, Draw A Fish, Draw A Plane, and the original.',
    role: 'Designed and built the pipeline',
    tech: 'Python, OpenCV, ArUco markers, Pixi.js, browser kiosk',
    problem: "Make a child's crayon colors on paper show up live on an animated subject, without asking them to do anything precise.",
    broke: 'Sprite-cut dinosaur legs looked stiff and bent when the head turned, and fins half-froze. Skeletal mesh skinning with per-leg bones fixed both.',
  },
  'real-time-experiments': {
    result: 'A running series of live, runnable interactive sketches: hand tracking, particle systems, audio-reactive visuals and WebGL.',
    role: 'Built the sketches',
    tech: 'TouchDesigner, WebGL, Three.js, MediaPipe hand tracking',
    problem: 'No single brief. The series explores real-time visuals driven by hands and sound.',
  },
  'vr-synesthesia': {
    result: "A working Quest 2 prototype that shows sound the way Sarah sees it. Her first reaction was \"Whoa. What in the world?\"",
    role: 'Built the app, working from her survey',
    tech: 'Unity, Meta Quest 2, YAMNet, 8-band audio analysis, mixed reality',
    problem: "A friend with synesthesia sees colors and shapes for sound, and I wanted a headset that lets others see what she sees.",
    broke: "The Quest allows one mic session and drops it when the app loses focus, so analysis and classifier share one stream that restarts itself.",
  },
  'ai-hair-extensions': {
    result: 'About 10,000 catalog images delivered in 3 to 4 weeks, versus an estimated 10 to 12 months and $150K to $300K+ by photography.',
    role: 'Built the automation pipeline',
    tech: 'ComfyUI, Nano Banana (via API), hex color mapping, batch processing',
    problem: 'A hair product line needed 8 styles x 50 colors x 5 lengths x 5 poses, too many for studio shoots.',
  },
  'spoonable': {
    result: 'A recipe app for the chronic illness community that rates recipes in spoons of energy, works offline, and costs $4.99 once.',
    role: 'Designed and built the app',
    tech: 'React Native, Expo, expo-sqlite, Supabase, Zustand',
    problem: "Recipe apps rate difficulty by time and skill, which misses the energy cooking costs people with chronic illness.",
  },
  'callitin': {
    result: 'A mobile-first invoicing app for iOS and Android that sends a PDF invoice from a phone in under a minute.',
    role: 'Designed and built the app',
    tech: 'React Native, Expo, Supabase, RevenueCat, dinero.js, Zod',
    problem: 'Freelancers lose hours to desktop-first invoicing tools built for accountants.',
  },
  'ai-voice-assistant': {
    result: 'For an HVAC client, call capture went from 60% to 100% and booking time from 4 to 12 hours to under 3 minutes.',
    role: 'Built the voice agent integration',
    tech: 'Vapi / Retell, MCP server, Google Calendar API, Airtable / CRM',
    problem: "Missed after-hours calls lost leads, and answering them kept the owner on call 24/7.",
  },
  'ai-email-creative': {
    result: 'Three lifecycle emails with product color held to one hex. The worst shot went from 20.1 to 4.6 color error (DeltaE).',
    role: 'Solo spec project, built end to end',
    tech: 'ComfyUI, SDXL, GroundingDINO + SAM, ProductColorLock, hand-coded HTML email',
    problem: "AI fashion images drift off the brand's exact color, so the coat in an email can be the wrong color.",
    broke: "A backlit win-back image still measured 8.0 DeltaE after the lock and failed the check. Re-lighting and re-rendering fixed it.",
  },
  'ad-variants': {
    result: 'One job file renders 24 ads in about 4 minutes, and one bad variant was blocked before render.',
    role: 'Designed and built it',
    tech: 'Remotion, React, Node.js, Pixi.js, JSON and CSV job files',
    problem: 'Ad teams resize and retype the same ad by hand for every placement and copy variant, and find mistakes after launch.',
    broke: "A deliberately long venue name would have rendered at 28 px against a 45 px minimum, so QA blocked it instead of shipping it.",
  },
  'paintsong': {
    result: 'One game in two versions: a projection wall played with your shadow, and an iPhone game with 100 levels, now on the App Store.',
    role: 'Designed and built both versions',
    tech: 'JavaScript, USB webcam shadow reading, projector, Expo iOS, synthesized audio',
    problem: 'Turn one ball-and-paint idea into a wall game played with your body and a phone game played by ear.',
  },
  'mystify': {
    result: 'A festival guide and web admin for Mystify Magic Festival, with 134 RegFox registrations synced and the schedule and maps working offline.',
    role: 'Built the app and admin',
    tech: 'Expo, React Native, Supabase, Next.js, Square, RegFox sync',
    problem: 'A few-hundred-person festival needed a schedule, maps and tickets that staff can update without a developer.',
    broke: "Sessions stored in Vegas time came back in UTC and evening shows landed on the wrong day tab. Every date is now pinned to the venue clock.",
  },
  'conversational-avatar': {
    result: 'A talking face that answers live with no per-minute cost, running on one local graphics card and projected on a real tree.',
    role: 'Designed and built it',
    tech: 'Pipecat, Whisper, Llama 3.1 via Ollama, Kokoro TTS, Three.js, Blender',
    problem: "A client asked for a talking tree, and hosted avatar services charge by the minute and keep the character on their servers.",
  },
  'tonightly': {
    result: 'Eval score rose from 4.24 to 4.53 out of 5 over 3 runs, and failed conversations dropped from about 4 per run to about 1.',
    role: 'Built the app and the eval harness',
    tech: 'AWS Bedrock, Claude, TMDB, Lambda, React, LLM-as-judge',
    problem: 'How do you know a TV-picks assistant is getting better, and not just different?',
    broke: "The first judge agreed with my own scores on 1 of 10 conversations, so I fixed the judge before the assistant.",
  },
  'job-hunter': {
    result: 'A job search agent that scrapes boards, matches titles, tailors a resume with Claude and emails a digest, turning 1 to 2 hours of daily searching into an overnight run.',
    role: 'Designed and built it',
    tech: 'Python, FastAPI, Playwright, Claude API, SQLite, APScheduler',
    problem: 'Relevant postings are scattered across boards, and tailoring each application is a second full-time job.',
  },
};
export const getGlance = (slug) => GLANCE[slug];

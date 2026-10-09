// Mirrors the creative-technology resume base (AgentTeam docs/jobs/tracks/creative-technology/cv.html).
export const RESUME = {
  name: 'Russell Klimas',
  contact: '719-522-3331 · rtklimas@gmail.com · Colorado Springs, CO · Open to travel and relocation',
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/russell-klimas' },
    { label: 'Portfolio', href: 'https://portfolio.lightandlense.com' },
  ],
  summary:
    'Creative technologist who builds interactive installations, real-time web experiences, and generative AI pipelines, and takes them from concept to a working demonstration. Self-produced six projection mapping installations in Colorado Springs, built camera-tracked, marker-driven, and voice-driven interactive pieces, and produced one paid projection installation for COATI food hall. Creative AI Consultant to Adobe since October 2023. Guinness World Record holder for the Largest Light Drawing by UAV, with 90M+ views across AI content and projection mapping. 10 years in web design, content and creative technology.',
  skills: [
    { label: 'Areas of Expertise', value: 'Interactive installations, projection mapping, computer vision and tracking, real-time web (Three.js, WebXR), generative AI pipelines, concept prototyping' },
    { label: 'Interactive & Real-Time', value: 'JavaScript, Three.js, WebXR, OpenCV, ArUco marker tracking, TensorFlow, Pixi.js, Unity and Quest mixed reality, TouchDesigner (working knowledge)' },
    { label: 'Generative AI', value: 'ComfyUI, LoRA training, Flux, Stable Diffusion, Runway, Kling, Veo, Midjourney, Adobe Firefly, speech-to-text and text-to-speech' },
    { label: 'Creative & 3D', value: 'Blender, Photoshop, After Effects, Premiere, Lightroom, photogrammetry site capture, projection planning' },
    { label: 'Hardware', value: 'Cameras and sensors, LED builds, Arduino and ESP32, lasers, soldering, resin 3D printing' },
    { label: 'Tools & Platforms', value: 'JavaScript, Python, Three.js, OpenCV, TensorFlow, Blender, TouchDesigner, Unity, ComfyUI, Runway, Kling, Veo, Photoshop, After Effects, Premiere, Claude Code, Arduino, ESP32' },
  ],
  recognition: [
    'Guinness World Record holder, Largest Light Drawing by UAV (13,200 square metres, 2021)',
    'TEDx Colorado Springs (September 2019), 42K+ views',
    'Featured in BBC, The Telegraph, Popular Mechanics, PetaPixel',
    'Insta360 Young Gun Award',
    'FAA Part 107 Remote Pilot Certificate',
  ],
  employment: [
    {
      company: 'Light & Lense LLC',
      location: 'Colorado Springs, CO',
      role: 'Owner and Creative Technologist',
      dates: 'June 2018 – Present',
      bullets: [
        'Self-produced six projection mapping installations across downtown Colorado Springs, owning site surveys, on-site execution, and live support; produced one paid one-night projection installation at COATI food hall (September 2026).',
        'Built a photogrammetry site capture workflow and a projection-planning tool for a landmark building proposal, and built WebXR and Quest 2 mixed reality experiences, including one for a synesthete.',
        'Built a custom LoRA and ComfyUI pipeline for October Stockholm that replaced traditional photo shoots, cutting cost by approximately 80%; delivered AI-generated images for ILC that replaced a photo shoot.',
        "Published Product Color Lock, an open-source ComfyUI node pack in Python that locks a product's true color in generated images and reports color error with a pass or fail quality gate (built with Claude Code).",
        'Built a YouTube channel with 202K+ views teaching Stable Diffusion and ComfyUI.',
        'Photograph events for local clients as paid freelance work.',
      ],
    },
    {
      company: 'Adobe (Consultant)',
      location: 'Remote',
      role: 'Creative AI Consultant and Adobe Ambassador',
      dates: 'October 2023 – Present',
      bullets: [
        'Advises Adobe product leads on generative AI tools; produced 16 paid Ambassador campaigns and an AI video campaign that reached 4M+ views.',
      ],
    },
    {
      company: 'Lander Media',
      location: 'Colorado Springs, CO',
      role: 'Project Lead',
      dates: 'July 2021 – October 2023',
      bullets: [
        'Led three photographers and one editor on photo, video, and copy campaigns across web, social, and print.',
      ],
    },
    {
      company: 'Wolf and Key Marketing (agency)',
      location: 'Colorado Springs, CO',
      role: 'Senior Web Designer and Content Creator',
      dates: 'December 2016 – March 2019',
      bullets: [
        'Designed and built websites and produced photo and video content for agency clients.',
      ],
    },
  ],
  projects: [
    'Gizmo Factory: ArUco marker physics sandbox built with vanilla JavaScript and Matter.js, with a level editor and 25+ tuned parameters; free version on GitHub.',
    'Chromotion: coloring-to-animation kiosk that scans a hand-colored paper template and animates it as a character in real time (OpenCV, ArUco, Pixi.js); built, not deployed.',
    "Draw A Dino and Draw A Fish: live scan-your-drawing browser experiences. Talking character: Blender-built head in Three.js driven by live AI voice, shown through a Pepper's Ghost and projection rig.",
    'Weather visualizer in TouchDesigner: pick any location worldwide and live weather data drives the visuals, with temperature shifting the palette warm to cool, wind pushing the imagery, and rain rendered as droplets on a window.',
    'Reactable Wall: wall-mounted tangible music instrument tracked by fiducial-marker computer vision. Also built gaze-reveal artworks, Breath Field, and Shadow Pup.',
  ],
  education: [
    { degree: "Associate's in Business", school: 'Pikes Peak State College · May 2011' },
  ],
  pdf: '/images/Russell Klimas - Creative Technology - Resume.pdf',
};

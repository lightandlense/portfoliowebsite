// Cookie Heist: R&D test for the gen-AI animation pipeline (shot 1 of a short in progress).
const V = '/work/cookie-heist/videos/';
const I = '/work/cookie-heist/images/';

export const COOKIE_HEIST = {
  id: 'cookie-heist',
  slug: 'cookie-heist',
  title: 'Cookie Heist',
  hideFromRail: true,
  category: 'Gen-AI Animation R&D: Seedance vs Wan 2.2 + VACE',
  tags: ['Wan 2.2', 'VACE', 'ComfyUI', 'Seedance', 'Blender', 'Previz'],
  stats: [
    { value: '9', label: 'Versions of One Shot' },
    { value: '2', label: 'Pipelines Compared' },
    { value: 'Local', label: 'Runs on One 4090' },
  ],
  hero: { type: 'video', src: V + 'wan-v9.mp4', poster: I + 'wan-v9-poster.jpg' },
  body: [
    { type: 'p', text: "An R&D test, not a finished film. Cookie Heist is a short I'm making about two rival toys who team up to steal one cookie off a kitchen counter at night: Sarge, a stiff wooden nutcracker, and Rex, a floppy plush dinosaur. Before making the whole thing, I wanted to know which pipeline can hold stylized characters on-model with camera and blocking I control." },
    { type: 'p', text: 'So I made the same shot two ways: Seedance 2.5 (hosted) and Wan 2.2 with VACE in ComfyUI on my own 4090, guided by a depth pass from my previz. This page is shot 1 and what it took to get there.' },
    { type: 'h', text: 'Same Shot, Two Pipelines' },
    { type: 'video', src: V + 'seedance-vs-wan.mp4', caption: 'Shot 1: Sarge marches up to the counter and looks up at the cookie jar. Seedance on the left, Wan 2.2 + VACE v9 on the right.' },
    { type: 'h', text: 'The Pipeline' },
    { type: 'p', text: 'Every shot starts as a previz: a grey box kitchen, the camera move and a stand-in for Sarge. A depth pass from that previz goes into VACE, so the generated shot keeps my set layout and camera instead of inventing its own. The prompt handles the look: toy materials, the warm LED strip under the cabinets, the night.' },
    { type: 'video', src: V + 'pipeline.mp4', caption: 'Previz, depth pass, final. The depth pass is what VACE follows.' },
    { type: 'specs', items: [
      { label: 'Model', value: 'Wan 2.2 T2V A14B (high and low noise experts, fp8) with the Wan 2.2 Fun VACE modules' },
      { label: 'Speed-up', value: 'lightx2v step-distill LoRA (2.0 on high, 1.0 on low), 8 steps split 4 and 4, CFG 1' },
      { label: 'Guide', value: 'Depth pass from the previz, VACE strength 0.75, released at 70% of the steps' },
      { label: 'Output', value: '848 x 480, 16 fps, about 6 seconds. A 53-frame test took about 7 minutes on the 4090' },
      { label: 'Previz', value: 'Night Shift for blocking and camera, then a Python script that rebuilds the scene in Blender with a custom stand-in and renders depth' },
    ]},
    { type: 'h', text: 'Nine Versions' },
    { type: 'p', text: 'The first try looked nothing like a kitchen. Each version changed one or two things, and I kept a side-by-side of every run against Seedance.' },
    { type: 'image', src: I + 'versions-1-3.jpg', alt: 'Four panels: Seedance, Wan v1 with striped cabinets and a warped floor, v2 with the set fixed, v3 with the hat and light fixed', caption: 'v1 to v3. At full depth strength, the depth bands turned into stripes painted on the cabinets and the floor tiles warped. Easing VACE to 0.75 and letting go at 70% of the steps fixed the set, then the prompt fixed the floor, the hat and the light.' },
    { type: 'pillars', items: [
      { title: 'v4 to v5: Let Him Turn', text: 'The grey box stand-in never turns, so with depth held to the end, neither did Sarge. Releasing the depth earlier let him turn toward the jar. A new previz with a nose and a lean came next.' },
      { title: 'v6: My Own Stand-In', text: 'The previz tool only has a fixed cone-and-ball stand-in, so I wrote a script that rebuilds the shot in Blender with a box body, hat, nose and legs, and renders depth from that. I also trimmed the first frames, where the reference image ghosted in.' },
      { title: 'v7 to v8: Stay Stiff', text: 'Asking for a three-quarter turn and a lean made his legs buckle into sticks. A nutcracker never bends, so the v8 prompt turns him 45 degrees, tips only his head back, and says no bending at the knees or waist.' },
      { title: 'v9: Make It 2 a.m.', text: 'The kitchen still looked like a lit room. Putting night into the prompt and daylight, ceiling lamps and lit walls into the negatives finally made it dark, with the LED strip as the only light.' },
    ]},
    { type: 'image-row', cols: 1, items: [
      { src: I + 'v6-row.jpg', alt: 'Seedance, Wan v5 with the pawn previz, Wan v6 with the Blender stand-in', caption: 'v5 to v6: the Blender stand-in' },
      { src: I + 'v8-row.jpg', alt: 'Seedance, Wan v7 with buckled legs, Wan v8 standing rigid', caption: 'v7 to v8: stiff again' },
    ]},
    { type: 'video', src: V + 'v8-vs-v9.mp4', caption: 'v8 against v9: night in the prompt.' },
    { type: 'h', text: 'What Seedance Did' },
    { type: 'p', text: 'Seedance gave the best mood on the first try, and it handled Rex and the second scene too. For a hosted model it is a strong baseline, and the bar the local pipeline has to clear.' },
    { type: 'video-grid', items: [
      { src: V + 'seedance-scene1.mp4', label: 'Seedance, scene 1', caption: 'Sarge marches in and looks up at the jar.' },
      { src: V + 'seedance-scene2.mp4', label: 'Seedance, scene 2', caption: 'Rex flops out from under the table.' },
    ]},
    { type: 'h', text: 'Where It Stands' },
    { type: 'takeaways', items: [
      { num: '01', title: 'Seedance for Mood, Wan for Control', text: 'Seedance looked right sooner. Wan took nine versions, but every fix was a setting or a stand-in I own: the layout and camera come from my previz, and it runs locally with no per-clip cost.' },
      { num: '02', title: 'The Stand-In Matters', text: 'VACE follows the depth pass closely, so the stand-in has to move the way the character should. Building my own in Blender fixed more than any prompt change.' },
      { num: '03', title: 'Next', text: 'The remaining shots: the spoon catapult and the two-character payoff, where Sarge lands on Rex. Two toys touching is the hardest test for consistency, and the reason this pipeline exists.' },
    ]},
  ],
  links: [],
  accent: '#c2410c',
  icon: { glyph: '🍪', color: '#c2410c' },
};

# Joel Williams Portfolio: Build Brief (CLAUDE.md)

This file is the single source of truth for building Joel Williams' product-design portfolio website. Read it at the start of every session. All copy in the Content section is final and locked: place it verbatim, do not rewrite it.

---

## 1. Project overview

- **Who:** Joel Williams, Mechanical Engineering student at Georgia Tech (CS minor), graduating May 2027.
- **What:** A personal portfolio website showcasing product-design and hardware projects.
- **Goal / audience:** Land product design internships in consumer electronics (Apple-caliber reviewers). The site is itself a design artifact and will be judged as one. Aim for restraint, craft, and polish.
- **Hosting:** GitHub Pages, served from a repo named `joelwilliams.github.io` (or the user's actual username) at the root URL.
- **Tech stack:** Hand-coded static site. Plain HTML, CSS, and a small amount of vanilla JavaScript. No frameworks, no build step. Keep it simple and fast.
- **Tooling note:** Start in Plan mode and propose changes before writing files. Joel reviews diffs in VS Code, then commits and pushes via GitHub Desktop.

---

## 2. Repo conventions

Target file structure:

```
joelwilliams.github.io/
├── index.html              landing page
├── about.html              about + interests
├── contact.html            email + linkedin
├── projects/
│   ├── focus-puck.html
│   ├── tvc-mount.html
│   ├── fin-tabs.html
│   ├── me2110.html
│   └── race-couch.html
├── assets/
│   ├── css/styles.css       single shared stylesheet
│   ├── js/main.js           accordion, hover previews, entrances, scroll reveal
│   ├── images/              one subfolder per project + shared (headshot, favicon, og)
│   └── videos/              short looping clips, one subfolder per project
├── resume.pdf
├── CLAUDE.md
└── README.md
```

- One shared `styles.css` and one `main.js` across all pages for consistency.
- Use semantic HTML and accessible markup (alt text on all images, buttons for interactive controls, aria attributes on the accordion).
- Keep every page on the same nav and footer.
- The stylesheet link on every page carries a cache-busting query (`styles.css?v=N`, currently `v=14`). Bump N whenever `styles.css` or `main.js` changes so browsers do not serve a stale copy.

---

## 3. Writing and voice rules (apply everywhere)

- **No em dashes. Ever.** This is a hard rule. Use commas, periods, parentheses, or colons. For date ranges use "to" or an en dash, never an em dash. For metadata separators use a middot ( · ) or a slash, never an em dash.
- **Keep it skimmable.** Short paragraphs, breathing room, image-forward. Project pages must never read like a dense paper or a wall of text. Break prose into short chunks with images between them so a recruiter skims the story in fifteen seconds and only digs deeper if they want to.
- **Voice is first-person and story-led.** The copy is already written this way and locked. Do not paraphrase or "improve" it.
- The site has more content than Joel's PDF portfolio, but should keep that same clean, simple feel.

---

## 4. Visual design system ("midnight" theme)

Dark mode only. This is a dark site by design, not a theme toggle.

### Color tokens
- `--bg` page background: `#0A0C15`
- `--bg-frame` deeper background (nav bar top, footer accents): `#07090F`
- `--surface` tiles, thumbnails, image placeholders, headshot block: `#131826`
- `--text` primary near-white type: `#EDF1F8`
- `--text-secondary` body and tagline text: `#9aa3ba`
- `--text-muted` secondary metadata: `#818aa0`
- `--text-faint` faint labels, captions, footer: `#5a6175`
- `--accent` blue accent (rules, active states, category labels): `#4D85FF`
- `--link` slightly brighter blue for links and arrows: `#5B92FF`
- `--pill-text` skill pill text: `#c3cad9`
- Hairline borders: `rgba(255,255,255,0.07)` to `rgba(255,255,255,0.14)`, drawn at 0.5px.

### Typography
- **Sans** for the name, headings, and body: Helvetica Neue, Arial, system sans-serif. Big type (name) at weight 500 with tight letter-spacing (about -0.02em). Section headers can be the same sans.
- **Monospace, lowercase** for metadata, labels, captions, nav links, and date ranges: section labels like `skills highlight`, `selected work`, `experience`, the hero eyebrow, project category tags, and figure captions. Keep these lowercase and small (11 to 12px).
- The name in the hero runs large (about 48px). One-line outcomes and taglines sit in `--text-secondary`.

### Shape and spacing
- Generous whitespace. Let the layout breathe.
- Hairline borders (0.5px) for separators and tile outlines, not heavy lines.
- Border radius: tiles and image blocks about 4px, headshot and pills about 8px, outer cards about 12px.
- No drop shadows, no gradients, no glow. Flat and precise.

### Media: images and video (the most important execution detail)

The design is roughly 70% imagery. It looks gorgeous with great visuals and amateur with weak ones. Until real assets are ready, use clean `--surface` colored blocks as placeholders (no "image coming soon" text). Real project images and short looping videos are now in place across the site, batch-resized and compressed; raw exports are kept out of the deploy in a gitignored `_raw/` folder.

**Folder convention**
- Images live in `assets/images/<project>/`, one subfolder per project, plus shared items (headshot, favicon, og image) at the `assets/images/` top level.
- Videos live in `assets/videos/<project>/`, one subfolder per project.
- Name files clearly and predictably, for example `focus-puck-hero.jpg`, `focus-puck-exploded.png`, `focus-puck-loop.mp4`.

**Images**
- Web-size them to about 1600 to 2000px on the long edge.
- Use WebP or optimized JPG. PNG only when transparency is needed.
- Compression can be automated. Claude Code can run an optimizer locally (ImageMagick, or `sharp` via Node) to batch-resize and compress a whole folder, so raw exports can be dropped in and processed in place rather than hand-tuned.

**Video (short looping clips on project pages)**
- Looping is an HTML attribute, never something baked into the file. Use a video element with `loop`, `muted`, `autoplay`, and `playsinline`. Autoplay only works when the clip is muted, so these are silent ambient clips by design. If sound is ever wanted, drop `autoplay` and let the user press play.
- Always set a `poster` image (a still frame) so the page never looks broken while the clip loads.
- Format and weight: MP4 (H.264), kept short (a few seconds, looped), and compressed hard. Video is heavy and a large file will stall mobile. A handful of small looping clips is fine; long raw 4K is not.
- Conversion and compression can be automated. Claude Code can run `ffmpeg` locally (it can install it if needed) to convert .MOV to web MP4, trim to length, compress, and auto-generate the poster still. Manual tools like HandBrake or Squoosh are an optional alternative, not a requirement.
- Example intent to hand Claude Code: "make the Focus Puck hero a looping muted video, `focus-puck-loop.mp4`, with `focus-puck-hero.jpg` as the poster."

Provide all of these by placing the files in the repo folders on disk, then telling Claude Code where they are. They are read from disk, not uploaded through chat.

### Responsive behavior
- Hero is two columns on desktop (text left, headshot + links right) and stacks to one column on mobile (headshot below the name).
- The selected-work grid is a featured tile plus a three-up row on desktop and reflows to single column on mobile.
- The skills stripe wraps naturally.

### Motion and interaction
Motion is subtle, in the site's flat and precise spirit, and every effect is layered through `main.js` and CSS and gated behind `prefers-reduced-motion`. Content is only ever hidden or blurred by JS, so a visitor without JavaScript (or with reduced motion on) always sees the full, static page.
- **Entrances:** the home hero (eyebrow, name, accent rule, tagline, headshot) and the skills pills fade and rise in a short staggered sequence on load. The about and contact pages reuse the same staggered entrance.
- **Tile hover previews:** hovering a work tile blurs and dims the image behind a dark wash while a short teaser rises into the frame, and the tile border brightens. Gated to hover-capable devices so it never sticks on touchscreens.
- **Home "peek" and reveal:** on load, everything below the skills stripe (selected work, just for fun, experience) sits blurred, dimmed, and non-interactive. A fixed `view work` button fades in after the hero settles; the first scroll, or a click of that button (which glides down with a slow eased scroll), clears the peek and reveals each section as it enters view.
- **Project pages:** each content block fades and rises as it scrolls into view.

### Accessibility
- Maintain strong contrast (the tokens above are tuned for it).
- All images get meaningful alt text.
- The experience accordion uses real `<button>` elements with `aria-expanded`, keyboard operable.
- The `view work` cue is a real `<button>`; all motion respects `prefers-reduced-motion`.

---

## 5. Components and layout

### Nav (every page)
- Left: `JW` monogram, weight 500, slightly tracked.
- Right: monospace lowercase links: `work`, `about`, `résumé`, `contact`.
  - `work` to `index.html#work`, `about` to `about.html`, `résumé` to `resume.pdf`, `contact` to `contact.html`.
- The current page's link sits in `--link`; the rest in `--text-secondary` and brighten on hover.
- Hairline border under the nav.

### Hero (landing)
- Eyebrow, monospace lowercase: `mech-eng / georgia tech · atlanta, ga`
- Name, large sans: `Joel Williams`
- A short accent rule under the name (about 46px wide, 3px tall, `--accent`).
- Tagline in `--text-secondary` (see Content).
- Right column: a headshot block (square, about 220px, `--surface`, hairline border, rounded 8px, holding Joel's photo), then two stacked monospace links beneath it: `linkedin ↗` and `résumé ↓`, both in `--link`.
- On load, the eyebrow, name, accent rule, tagline, and headshot column fade and rise in a short staggered sequence (see Motion and interaction).

### Skills highlight stripe
- A band with a hairline top and bottom border.
- Small monospace label `skills highlight`, then the skill pills.
- Pills: monospace, `--pill-text`, hairline border, rounded 8px, small padding. They wrap as needed.
- On load, the pills cascade in one after another as part of the home entrance.

### Interests stripe (about page)
- Styled identically to the skills highlight stripe, reusing the same classes: same hairline band, same monospace lowercase label, same bordered pills, same spacing.
- Label `interests`, then the interest pills.

### Résumé download button (about and contact pages)
- A single bordered button: monospace lowercase label `download résumé ↓`, hairline border, rounded like a pill, `--text-secondary` text. The border shifts to `--accent` and the text brightens on hover.
- An `<a href="resume.pdf" download>` so it downloads rather than opening in the browser.

### Selected work
- Small monospace section label `selected work`.
- A featured tile (Focus Puck) as a two-column card: a tall image panel on the left, and on the right a stacked caption (monospace category tag in `--accent`, project name, one-line outcome).
- Below it, a three-up grid of the other tiles (TVC Mount, Fin Tabs Rocket, Competition Task Robot): each an image area, then a caption with the project name and category tag on one row and the one-line outcome spanning the full width below.
- Tiles have a hairline border that shifts to `--accent` on hover. On hover the image blurs and dims behind a dark wash while a short teaser rises into the frame (see Motion and interaction).
- Per-tile image fit varies: photos fill the tile (cover), transparent CAD renders are shown whole on a white panel.
- Each tile links to its project page. On the home page, the selected-work grid, the just-for-fun tile, and the experience section start in the blurred, dimmed, non-interactive "peek" state and only become clickable once revealed.

### Just for fun
- Small monospace label `just for fun`.
- A single, lighter horizontal tile for Race Couch (image on the left, text on the right) so it reads as a deliberate personality aside, not a flagship. Links to its project page.

### Experience accordions
- Small monospace label `experience`.
- Each role is a row: a clickable button showing the org and role (sans) on the left, the date range (monospace) on the right, and a chevron (`ti-chevron-down` style) that rotates 180 degrees when open.
- Collapsed by default. Clicking expands a bulleted list of that role's detail.
- Rows are separated by hairline borders. Use `aria-expanded` and toggle via `main.js`.
- Order is fixed: Blue Origin, Valero, Invention Studio, HyTech Racing, Ramblin' Rocket Club (GNC), Kennesaw State.

### Footer (every page)
- Hairline top border.
- Left: `© 2026 joel williams` (monospace, `--text-faint`).
- Right: monospace `--link` links: `email` (mailto:jwilliams812@gatech.edu) and `linkedin`.

### Project page template
Every project page follows the same skeleton:
1. Nav.
2. Title (sans), one-line outcome (secondary), metadata line (monospace: discipline · context · timeline · role), and a `core skills` line.
3. A hero image, rendered at its natural aspect ratio (not cropped into a fixed band).
4. **The story** section first (the why and the objectives).
5. Body sections that flex per project, with media between them. Prose sits in a centered, comfortable-measure reading column while figures break out wider; figures can be a single image, a two-up row, a constrained portrait, or a short looping muted video with a poster.
6. Footer.

Keep each section short and image-flanked. Do not let prose stack into a wall. Each block fades and rises as it scrolls into view.

---

## 6. Site structure

**index.html**, in order: nav, hero, skills highlight stripe, selected work (featured + grid), just for fun (Race Couch), experience accordions, footer.

**about.html:** nav, the about copy, a résumé download button, then an interests stripe (mirroring the skills highlight stripe), footer.

**contact.html:** nav, a contact block holding only email and LinkedIn (no GitHub), plus a résumé download button, footer.

**projects/*.html:** the five project pages, each using the template above.

**resume.pdf:** Joel's resume, linked from the nav, the hero, and the résumé download button on the about and contact pages.

Contact details: email jwilliams812@gatech.edu, location Atlanta, GA, LinkedIn at the live URL. Do not include a GitHub link, and do not publish a phone number.

---

## 7. Content (final and locked, place verbatim)

### 7.1 Hero tagline
> I design, prototype, and machine considered hardware, from the desk to orbit.

### 7.2 About (two paragraphs)
> I'm a mechanical engineering student at Georgia Tech with a product designer's instincts and a maker's hands, happiest taking a physical product through the full arc from idea to a finished object I can hold. I'm also pursuing a computer science minor focused on devices, because the work that pulls me in lives where hardware and software meet: products that are mechanically considered and intelligently controlled. Whether I'm running an FEA study, machining a part, or writing the firmware that brings it to life, I like owning the whole path to something real.
>
> Outside the workshop, I'm usually chasing something creative or competitive. I like to shoot and edit my own video content, photograph interesting scenes from my travels, and pick up the guitar when I want to slow down. The rest of my time goes to the gym or the basketball court. It's a random mix, but it feeds the same instincts I bring to my work: an eye for craft, the patience to practice something until it clicks, and a love of getting better at hard things.

### 7.3 Skills highlight stripe
SolidWorks · CREO · CATIA · Windchill · ANSYS · FMEA · GD&T · DFMA · Machining · Fusion (CAM) · Rapid prototyping · C++ · Python

### 7.3.1 Interests stripe (about page)
Photography · Video editing · Weightlifting · Basketball · Guitar

### 7.4 Project tile one-liners (landing)
- **Focus Puck:** A focus timer for my desk, designed and built end to end over a winter break.
- **TVC Mount:** A ground-up thrust-vector-control-mount design that gave a finless rocket ±20° of steering.
- **Fin Tabs Rocket:** Responsible engineer on a full-scale, fin-tab-guided rocket.
- **Competition Task Robot:** A scrappy $47 competition robot that climbed to the top 16 of 56 teams.
- **Race Couch:** A drivable couch steered by a game controller, the kind of fun, random project that sparks people's joy for engineering.

Note: the tile titled "Competition Task Robot" is the ME 2110 project (file `projects/me2110.html`); the course context stays in the page metadata line.

Category tags (monospace, `--accent`, shown on each tile): Focus Puck `product design`, TVC Mount `aerospace structures`, Fin Tabs Rocket `systems integration`, Competition Task Robot `mechatronics`, Race Couch `just for fun`.

### 7.4.1 Tile hover teasers (landing)
Short teaser that rises into each tile on hover:
- **Focus Puck:** One tap wakes it, two starts the timer, and a ring of light counts you down. Built end to end over a winter break.
- **TVC Mount:** A ball-and-socket gimbal that unlocked ±20° of control authority inside a 3-inch body tube, flown across three launches.
- **Fin Tabs Rocket:** Responsible engineer owning the master CAD, the build plan, and the integration of a full-scale, fin-tab-controlled rocket.
- **Competition Task Robot:** A $47 robot built fast and iterated faster: last place in sprint one, top 16 of 56 by finals.
- **Race Couch:** A couch you steer like a tank with a PS4 controller. The gloriously goofy project that made me want more.

### 7.5 Experience accordions

**Blue Origin, Manufacturing Engineering Intern (2026 to now)**
> NOTE: Blue Origin lunar-lander and Artemis work is likely under NDA and possibly export control. Joel must confirm with his manager that these specifics are cleared before this goes live. If not cleared, soften to "designing and validating flight test hardware for a next-generation lunar lander program" and drop the program names.
- Designing test hardware for the reaction control system of the next-generation lunar lander (Artemis 3 and 4 missions), modeled in CREO and managed in Windchill.
- Ran FEA on the hardware I designed to verify its load cases and the structural integrity of the fully integrated system, identifying weak points and where reinforcement was needed.
- Procured COTS hardware and issued the work orders to get my test hardware assembled.

**Valero, Reliability Engineering Intern (2025)**
- Built operating cost (OC) models for steam turbines and presented conversion cases to reduce OC by 85%.
- Conducted FMEA on a bad-actor pump; implemented structural fixes raising MTBR over 340% versus the previous baseline.
- Led access-structure upgrades (catwalk, platform, and walkway installs), improving mechanic safety and decreasing maintenance route times by 50%.

**Invention Studio, Prototyping Instructor (2023 to now)**
- Instruct 30+ general users per week on manufacturing methods, DFM practices, and safe equipment use.
- Coach prospective prototyping instructors in safe machine operation, SOPs, and teaching methods, achieving a ~90% pass rate for those trained and tested.
- Operate Tormach and EMCO CNCs to produce precision prototype parts; use Autodesk Fusion to create CAM toolpaths, select tooling, and tune feeds and speeds.

**HyTech Racing, Powertrain Design Engineer (2026 to now)**
- Assembled and integrated planetary gearboxes into the vehicle, verifying interference fits.
- Designed 3D-printed motor cooling jackets and ran flow tests for heat-transfer performance.
- Built 3D-printed motor test stands and designed test parts in CATIA V6.

**Ramblin' Rocket Club, GNC Structures Subteam (2024 to now)**
- Designed, manufactured, and integrated a camera mount for a jet-vane thrust-vector-controlled rocket.
- Iterated economical structural improvements to TVC mounts across two gimbaled rockets.
- Used FDM and SLA printing to rapidly prototype and test mount components.

**Kennesaw State, Research Assistant (2022 to 23)**
- Synthesized conductive polymer nanomaterials to develop more efficient and cost-effective supercapacitors.
- Evaluated the capacitance and cycling stability of synthesized nanomaterials with CV and GCD testing.
- Used SEM and XRD to analyze nanomaterial morphology and composition, guiding purity optimization.

---

### 7.6 Project page: Focus Puck

**Title:** Focus Puck
**One-line outcome:** A focus timer for the desk, engineered for modularity, simple assembly, and intuitive interaction.
**Metadata:** Product design · Dec 2025 to Jan 2026 · personal project
**core skills:** SolidWorks · ANSYS FEA · DFAM · Rapid prototyping · 3D printing (Formlabs Form 4 + Bambu X1E) · Mechanical packaging for electronics

**The story**

The idea hit me at the end of finals week in December 2025. After two and a half years of college, I wanted one project that was entirely my own, not tied to a club, a class, or a team, where I owned every decision from end to end and poured everything I had been accumulating into something of my own design. Winter break was the window, and I gave myself a single rule: take a product from a thought in my head to a finished, working object before the next semester started, at my own pace and to my own standard.

So I claimed my Invention Studio privileges and a lot of late nights in the makerspace, and built Focus Puck, a single-purpose desk timer for focused work. One object, one job, designed to be something I would actually want to reach for.

The objectives I set myself: a compact, desk-friendly timer built for flexible iteration and intuitive assembly; a purpose-built enclosure that packaged the Arduino, sensors, and perfboard with defined mounting and clean cable routing; and DFAM features throughout so I could print and iterate fast.

**How it feels to use**

A focus timer only works if reaching for it never becomes its own distraction, so the whole interaction lives in one spot. Engraved into the center cap, directly in line with a capacitive touch sensor underneath, is a fingerprint pattern. You don't need instructions to know that is where you touch it.

A single tap wakes the device, and the LED ring glows a soft, solid white. To set your time, you tap and hold the center: the ring fills as you hold, each light adding two minutes, until you let go. Then a double tap starts the countdown, and the ring slowly empties as the minutes tick down. When time is up, it flashes three times to let you know. Fifteen seconds of stillness later, the light fades out and the puck waits, quiet, for the next touch.

One point of contact, three simple gestures, and a ring of light that tells you everything. No screen, no menus, nothing to pull you out of the work you sat down to do.

**Designing around the electronics**

The hard part of a device this small isn't the shell, it's everything inside it. I designed the internals as a modular stack of trays so the electronics stayed rigid and, just as importantly, stayed serviceable.

A bottom tray carries the perfboard and screw terminals, the layer where accessories connect, fully isolated from the board above. A top tray interlocks with it and holds the Arduino Nano on headers, so the brain of the device lifts out in seconds if it ever needs work. The pair locates on four bosses in the base of the shell. Above the electronics sits the lighting: an LED ring pressed into its own tray, with a diffuser that drops onto a ledge and twist-locks down on dovetail joints, no fasteners, just a quarter turn. That tray seats into the top of the shell on four notches and holds by a tuned interference fit.

The fasteners themselves are hidden. Heat-set inserts and a few screws tie the stack to the shell, and on the underside the screw entries disappear under counterbored rubber feet that sit perfectly flush. From the outside it reads as one clean object; open it up and every part has a reason and a way out.

**Designing for the printer, not against it**

Rather than design a part and then wrestle it onto the bed, I let the manufacturing method shape the geometry from the start. DFAM features cut support material, improved print reliability, and simplified assembly, so every iteration came off cleaner and went together faster. I split the work across two machines on purpose: the Bambu X1E for fast, cheap iteration, and the Formlabs Form 4 where surface finish and final fit mattered.

**Proving it out**

I ran ANSYS FEA on the shell for stiffness and the load cases that mattered, then backed it with physical drop tests, since a desk object gets knocked around and I wanted its failure modes to be ones I had chosen. The most useful thing the drop tests taught me wasn't structural, though; it was cosmetic. A fall the part shrugged off mechanically could still scuff the finish, and a product that looks beat-up after one tumble doesn't feel premium. That reframed how I think about material and finish for the next version, the way brushed aluminum, for instance, hides the small scratches a smooth gloss would show.

**Outcome**

A modular, DFAM-optimized enclosure that's quick to iterate and quick to service; a repeatable manufacturing workflow (X1E for speed, Form 4 for final-fit aesthetics, with post-processing to reach the finish I wanted); and a device that assembles, start to finish, in under two minutes.

**What's next**

If I take it further: add a buzzer so the timer has a voice and not just a light; add a battery tray to cut the cord and make it truly wireless; and, the part I'm most interested in, redesign it for mass manufacturing instead of rapid prototyping. That means designing in draft angles, ribs, uniform wall thickness, parting lines, and ejection: building the same product for an injection-molding tool instead of a print bed.

---

### 7.7 Project page: TVC Mount

**Title:** TVC Mount
**One-line outcome:** A from-scratch thrust-vectoring mount that took a finless rocket from a few degrees of steering to a full ±20° in any direction.
**Metadata:** Mechatronics & structures · Ramblin' Rocket Club (GNC) · Aug 2024 to Mar 2025
**core skills:** SolidWorks · Mechatronics integration · Rapid prototyping · 3D printing · FMEA · Design communication

**The story**

A finless rocket has a problem: nothing passive keeps it pointed where you want it. Stability has to be active, which means steering the engine itself. The thrust-vector-control mount is the part that does that, gimbaling the motor to push the rocket back on course in flight.

I joined the GNC project in August 2024 alongside the teammate I would build this with. We were handed the previous year's mount and given a choice: revise and improve it, or start over from the ground up. The old mount had essentially been pulled from a published design and printed, so improving it meant inheriting someone else's decisions. We chose to start fresh. It was the harder path, but it gave us full control of the design from end to end, which was exactly what I wanted out of it.

The target was steep. The previous mount could only manage a few degrees of deflection (about ±2.9° in yaw and ±4.6° in pitch), boxed in by its linkage geometry and the diameter of the 3-inch body tube. Our goal was ±20° in any direction inside that same airframe, built mostly from 3D-printed and off-the-shelf parts. I treated it like a product development cycle: understand the requirements, study what exists, design and review, refine, prototype, test, integrate.

**What it had to do**

Before drawing anything, we pinned the constraints: about ±20° of uncoupled pitch and yaw, full 360-degree actuation, a fit inside the 3-inch tube, minimal mechanical play in the joints, and a build that leaned on 3D printing and COTS hardware so we could iterate quickly and affordably. It also had to survive the loads of static fires and live launches while staying serviceable between tests.

**Studying what came before**

Rather than start blind, we dug into the prior year's rockets, Gru and Vector, to pin down what was capping their range. The traditional gimbal, with separate rings for pitch and yaw, simply could not open up far inside the tight body tube, so iterating it would never reach ±20°. We went looking for a fundamentally different joint. Our research surfaced a promising ball-and-socket articulation, and we set about engineering our own version of it, sized to our airframe and our constraints. We later documented the full redesign in a paper submitted to the AIAA.

**The design**

We replaced the old gimbal with a central ball-and-socket joint that lets the motor pivot around a fixed top plate. Each servo drives one axis through a linkage: a rotational joint at the servo horn, a COTS linkage rod, and a side ball-socket joint, with the two side joints letting pitch and yaw move independently instead of fighting each other. That uncoupling is where much of the new range came from.

The preliminary design review changed an early decision. We had first laid the servos flat in the top plate, but for our components and layout that orientation made installation, access, and assembly difficult. Moving to smaller micro servos let us stand them vertically, in line with the pitch and yaw axes, which fit the cramped tube better and made the whole assembly far easier to build and service. It was a clean case of designing for assembly, not just for function.

**Materials and prototyping**

I split materials by job. The structural pieces that take heat and load (the top plate, motor sleeve, and linkage adapter) were FDM-printed in PETG. The ball-and-socket joint was printed on a Formlabs Form 4 in resin, because the smooth, fine-layer finish was what let the ball glide with low friction. The servos, linkage rods, and fasteners were off-the-shelf, chosen to fit both the envelope and the loads.

**Testing and integration**

We validated the mount across static fires and launches, and the first test flight taught us the most. The part of the top plate holding the servos turned out to be a weak point, so we increased the contact surface there and used slicer modifiers to locally thicken the walls and infill exactly where stress concentrated, plus added material where the ball joint threaded in. No full redesign, just targeted reinforcement where the hardware told us it was needed. Testing also settled our material choice the hard way: an early PLA top plate warped from the heat of the servos, which is why the structural parts moved to PETG and its higher heat tolerance.

**Outcome**

The mount reached ±20° of motion in any direction, a large jump from the previous design's few degrees, and held up across the rocket's static fires and three launches. Each round of testing tightened the assembly and cut play in the joint. The redesign became the second flown iteration of the GNC project's TVC system and the basis for our AIAA report.

**What I'd refine next**

Assembly was the design's real weak spot. Dialing in the central ball-and-socket fit took many reprints, and the off-the-shelf linkage rods had to be hand-sanded to matched lengths so the pitch and yaw axes stayed independent. So the honest list for a next version: reduce the play in the joint when the servos are loaded, streamline that assembly, and make the structure more inherently stable rather than reinforced after the fact.

---

### 7.8 Project page: Fin Tabs Rocket

**Title:** Fin Tabs Rocket
**One-line outcome:** Owning the integration and assembly of a full-scale, fin-tab-steered rocket: the manufacturing plan, the schedule, and the master CAD that kept every subteam in sync.
**Metadata:** Systems integration & project management · Ramblin' Rocket Club (GNC) · Aug 2025 to Mar 2026 · responsible engineer
**core skills:** Systems integration · SolidWorks · FEA (ANSYS) · Project management · GD&T · Rapid prototyping

**The story**

After a year of heavy, hands-on design on the TVC mount, I got the opportunity to own a larger project from the management side. On the Fin Tabs rocket I took the Responsible Engineer role, trading detailed part design for ownership of how the whole vehicle came together.

The rocket is a full-scale vehicle, close to 60 pounds, that achieves active thrust-vector-control through fin tabs (small control surfaces near the aft fins) and returns safely on a dual-deployment recovery system. My job wasn't to design every subsystem. It was to make all of them integrate into one buildable, serviceable rocket.

**My scope: integration and assembly**

I owned how the vehicle went together, not the design of every part in it. The bar was concrete: all the subsystems (nosecone, recovery, avionics, camera bay, motor, and the fin tabs assembly) had to integrate into a single rocket within a few hours, and nothing could physically or functionally interfere with the fin-tab actuation. Holding that standard was the job.

**The master assembly**

To keep everyone honest, I pulled the subsystems into a single, top-down SolidWorks assembly. That master model became the reference every subteam checked their fit against, and applying GD&T to the interfaces is what let parts come together first-pass instead of after a round of rework.

**Coordinating across subteams**

A lot of the role was coordination across the subteams. I gathered each one's CAD assembly updates, consolidated them into the master model, and reported the integrated picture back to the system leads. The hard part was dependency. I needed the avionics bay in CAD to run mass and center-of-gravity analysis on the full rocket, but avionics couldn't finalize their bay until electronics locked the dimensions of the custom PCBs. That chain created a real bottleneck, and a lot of the role was managing around it, keeping the rest of the integration moving while one piece was blocked.

**Planning and supporting the build**

I planned the manufacturing timeline and kept parts machinable and cost-effective, supporting the build with waterjetting and 3D printing. I also leaned on my Invention Studio instructor access to help get components made. One concrete win was on the radial screws securing the nosecone and actuation mechanism to the body tube. Laying out a hole diagram and matching holes around a circular body tube is tedious work, and every added hole makes it worse, so fewer is always better. Applying DFAM, I confirmed six screws carried the load where the design originally called for eight. Two fewer holes meant a simpler hole diagram, a faster build, and no loss of margin.

**Owning the recovery analysis**

Recovery is where a rocket gets hurt, so I ran those numbers myself. I calculated the snatch forces on the bulkhead U-bolts for the transition from apogee into recovery, and the pin and bolt shear for the radial screws, sizing to a factor of safety of 3.

**The Critical Design Review**

I built and presented the CDR to the GNC leads, splitting the presentation with my teammate. It was the last major milestone before the year wrapped, and it's where the design has to stand up to scrutiny out loud and you defend the decisions you made.

**Where it stands**

The CDR is complete and component manufacturing is underway. Full integration and assembly, the part I own, is slated for early Fall 2026, when the subsystems come together into the vehicle for the first time. I'll update this with launch results once it flies.

---

### 7.9 Project page: Competition Task Robot (ME 2110)

**Title:** Competition Task Robot
**One-line outcome:** A scrappy, $47 autonomous robot for a Minecraft-themed arena, built fast and iterated faster, that climbed from a last-place sprint finish to the top 16 of 56 teams.
**Metadata:** Robotics & mechatronics · ME 2110, Georgia Tech · Feb to May 2025 · 4-person team
**core skills:** SolidWorks · Mechatronics · Rapid prototyping · 3D printing · Laser cutting · Embedded systems

**The story**

ME 2110 is Georgia Tech's design-build-compete course: one semester to take an autonomous machine from nothing to a competition floor, with graded sprints along the way that force you to show working hardware long before you feel ready. There is no time to perfect anything, so the only way to do well is to move fast and stay scrappy. Build the simplest thing that could plausibly work, put it in front of the task, learn what breaks, and iterate. That mindset is the whole story of this project.

The competition was Minecraft-themed, so the tasks were video-game actions translated into hardware. In a single 40-second autonomous run, each robot had to clear hostile "mobs" (the game's enemy creatures, here represented by blocks) out of its home zone, feed a bone to "tame a wolf" at the center of the arena, mine ore blocks, and dislodge an "End Crystal" and place it atop an obsidian tower. Every task was worth points, and the highest-value ones (the wolf and the crystal) were also the hardest to pull off reliably. All of it had to fit a 12 by 24 by 18 inch envelope, cost under $120, and run on nothing more than a provided mechatronics kit, gravity, five mousetraps, and five rubber bands.

Our four-person team built a robot we called Hypixel. I led the mob-knocker arm and the End Crystal lift, owning both from concept through CAD, fabrication, and testing, and I also handled a good share of the documentation (the alternative-designs study, the house of quality, the runtime flowchart) and delivered our studio design review.

**Structure first, so we could move fast later**

We resisted the urge to start gluing parts. We translated the competition into customer needs and engineering requirements, built a function tree, and generated a wide spread of concepts for every task: spring hammers, slingshots, and motor arms for the mobs, gravity slides and pneumatic pistons for delivery, and IR, ultrasonic, or camera options for sensing. Then we scored four full-robot concepts in weighted decision matrices and let the numbers choose, which landed us on a mobile, drivetrain-based design. The structure up front gave the fast iteration later a direction to run in.

**Scrappy by design**

The whole robot came in at $46.60, roughly 61% under the cap, built from laser-cut MDF, 3D-printed PLA and TPU, a length of lumber, hinges, and rubber bands. A single motor drove the rear wheels through a 3:5 gear ratio, trading speed for the torque needed to haul the subsystems around. My mob-knocker arms rode on 3D-printed pivots, held back in tension by rubber bands against a piston-pinned stopper. When the piston fired, the stopper shot clear and the arms snapped out and unfolded at a hinge with enough force to eject the mobs. My End Crystal lift was a motor-driven arm carrying a solenoid-pin claw that clamped the crystal and raised it about thirty inches, just above the tower. Every choice favored the simplest mechanism that did the job, which is exactly what a tight budget and a ticking clock reward.

**Test, fail, iterate**

We split testing into subsystem tests off the track and full-system runs on it, where most of the trouble lived in the timing of the autonomous code. The competition made the payoff of iterating impossible to miss. In the first sprint we scored a single point and finished last in our group of six. Building a drivetrain that actually worked had eaten most of our time, and since every subsystem rode on that mobile base, nothing else could function until it did. We tore into the problems, and one fix was almost comically simple: the robot kept getting hung up on a bump in the track, so we increased the wheel radius. We standardized our starting position for repeatability, and by the second sprint we had climbed to fourth, averaging over six points.

**Outcome**

By the final competition we reached the top 16 of 56 teams and placed 11th of 56 in the design review. Our rounds ran 14, 9, 27, and 30 points, and in the fifth the wolf bone jammed and we were eliminated, finishing with an 18.2-point average. The subsystem I owned outright, the mob-knocker arm, scored in every single round of the competition. The End Crystal lift was the honest counterpoint: it reliably dislodged the crystal for its points but never nailed the full placement on the tower, a casualty of running out of time to develop it. That tradeoff is the lesson of the whole class in miniature. You cannot perfect everything in a semester, so you make the most important things reliable and you ship.

---

### 7.10 Project page: Race Couch (just for fun)

**Title:** Race Couch
**One-line outcome:** A drivable couch, steered by a game controller.
**Metadata:** Just for fun · Wreck Racing, Georgia Tech · 2023

**(Tone note: this is the lighter, personality piece. Keep it loose and short, more personality than process.)**

This was my first taste of engineering outside a classroom, back in my early Georgia Tech days before I really knew what I was doing. The premise was as ridiculous as it sounds: a couch you could actually drive. I took on the controls, turning a game controller into a way to pilot a piece of furniture, and the fun lived in the handful of small design problems it took to get there.

The first question was what to even drive it with. We went back and forth between a Wii remote and nunchuck, a GameCube controller, and an old arcade-style joystick before landing on a PS4 controller. We also made a deliberate choice to go wireless. Nothing forced us to, but it was cooler and it freed the driver from being tethered to the couch, so we took on the added complexity on purpose.

With the PS4 controller chosen, its two thumbsticks opened up how to actually drive. The couch ran like a tank, with no steering wheel, just different amounts of power sent to the left and right wheels, so the core problem was mapping a stick's position to the right power split between the two sides. We could have crammed throttle and steering onto one stick, but it felt clumsy, so we used both: the left stick became pure throttle (how fast everything spun) and the right stick handled steering (how that power got divided side to side). That separation is what made the couch genuinely intuitive to drive.

Going wireless had one catch. The Arduino lived down in the frame underneath the couch, so the signal would cut out, and for testing we sometimes gave up and ran a wire straight to it.

I didn't have much formal engineering behind me yet, which was the whole point. It showed me how broad mechanical engineering really is and how many kinds of problems we get to solve, and learning that on something as gloriously dumb as a motorized couch is what made it stick. It is the project that made me want more.

---

## 8. Build order and definition of done

Suggested order:
1. Scaffold the repo and file structure.
2. Build `styles.css` with the design tokens and shared component styles.
3. Build `index.html` end to end (nav, hero, skills, work, just-for-fun, experience, footer) with placeholder image blocks.
4. Wire up the experience accordion in `main.js` (collapsed by default, click to toggle, chevron rotates, keyboard accessible).
5. Build the five project pages from the shared template, dropping in the locked copy.
6. Build `about.html` (about copy, résumé download button, interests stripe) and `contact.html` (email and LinkedIn, plus a résumé download button).
7. Confirm responsive behavior at mobile and desktop widths.
8. Swap placeholder blocks for real images as they arrive, then add favicon, link-preview (og) image, and per-page titles.

Definition of done for each page: matches the design system, uses the locked copy verbatim, reads skimmable (no walls of text), is responsive, and has alt text on every image. No em dashes anywhere in the output.

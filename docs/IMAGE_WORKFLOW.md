# Exhibit artwork

Starter images were created using the built-in image generator. They are
artistic interpretations, not archival photos or exact engineering drawings.

Prompts requested matching 4:3 black-ink museum engravings, white backgrounds,
restrained crosshatching, complete silhouettes, and no text or logos:

- The Illinois: a slender mile-high angular tower above a small Chicago skyline.
- Ford Nucleon: forward cab, long rear reactor deck and twin fins, three-quarter view.
- Project Orion: industrial nuclear-pulse spacecraft, shock absorbers and separate
  pusher plate, Earth below; no instructional weapon schematic.

Exports in `assets/exhibits/responsive-v2/` are grayscale JPEGs:
`*-standard-4x3.jpg` at 1200×900 and `*-master-2x1.jpg` at 1600×800.
Resizing and white padding preserve the supplied artwork's whole subject.

The website labels ARTISTIC RECONSTRUCTION. Alt text, metadata and source notes
carry the same qualification. Generated details are not historical evidence.
Compare identifying shapes with references, record visual interpretation,
validate both exports, and inspect OG/X landscape/X portrait before promotion.

## Boeing 2707, exhibit 004

The built-in image generator produced a 4:3 black-ink engraving of the late
fixed-wing 2707-300 in a three-quarter ground view. NASA TM-109089 (1994),
Figure 23, guided the identity check: elongated fuselage, fixed double-delta
wing, separate horizontal tailplanes, one vertical fin, and four underwing
engines. An image edit clarified the long forward strakes and leading-edge
kinks. Perspective, panel lines, windows and landing-gear details are artistic.
The surviving 2707-200 museum mockup nose is a different configuration.

Prompt: original monochrome museum engraving of the late Boeing 2707-300;
whole airliner, fixed double-delta wings with long forward strakes, separate
tailplanes, four underwing engines, landing gear, white background, restrained
crosshatching, no canards, swing-wing hinges, logos or text. Edit: match the
NASA reference's forward strakes and leading-edge kinks while preserving the
engraving style and complete silhouette.

Exports: `boeing-2707-standard-4x3.jpg` (1200×900) and
`boeing-2707-master-2x1.jpg` (1600×800), grayscale JPEG. Contain resizing with
white margins retains the complete subject. Only blank top/bottom paper
margins were trimmed before export to make the airliner legible at small sizes. CI pins the newest exhibit with
local images served over localhost for review before its assets reach main.

## Fun Palace and Project Daedalus, exhibits 005–006

Original artwork was generated with the built-in image generator, with
institution-hosted images used only to guide identifying features. No source
image was redistributed. Both whole subjects are contained within white margins
in grayscale 1200×900 and 1600×800 JPEGs under `assets/exhibits/responsive-v2/`.

Fun Palace prompt: original 4:3 black-ink museum engraving interpreting the
open steel framework, overhead travelling gantry, suspended cultural modules,
bridges and stairs in the CCA's 1964 promotional brochure; whole framework in
three-quarter cutaway view, tiny people for scale, pure white backdrop, restrained
crosshatching, no lettering, logos, amusement-park rides or solid facade.
Reference: CCA DR1995:0188:525:001:023. This is a conceptual interpretation of
the adaptable complex, not a precise site-specific engineering plan.
Exports: `fun-palace-standard-4x3.jpg`, `fun-palace-master-2x1.jpg`.

Daedalus prompt: original 4:3 black-ink museum engraving of the uncrewed
two-stage fusion probe; complete assembled spacecraft diagonally in space,
large first-stage bell, paired rounded tanks, exposed truss, smaller upper
engine/tank stage and payload dish; pure white background, crisp contours, no
flames, crew habitat, Earth, wings, labels or logos. Reference: Adrian Mann
concept rendition hosted on BIS's Technical Projects page, used for configuration
only. Tank, bell and truss relationships passed identity review; fine details
and perspective are illustrative. Exports: `project-daedalus-standard-4x3.jpg`,
`project-daedalus-master-2x1.jpg`.

CI uses offsets 0 and 1 from the end of the live catalogue to review both newest
exhibits in all four layouts on OG, X landscape and X portrait. The optional
argument to `prepare-render-fixture.js` selects the offset (default 0); invalid
offsets fail before writing preview configuration. Artifacts carry the offset.

## 8 October 2026 additions

Complete prompts, crop corrections and export details: [image update](IMAGE_UPDATE_2026-10-08.md).

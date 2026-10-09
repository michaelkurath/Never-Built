# NEVER BUILT for TRMNL

**One unrealised future, every refresh.**

A rotating museum of real proposals for buildings, vehicles, and inventions that never became reality. Each exhibit shows the ambition, development stage, why it stayed unbuilt, and what survives.

Adapted from [GOODBYE](https://github.com/michaelkurath/TRMNL-Goodbye) at commit `63f7b5d59b2be6b096d42b41b78929d9d8e20621`. Retains the four responsive layouts, category filter, unchanged Saved State rotation algorithm, website, candidate review system, and device-render workflow. Editorial data, artwork, branding, and display fields are replaced.

## Live collection

| Live exhibit | Proposal period | Development stage |
| --- | --- | --- |
| The Illinois | 1956 | Proposal |
| Ford Nucleon | 1958 | Non-working scale model |
| Project Orion | 1958–1965* | Conventional-explosive test hardware |
| Boeing 2707 | 1966–1971* | Mock-up |
| Fun Palace | 1961–1974 | Proposal |
| Project Daedalus | 1973–1978 | Design study |
| VentureStar | 1997–2001* | Design study |
| Tatlin’s Tower | 1919–1920 | Scale model |
| OWL 100-metre Telescope | 1998–2005 | Design study |

Nine live entries have monochrome artistic interpretations in 4:3 and 2:1 exports. These are illustrative reconstructions, not archival photos or exact technical drawings. Whole subjects are preserved with white padding.

Thirteen separate candidates remain in the [research queue](data/candidates.json), including the new Lockheed L-2000 (20/25) and Joint Core System (20/25). VentureStar is exhibit 007; Jupiter Icy Moons Orbiter is the latest candidate (21/25). Candidates stay outside the live rotation and website until promoted. Ratings are provisional editorial judgements. Boeing 2707 is exhibit 004; Fun Palace and Project Daedalus are exhibits 005 and 006. See [Boeing review](docs/PROMOTION_2026-10-07.md) and [latest promotion review](docs/PROMOTION_2026-10-08.md).

## TRMNL setup

1. Open the existing NEVER BUILT private plugin (`498879`) in TRMNL.
2. On its GitHub sync card, import the latest changes from this repository. Leave the repository folder blank; the plugin files are in `src/`.
3. Verify the polling URL, Node serverless transform, shared markup, four layouts and category field were imported. Enable Saved State for the transform.
4. Force Refresh and review the preview. Choose all categories or one category; Clear Saved State restarts the rotation.

GitHub → TRMNL import is manual. Saving an empty plugin before importing sends its empty settings back to GitHub. Import the repository configuration first.

For a separate installation, create/import a new plugin and use its own ID instead of `498879`.

The settings preserve NEVER BUILT’s installation ID. No GOODBYE installation ID, API key, or device binding is included. Empty category selections fall back to the full catalogue.

## Checks and preview

```sh
node scripts/validate-data.js
node scripts/validate-candidates.js
node scripts/validate-assets.js
node scripts/test-transform.js
node scripts/test-catalogue.js
node scripts/build-website.js
```

Device previews use Ruby, Firefox, ImageMagick and `trmnl_preview` 0.14.2: run `trmnlp lint` and `trmnlp serve`. GitHub Actions runs these checks and renders all four layouts on OG, X landscape, and X portrait. Artifacts: `never-built-render-previews-0` and `never-built-render-previews-1`; `never-built-render-previews-empty` checks missing transform selection with a populated catalogue. The render fixture pins each of the two newest live exhibits and checks the empty-selection state and serves its local images, so pull-request previews do not depend on unreleased images already existing on main.

## Data and website

[data/trmnl.json](data/trmnl.json) contains live exhibits; [data/candidates.json](data/candidates.json) holds the queue. Fields: `proposal_period`, `proposal_year`, `stage`, `caption`, `why_unbuilt`, `what_remains`, source metadata and qualified notes. Artwork metadata is `ai_artistic_reconstruction`.

The reused website has live counts, sources, category filters, deep links, Today and Random controls, and artwork labels. `node scripts/build-website.js` assembles `_site/`; serve it locally. The Pages workflow publishes the same build. For a new repository, first enable **Settings → Pages → Source: GitHub Actions**; the workflow token cannot enable Pages itself.

See [editorial process](docs/EDITORIAL_PROCESS.md), [source review](docs/STARTER_REVIEW.md), [image workflow](docs/IMAGE_WORKFLOW.md), and [roadmap](ROADMAP.md).

## License

[LICENSE.md](LICENSE.md): CC BY 4.0 and TRMNL Community Plugin terms. Original and adapted work by Michael Kurath.

Latest collection update: **9 live exhibits and 13 candidates**. See [9 October review](docs/PROMOTION_2026-10-09.md).

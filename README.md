# NEVER BUILT for TRMNL

**One unrealised future, every refresh.**

A rotating museum of real proposals for buildings, vehicles, and inventions that never became reality. Each exhibit shows the ambition, development stage, why it stayed unbuilt, and what survives.

Adapted from [GOODBYE](https://github.com/michaelkurath/TRMNL-Goodbye) at commit `63f7b5d59b2be6b096d42b41b78929d9d8e20621`. Retains the four responsive layouts, category filter, unchanged Saved State rotation algorithm, website, candidate review system, and device-render workflow. Editorial data, artwork, branding, and display fields are replaced.

## Starter collection

| Live exhibit | Proposal period | Development stage |
| --- | --- | --- |
| The Illinois | 1956 | Proposal |
| Ford Nucleon | 1958 | Non-working scale model |
| Project Orion | 1958–1965* | Conventional-explosive test hardware |

Three live entries have monochrome artistic interpretations in 4:3 and 2:1 exports. These are illustrative reconstructions, not archival photos or exact technical drawings. Whole subjects are preserved with white padding.

Three separate candidates: Boeing 2707 (24/25), Tatlin's Tower (21/25), and Project Daedalus (22/25). Candidates stay outside the live rotation and website until promoted. Ratings are provisional editorial judgements.

## TRMNL setup

1. Create a new private plugin or recipe in TRMNL.
2. Use the polling URL and settings in [src/settings.yml](src/settings.yml).
3. Install [src/transform.js](src/transform.js) as the Node serverless transform with Saved State enabled.
4. Copy shared markup and the four layouts from `src/` into the matching editor sections.
5. Choose all categories or one category. Force Refresh retains history; Clear Saved State restarts it.

No existing GOODBYE installation ID, API key, or device binding is included. Empty category selections fall back to the full catalogue.

## Checks and preview

```sh
node scripts/validate-data.js
node scripts/validate-candidates.js
node scripts/validate-assets.js
node scripts/test-transform.js
node scripts/test-catalogue.js
node scripts/build-website.js
```

Device previews use Ruby, Firefox, ImageMagick and `trmnl_preview` 0.14.2: run `trmnlp lint` and `trmnlp serve`. GitHub Actions runs these checks and renders all four layouts on OG, X landscape, and X portrait. Artifact: `never-built-render-previews`.

## Data and website

[data/trmnl.json](data/trmnl.json) contains live exhibits; [data/candidates.json](data/candidates.json) holds the queue. Fields: `proposal_period`, `proposal_year`, `stage`, `caption`, `why_unbuilt`, `what_remains`, source metadata and qualified notes. Artwork metadata is `ai_artistic_reconstruction`.

The reused website has live counts, sources, category filters, deep links, Today and Random controls, and artwork labels. `node scripts/build-website.js` assembles `_site/`; serve it locally. The Pages workflow publishes the same build.

See [editorial process](docs/EDITORIAL_PROCESS.md), [source review](docs/STARTER_REVIEW.md), [image workflow](docs/IMAGE_WORKFLOW.md), and [roadmap](ROADMAP.md).

## License

[LICENSE.md](LICENSE.md): CC BY 4.0 and TRMNL Community Plugin terms. Original and adapted work by Michael Kurath.

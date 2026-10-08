# AI Chef review — 8 October 2026

## Decisions

1. Retain `border--h-black`. The [current border documentation](https://trmnl.com/framework/docs/3.4/border) explicitly supports it as the strongest theme-aware fill. Only the numbered 1–7 aliases are deprecated; the critical hint confuses the two families.
2. Use `selected_entry` exclusively. Removed `pool | sample` and unused Liquid category/pool calculations. Category fallback and non-repeating rotation remain in the Saved State transform. Missing selection shows the empty state, even when catalogue items are present. Full view now identifies the polling source and transform as the checks to make.
3. Remove the redundant black override from all four title-bar instance spans. Keep the override on the small gray exhibit metadata, where it preserves OG readability.
4. Replace `font--bold` with `text--bold` on captions in all four layouts. The [weight documentation](https://trmnl.com/framework/docs/3.4/font_weight) confirms the former exists but is deprecated; the latter preserves emphasis and is the canonical spelling.
5. Retain the inline `currentColor` SVG. The [image documentation](https://trmnl.com/framework/docs/3.4/image) recommends inline currentColor SVG for recoloring without mask classes. `image--adaptive` is intended for image silhouettes processed by the framework runtime, not a necessary wrapper around this inline icon.

## Validation

All local data, candidate, asset, Saved State rotation, catalogue and website
checks passed. [Actions run 37733988266](https://github.com/michaelkurath/Never-Built/actions/runs/37733988266)
passed all three jobs, including plugin lint. Visual review passed all 36
previews: Fun Palace, Daedalus and null selection with a populated catalogue,
each in four layouts on OG, X landscape and X portrait. Captions retain bold
weight, title-bar instance text remains readable, icons render correctly, and
missing transform output never displays a random catalogue entry.

Artifacts: `never-built-render-previews-0` (11530764434),
`never-built-render-previews-1` (11530814210), and
`never-built-render-previews-empty` (11531280503).
The subsequent documentation-only commit does not alter reviewed markup.

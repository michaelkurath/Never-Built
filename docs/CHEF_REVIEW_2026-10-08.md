# AI Chef review — 8 October 2026

## Decisions

1. Retain `border--h-black`. The [current border documentation](https://trmnl.com/framework/docs/3.4/border) explicitly supports it as the strongest theme-aware fill. Only the numbered 1–7 aliases are deprecated; the critical hint confuses the two families.
2. Use `selected_entry` exclusively. Removed `pool | sample` and unused Liquid category/pool calculations. Category fallback and non-repeating rotation remain in the Saved State transform. Missing selection shows the empty state, even when catalogue items are present. Full view now identifies the polling source and transform as the checks to make.
3. Remove the redundant black override from all four title-bar instance spans. Keep the override on the small gray exhibit metadata, where it preserves OG readability.
4. Replace `font--bold` with `text--bold` on captions in all four layouts. The [weight documentation](https://trmnl.com/framework/docs/3.4/font_weight) confirms the former exists but is deprecated; the latter preserves emphasis and is the canonical spelling.
5. Retain the inline `currentColor` SVG. The [image documentation](https://trmnl.com/framework/docs/3.4/image) recommends inline currentColor SVG for recoloring without mask classes. `image--adaptive` is intended for image silhouettes processed by the framework runtime, not a necessary wrapper around this inline icon.

## Validation

Pending CI and visual review. The render matrix includes both latest exhibits
and a null `selected_entry` with a populated catalogue, to verify missing
transform output cannot silently select a random exhibit.

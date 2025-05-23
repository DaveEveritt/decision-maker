# Decision maker

Because decisions are hard, I made this.

## TO DO

- [ ] fix duplicate IDs in pro/con choices
- [ ] replace `event` with `e`
- [ ] replace `.choices fieldset h2` with legend and style
- [ ] untangle and abstract choiceYtotal and choiceNtotal calculations
- [ ] enable deletion of reasons
- [ ] update Open Graph Protocol image
- [ ] use `template`/`slot` for list items

## DONE

- [x] trap for NaN when only one slider
- [x] use Y N sliders instead of total sliders (line ~46)
- [x] CSS: use classlist.add instead of `style.color`
- [x] fix long decimals in % with .toFixed(2) if choice(Y|N) contain "." as char 2
- [x] restrict length of reasons to a reasonable length (110 chars)

## PENDING OPTIONS

- [ ] limit reasons to 7 decisions for/against to manage cognitive load/indecision
- [ ] name and store previous choices to load again
- [ ] hint to change default by highlighting (glow?) slider button

<!-- ## Greame’s suggestion

For the model, remove "for" and "against" to simplify. Just take the average or the weighted average if you add weights (0.0 - 1.0). For the interface, address each individual item in isolation to allow for a clear focus. You can present the summary on a separate page to avoid distraction. All handled via localstorage or similar. -->

---

## Notes

Originally ported *to* Meteor *from* a pure Javascript prototype, now reverted to the latter because… frameworks.

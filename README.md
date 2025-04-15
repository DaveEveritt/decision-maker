# Decision maker

Because decisions are hard for me, I made this.

## TO DO

- [ ] untangle and abstract choiceYtotal and choiceNtotal calculations
- [ ] enable deletion of reasons
- [ ] update Open Graph Protocol image
- [ ] replace `.choices fieldset h2` with legend and style

## DONE

- [x] trap for NaN when only one slider
- [x] use Y N sliders instead of total sliders (line ~46)
- [x] CSS: use classlist.add instead of `style.color`
- [x] fix long decimals in % with .toFixed(2) if choice(Y|N) contain "." as char 2
- [x] restrict length of reasons to a reasonable length (110 chars)

## PENDING

- [ ] decide on a question text field or none?
- [ ] limit reasons to 7 decisions for/against to manage cognitive load/indecision
- [ ] use a component for list items
- [ ] make mobile-first with tabs or slider panes
- [ ] store previous choices to load again

## Greame’s suggestion

For the model, remove "for" and "against" to simplify. Just take the average or the weighted average if you add weights (0.0 - 1.0). For the interface, address each individual item in isolation to allow for a clear focus. You can present the summary on a separate page to avoid distraction. All handled via localstorage or similar.

---

## Notes

Originally ported *to* Meteor *from* a pure Javascript prototype, now reverted to the latter because… frameworks.

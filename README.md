# Decision maker [Online version](https://daveeveritt.github.io/decision-maker/)

Because I often find decisions hard, I made this to scratch my own indecision itch.

## BUGS

- [ ] fix average showing zero if new sliders not ranked (message: please rank this new choice?)
- [ ] hint to change default by highlighting (glow?) slider button

## TO DO

- [ ] pre-calculate `getEl("decision")` overall message to simplify `else if`
- [ ] enable deletion of choices (`element.remove()`)
- [ ] add a "delete all" option (`choices.forEach`?)
- [ ] update Open Graph Protocol image

## PENDING OPTIONS

- [ ] limit for/against reasons to 7 to prevent overthinking
- [ ] use `template`/`slot` for list items
- [ ] name and store previous choices to load again

## DONE

- [x] trap for NaN when only one slider
- [x] use Y N sliders instead of total sliders (line ~46)
- [x] CSS: use classlist.add instead of `style.color`
- [x] fix long decimals in % with .toFixed(2)
- [x] restrict length of reasons to a reasonable length (110 chars)

<!-- ## Greame’s suggestion

For the model, remove "for" and "against" to simplify. Just take the average or the weighted average if you add weights (0.0 - 1.0). For the interface, address each individual item in isolation to allow for a clear focus. You can present the summary on a separate page to avoid distraction. All handled via localstorage or similar. -->

---

## Notes

Originally ported *to* Meteor *from* a pure Javascript prototype, then reverted *back to* JavaScript because… frameworks.

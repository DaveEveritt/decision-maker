# Decision maker [Online version](https://daveeveritt.codeberg.page/decision-maker/)

Because I often find decisions hard, I made this to scratch my own indecisive itch.

## TO DO

- [ ] abstract counting sliders into a function
- [ ] set up code on server under un.fased.org


## POSSIBLE USER OPTIONS

- [ ] limit for/against reasons to 7 to prevent overthinking
- [ ] name and store previous choices to load again
- [ ] add a field to edit the text of the question
- [ ] add a "delete all" option (`choices.forEach`?)

## TO DO CODE

- [ ] test Open Graph Protocol image for social media
- [ ] abstract `getEl("decision")` into a function (messages in an object?)
- [ ] use another method instead of innerHTML for calculations
- [ ] try `template`/`slot` for list items

---

## DONE

- [x] FIX: delete reason comes up three times before deleting
- [x] FIX: with one pro/con slider each, 100% shows opposite of pro/con (LINE 122)
- [x] set up repo on codeberg
- [x] enable deletion of choices (`element.remove()`)
- [x] trap for NaN when only one slider
- [x] use Y N sliders instead of total sliders (line ~46)
- [x] CSS: use classlist.add instead of `style.color`
- [x] fix long decimals in % with .toFixed(2)
- [x] restrict length of reasons to a reasonable length (110 chars)
- [x] make favicon at [realfavicongenerator.net](https://realfavicongenerator.net/your-favicon-is-ready)

Originally ported *to* Meteor *from* a pure Javascript prototype, then reverted *back to* JavaScript because… frameworks.

<!-- ## Greame’s suggestion

For the model, remove "for" and "against" to simplify. Just take the average or the weighted average if you add weights (0.0 - 1.0). For the interface, address each individual item in isolation to allow for a clear focus. You can present the summary on a separate page to avoid distraction. All handled via localstorage or similar. -->


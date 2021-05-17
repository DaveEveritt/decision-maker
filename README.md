# Decision maker

Because decisions are hard for me, I made this.

## TO DO

- [ ] trap for NaN when only one slider
- [ ] make mobile-first with tabs or slider panes
- [ ] store previous choices to laod again
- [ ] provide a question text field to replace 'Decision Maker'
- [ ] enable deletion of reasons
- [ ] untangle and abstract choiceYtotal and choiceNtotal calculations

## DONE

- [x] replace fieldset h2 with legend and style
- [x] branch master in "static", merge textinput into master
- [x] delete redundant branches
- [x] use Y N sliders instead of total sliders (line ~46)
- [x] CSS: use classlist.add instead of `style.color`
- [x] fix long decimals in % with .toFixed(2) if choice(Y|N) contain "." as char 2
- [x] fix NaN for initial percentages
- [x] clear text input after entry
- [x] multiply calculations for % by 100
- [x] update decision totals
- [x] increment numbers on each reason
- [x] add input and handler to enable users to add for/against
- [x] restrict length of reasons to a reasonable length (110 chars)
- [x] add Open Graph Protocol data and image

## PENDING

- [ ] limit reasons to 7 decisions for/against to manage cognitive load/indecision
- [ ] use a component for list items

## Greame’s suggestion

For the model, remove "for" and "against" to simplify. Just take the average or the weighted average if you add weights (0.0 - 1.0). For the interface, address each individual item in isolation to allow for a clear focus. You can present the summary on a separate page to avoid distraction. All handled via localstorage or similar.

---

## Notes

Originally ported to Meteor from a pure Javascript prototype, now reverted to the latter because… frameworks.
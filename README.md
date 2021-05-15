# Decision maker

Because decisions are hard for me, I made this.

## TO DO

- [ ] enable deletion of reasons
- [ ] enable swapping wrongly entered reasons between for/not
- [ ] make mobile-first with tabs or slider panes
- [ ] replace fieldset h2 with legend and style
- [ ] add a question title field

## TO DONE

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

## TO FUTURE?

- [ ] limit reasons to 7 decisions for/against to manage cognitive load/indecision
- [ ] use a component for list items

---

## Notes

Originally ported to Meteor from a pure Javascript prototype, now reverted to the latter because… frameworks.
# databank

Community data for Star Wars: Legion

[![Node.js CI](https://github.com/retinue-app/databank/workflows/Node.js%20CI/badge.svg)](https://github.com/retinue-app/databank/actions)

## TODO

### Content

- [x] Add rest of Legion Core Set (SWL-01 -> SWL-07).
- [x] Add "wave 1" (SWL-08 -> SWL-13).
- [x] Add "wave 2" (SWL-14 -> SWL-21).
- [x] Add "wave 3" (SWL-22 -> SWL-27).
- [x] Add "wave 4" (SWL-31 -> SWL-36).
- [x] Add "wave 5" (SWL-37 -> SWL-42).
- [x] Add "wave 6" (SWL-44 -> SWL-57).
- [x] Add "wave 7" (SWL-59 -> SWL-65).
- [x] Add "wave 8" (SWL-66 -> SWL-73).
- [x] Add "wave 9" (as revealed, i.e. through SWL-77 partially).

- [x] Change `unitTypes` to the format `{Trooper: 'Droid Trooper'}`.

- [ ] Add command cards (wave 0 -> 9).

- [ ] Add actions.
- [ ] Add tokens.
- [ ] Add keywords.

- [ ] Encode effects on common or simple keywords/actions (`Force Reflexes`).

- [ ] Add most recent RRG points and errata.

- [ ] Add battle cards (core, priority supplies, vital assets).
- [ ] Add battle cards (downed AT-ST, crashed Escape Pod, imperial Bunker).
- [ ] Add battle cards (skirmish).
- [ ] Add battle cards (operations).

### Validation

- [ ] Verify string-based foreign keys are valid.

## Usage

TBD.

## Contributing

This repository is intentionally structured to be easy to contribute to, even
for non-technical community members. All bits of the database of cards and
keywords are located in `data/` and are stored in (validated) `.json` files.

> **TIP**: [Mozilla][] and [SquareSpace][] have introductions to `JSON` files.

[mozilla]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
[squarespace]: https://developers.squarespace.com/what-is-json

## Development

TBD.

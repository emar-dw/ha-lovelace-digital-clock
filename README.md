# Digital Clock

A custom digital clock card for Home Assistant with resizing controls. Forked from wassy92x/lovelace-digital-clock

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![License][license-shield]](LICENSE.md)

![Image of Digital Clock Card](https://github.com/wassy92x/lovelace-digital-clock/blob/master/.images/digital-clock.png?raw=true)

## Options

| Name                        | Type    | Requirement  | Description                                 | Default             |
| --------------------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type                        | string  | **Required** | `custom:digital-clock`                      |                     |
| locale                      | string  | **Optional** | Locale to use for formatting. For example `de` | locale set in your home assistant profile otherwise your browser locale |
| timeZone                    | string  | **Optional** | Time zone to use. For example `Europe/Berlin` | time zone set in your home assistant profile otherwise your browser time zone |
| firstLineFormat &#124; timeFormat   | object &#124; string | **Optional** | Format of first line           | { hour: '2-digit', minute: '2-digit' } |
| secondLineFormat &#124; dateFormat | object  &#124; string  | **Optional** | Format of second line        | { weekday: 'short', day: '2-digit', month: 'short' } |
| firstLineFontSize           | string  | **Optional** | Font size for the first line (e.g. `2.8em`, `32px`) | 2.8em              |
| firstLineFontWeight         | string  | **Optional** | Font weight for the first line (e.g. `bold`, `400`) | bold               |
| secondLineFontSize          | string  | **Optional** | Font size for the second line (e.g. `1.6em`, `20px`) | 1.6em              |
| secondLineFontWeight        | string  | **Optional** | Font weight for the second line (e.g. `bold`, `400`) | bold               |

If `firstLineFormat` respectively `secondLineFormat` is a string, it can be every format, which is valid in Luxon.  
See: [https://moment.github.io/luxon/#/formatting?id=toformat](https://moment.github.io/luxon/#/formatting?id=toformat)

If `firstLineFormat` respectively `secondLineFormat` is an object, it can be every valid object, which can be passed as options to the Luxon-function `toLocalString()`.  
See: [https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans](https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans)

If `timeFormat` is specified, it will override `firstLineFormat` and `dateFormat` will override `secondLineFormat`.

# Example
```
type: 'custom:digital-clock'
dateFormat:
  weekday: 'long'
  day: '2-digit'
  month: 'short'
timeFormat:
  hour: '2-digit'
  minute: '2-digit'
firstLineFontSize: '3em'
firstLineFontWeight: '900'
secondLineFontSize: '1.2em'
secondLineFontWeight: 'normal'
```

[license-shield]: https://img.shields.io/github/license/wassy92x/lovelace-digital-clock.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/wassy92x/lovelace-digital-clock.svg?style=for-the-badge
[releases]: https://github.com/wassy92x/lovelace-digital-clock/releases

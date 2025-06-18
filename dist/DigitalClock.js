import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators";
import { DateTime } from "luxon";

export const CARD_VERSION = "1.2.4b";

console.info(
  `%c  Digital-Clock \n%c  Version ${CARD_VERSION}    `,
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray"
);

class DigitalClock extends LitElement {
  static properties = {
    hass: { attribute: false },
    _firstLine: { state: true },
    _secondLine: { state: true },
    _config: { state: true },
    _interval: { state: true },
  };

  constructor() {
    super();
    this._firstLine = "";
    this._secondLine = "";
    this._config = undefined;
    this._interval = 1000;
    this._intervalId = undefined;
  }

  setConfig(config) {
    this._config = { ...config };
    if (this._config.timeFormat) this._config.firstLineFormat = this._config.timeFormat;
    if (this._config.dateFormat) this._config.secondLineFormat = this._config.dateFormat;
    if (this._config.interval !== this._interval) this._interval = this._config.interval ?? 1000;
  }

  shouldUpdate(changedProps) {
    return (
      changedProps.has("_firstLine") ||
      changedProps.has("_secondLine") ||
      changedProps.has("_config") ||
      changedProps.has("hass")
    );
  }

  async getCardSize() {
    return 3;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("_interval")) {
      this._stopInterval();
      this._startInterval();
    }
    if (changedProperties.has("_config")) this._updateDateTime();
  }

  connectedCallback() {
    super.connectedCallback();
    this._startInterval();
  }

  _startInterval() {
    if (this._intervalId) return;
    this._intervalId = window.setInterval(this._updateDateTime.bind(this), this._interval);
  }

  _stopInterval() {
    if (!this._intervalId) return;
    window.clearInterval(this._intervalId);
    this._intervalId = undefined;
  }

  async _updateDateTime() {
    const timeZone = this._config?.timeZone ?? this.hass?.config?.time_zone;
    const locale = this._config?.locale ?? this.hass?.locale?.language;

    let dateTime = DateTime.local();
    if (timeZone) dateTime = dateTime.setZone(timeZone);
    if (locale) dateTime = dateTime.setLocale(locale);

    let firstLine;
    let secondLine;

    if (typeof this._config?.firstLineFormat === "string") {
      firstLine = dateTime.toFormat(this._config.firstLineFormat);
    } else {
      firstLine = dateTime.toLocaleString(
        this._config?.firstLineFormat ?? { hour: "2-digit", minute: "2-digit" }
      );
    }

    if (typeof this._config?.secondLineFormat === "string") {
      secondLine = dateTime.toFormat(this._config.secondLineFormat);
    } else {
      secondLine = dateTime.toLocaleString(
        this._config?.secondLineFormat ?? {
          weekday: "short",
          day: "2-digit",
          month: "short",
        }
      );
    }

    if (firstLine !== this._firstLine) this._firstLine = firstLine;
    if (secondLine !== this._secondLine) this._secondLine = secondLine;
  }

  disconnectedCallback() {
    this._stopInterval();
    super.disconnectedCallback();
  }

  render() {
    const firstLineFontSize = this._config?.firstLineFontSize ?? "2.8em";
    const firstLineFontWeight = this._config?.firstLineFontWeight ?? "bold";
    const secondLineFontSize = this._config?.secondLineFontSize ?? "1.6em";
    const secondLineFontWeight = this._config?.secondLineFontWeight ?? "bold";

    return html`
      <ha-card>
        <span
          class="first-line"
          style="font-size: ${firstLineFontSize}; font-weight: ${firstLineFontWeight};"
          >${this._firstLine}</span
        >
        <span
          class="second-line"
          style="font-size: ${secondLineFontSize}; font-weight: ${secondLineFontWeight};"
          >${this._secondLine}</span
        >
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-card {
        text-align: center;
        font-weight: bold;
        padding: 8px 0;
      }

      ha-card > span {
        display: block;
      }

      .first-line {
        font-size: 2.8em;
        line-height: 1em;
      }

      .second-line {
        font-size: 1.6em;
        line-height: 1em;
      }
    `;
  }
}

customElements.define("digital-clock", DigitalClock);
(window.customCards = window.customCards || []).push({
  type: "digital-clock",
  name: "DigitalClock",
  description: "A digital clock component",
});

export default DigitalClock;

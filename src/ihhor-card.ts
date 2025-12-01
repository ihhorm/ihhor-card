import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

type HassEntity = {
  state: string;
  attributes: Record<string, unknown>;
  entity_id?: string;
};

type HomeAssistant = {
  states: Record<string, HassEntity>;
  language?: string;
  locale?: unknown;
  callService(domain: string, service: string, data?: Record<string, unknown>): void;
};

type LovelaceCardConfig = {
  type: string;
};

type IhhorCardConfig = LovelaceCardConfig & {
  entity: string;
  name?: string;
  background?: string;
  border_color?: string;
  accent_color?: string;
  text_color?: string;
  step?: number;
  mode_type?: "hvac" | "preset";
  modes?: string[];
};

@customElement("ihhor-card")
export class IhhorCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: IhhorCardConfig;

  public static getStubConfig(): IhhorCardConfig {
    return {
      type: "custom:ihhor-card",
      entity: "climate.sunny_bedroom",
      name: "Спальня Сонячна",
      modes: ["off", "on", "auto", "prog"],
      mode_type: "preset"
    };
  }

  public setConfig(config: IhhorCardConfig): void {
    if (!config) {
      throw new Error("Config is required");
    }

    if (!config.entity || typeof config.entity !== "string") {
      throw new Error("Необхідно вказати entity (наприклад climate.bedroom).");
    }

    this._config = {
      ...config,
      type: "custom:ihhor-card"
    };
  }

  public getCardSize(): number {
    return 3;
  }

  private _getEntity(): HassEntity | undefined {
    if (!this._config || !this.hass) {
      return undefined;
    }

    return this.hass.states?.[this._config.entity];
  }

  private _getCurrentTemp(entity: HassEntity): number | undefined {
    const current = entity.attributes.current_temperature ?? entity.attributes.temperature;
    return typeof current === "number" ? current : undefined;
  }

  private _getTargetTemp(entity: HassEntity): number | undefined {
    const { attributes } = entity;
    const target =
      attributes.temperature ??
      attributes.target_temp_high ??
      attributes.target_temp_low ??
      attributes.target_temperature ??
      attributes.setpoint_temperature ??
      attributes.current_temperature;

    return typeof target === "number" ? target : undefined;
  }

  private _getHumidity(entity: HassEntity): number | undefined {
    const humidity = entity.attributes.current_humidity ?? entity.attributes.humidity;
    return typeof humidity === "number" ? humidity : undefined;
  }

  private _localizeAction(entity: HassEntity): string {
    const hvacAction = entity.attributes.hvac_action;
    const hvacMode = entity.attributes.hvac_mode;
    const state = entity.state;
    const dictionary: Record<string, string> = {
      heating: "Нагрів",
      cooling: "Охолодження",
      idle: "Очікування",
      off: "Вимкнено",
      heat: "Нагрів",
      cool: "Охолодження",
      auto: "Авто",
      dry: "Осушення",
      fan_only: "Вентиляція"
    };

    if (typeof hvacAction === "string" && dictionary[hvacAction]) {
      return dictionary[hvacAction];
    }

    if (typeof hvacMode === "string" && dictionary[hvacMode]) {
      return dictionary[hvacMode];
    }

    return dictionary[state] ?? state;
  }

  private _thermoIcon(isHeating: boolean) {
    return html`
      <svg
        class="thermo-svg ${isHeating ? "heating" : ""}"
        viewBox="0 0 64 64"
        role="img"
        aria-label="Thermometer"
      >
        <defs>
          <linearGradient id="thermo-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0.95" />
            <stop offset="100%" stop-color="currentColor" stop-opacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M34 38.5V14a2 2 0 1 0-4 0v24.5a8.5 8.5 0 1 0 4 0Z"
          fill="url(#thermo-glow)"
        />
        <path
          d="M30 14a2 2 0 1 1 4 0v24.5a8.5 8.5 0 1 1-4 0Z"
          fill="none"
          stroke="currentColor"
          stroke-width="3.2"
          stroke-linecap="round"
        />
        <circle cx="32" cy="47.5" r="6.5" fill="currentColor" />
        <path
          d="M28 24h8"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-opacity="0.7"
        />
        <path
          d="M28 28h8"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-opacity="0.55"
        />
        <path
          d="M28 32h8"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-opacity="0.4"
        />
      </svg>
    `;
  }

  private _modeKind(entity: HassEntity): "hvac" | "preset" {
    if (this._config?.mode_type === "preset") {
      return "preset";
    }

    if (Array.isArray(entity.attributes.hvac_modes) && entity.attributes.hvac_modes.length) {
      return "hvac";
    }

    if (Array.isArray(entity.attributes.preset_modes) && entity.attributes.preset_modes.length) {
      return "preset";
    }

    return "hvac";
  }

  private _availableModes(entity: HassEntity): string[] {
    const configModes = Array.isArray(this._config?.modes) ? this._config?.modes : [];
    const kind = this._modeKind(entity);
    const attrKey = kind === "hvac" ? "hvac_modes" : "preset_modes";
    const attrModes = Array.isArray((entity.attributes as Record<string, unknown>)[attrKey])
      ? ((entity.attributes as Record<string, unknown>)[attrKey] as string[])
      : [];

    if (configModes.length) {
      return attrModes.length ? configModes.filter((mode) => attrModes.includes(mode)) : configModes;
    }

    return attrModes;
  }

  private _activeMode(entity: HassEntity): string | undefined {
    const kind = this._modeKind(entity);

    if (kind === "preset") {
      const preset = entity.attributes.preset_mode;
      return typeof preset === "string" ? preset : undefined;
    }

    const hvac = entity.attributes.hvac_mode;
    if (typeof hvac === "string") {
      return hvac;
    }

    if (typeof entity.state === "string") {
      return entity.state;
    }

    return undefined;
  }

  private _handleModeChange(mode: string): void {
    const entity = this._getEntity();
    if (!entity || !this.hass || !this._config) {
      return;
    }

    const kind = this._modeKind(entity);
    const active = this._activeMode(entity);

    if (mode === active) {
      return;
    }

    if (kind === "preset") {
      this.hass.callService("climate", "set_preset_mode", {
        entity_id: this._config.entity,
        preset_mode: mode
      });
      return;
    }

    this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: mode
    });
  }

  private _modeLabel(mode: string): string {
    if (!mode) {
      return "";
    }

    return mode.replace(/_/g, " ").toUpperCase();
  }

  private _formatTemp(value: number | undefined): string {
    if (typeof value !== "number") {
      return "--.-";
    }

    return value.toFixed(1);
  }

  private _handleAdjust(direction: "up" | "down"): void {
    const entity = this._getEntity();
    if (!entity || !this.hass || !this._config) {
      return;
    }

    const step =
      typeof this._config.step === "number"
        ? this._config.step
        : typeof entity.attributes.target_temp_step === "number"
          ? entity.attributes.target_temp_step
          : 0.1;

    const target = this._getTargetTemp(entity);
    if (typeof target !== "number") {
      return;
    }

    const next = direction === "up" ? target + step : target - step;

    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: Number(next.toFixed(2))
    });
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    const displayName = this._config.name ?? this._config.entity;
    const vars = {
      "--ihhor-card-bg": this._config.background ?? "rgb(235, 226, 203)",
      "--ihhor-border-color": this._config.border_color ?? "rgb(98, 99, 100)",
      "--ihhor-accent": this._config.accent_color ?? "rgb(216, 116, 116)",
      "--ihhor-text": this._config.text_color ?? "#000000",
      "--ihhor-panel-bg": "rgb(233, 244, 251)",
      "--ihhor-panel-border": "rgb(169, 157, 132)"
    };

    if (!this.hass) {
      return html`
        <ha-card class="card" style=${styleMap(vars)}>
          <div class="frame">
            <div class="title-bar">
              <div class="title">${displayName}</div>
            </div>
            <div class="panel placeholder">
              <div class="placeholder-text">Очікуємо Home Assistant</div>
            </div>
          </div>
        </ha-card>
      `;
    }

    const entity = this._getEntity();

    if (!entity) {
      return html`
        <ha-card class="card" style=${styleMap(vars)}>
          <div class="frame">
            <div class="title-bar">
              <div class="title">${displayName}</div>
            </div>
            <div class="panel placeholder">
              <div class="placeholder-text">Entity не знайдено: ${this._config.entity}</div>
            </div>
          </div>
        </ha-card>
      `;
    }

    const current = this._getCurrentTemp(entity);
    const target = this._getTargetTemp(entity);
    const humidity = this._getHumidity(entity);
    const modes = this._availableModes(entity);
    const activeMode = this._activeMode(entity);
    const action = this._localizeAction(entity);
    const isHeating = action.toLowerCase().includes("гр") || entity.state === "heat" || entity.attributes.hvac_action === "heating";

    return html`
      <ha-card class="card" style=${styleMap(vars)}>
        <div class="frame">
          <div class="title-bar">
            <div class="title">${displayName}</div>
          </div>

          <div class="panel">
            <div class="thermo-column">
              <button class="arrow-btn" aria-label="Збільшити температуру" @click=${() => this._handleAdjust("up")}>&uarr;</button>
              <div class="thermo">
                ${this._thermoIcon(isHeating)}
              </div>
              <button class="arrow-btn" aria-label="Зменшити температуру" @click=${() => this._handleAdjust("down")}>&darr;</button>
            </div>
            <div class="current-block">
              <div class="current">${this._formatTemp(current)}</div>
              ${typeof humidity === "number" ? html`<div class="humidity-inline">Вологість: ${humidity}%</div>` : nothing}
            </div>
            <div class="target-block">
              <div class="unit">°C</div>
              <div class="target">${this._formatTemp(target)}</div>
            </div>
          </div>

          ${modes.length
            ? html`
                <div class="modes">
                  ${modes.map(
                      (mode) => html`
                        <button
                          class="mode-btn ${mode === activeMode ? "active" : ""}"
                          @click=${() => this._handleModeChange(mode)}
                          ?disabled=${mode === activeMode}
                        >
                          ${this._modeLabel(mode)}
                        </button>
                      `
                    )}
                  </div>
                `
              : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: Verdana, Geneva, sans-serif;
      --ha-card-border: none;
      --ha-card-border-radius: 0;
      --ha-card-background: transparent;
      --ha-card-box-shadow: none;
    }

    ha-card.card {
      background: transparent;
      border: none;
      border-radius: 0;
      box-shadow: none;
      padding: 0;
      color: var(--ihhor-text, #000);
      overflow: visible;
      opacity: 1;
      width: 100%;
    }

    .frame {
      background: var(--ihhor-card-bg, #ebe2cb);
      border: 1px solid var(--ihhor-border-color, #626364);
      border-radius: 5px;
      box-shadow: none;
      padding: 6px 7px 7px;
      color: var(--ihhor-text, #000);
      overflow: hidden;
      opacity: 0.95;
      width: 100%;
      min-width: 220px;
      max-width: 100%;
      box-sizing: border-box;
    }

    .title-bar {
      height: 29px;
      position: relative;
      margin: 0 0 4px;
    }

    .title {
      position: absolute;
      top: 2px;
      left: 8px;
      font-size: 20px;
      font-weight: 600;
      color: var(--ihhor-text, #000);
      background: var(--ihhor-card-bg, #ebe2cb);
      padding-right: 6px;
      line-height: 1.2;
    }

    .panel {
      width: 100%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 70px 1fr 60px;
      align-items: center;
      gap: 10px 10px;
      background: var(--ihhor-panel-bg, #e9f4fb);
      border: 1px solid var(--ihhor-panel-border, #a99d84);
      border-radius: 5px;
      padding: 10px;
      min-height: 88px;
      box-sizing: border-box;
    }

    .panel.placeholder {
      justify-content: center;
      text-align: center;
      color: rgba(0, 0, 0, 0.7);
    }

    .placeholder-text {
      font-size: 14px;
    }

    .thermo-column {
      display: grid;
      grid-template-rows: auto 1fr auto;
      align-items: center;
      justify-items: center;
      gap: 6px;
      height: 100%;
    }

    .thermo {
      width: 56px;
      height: 57px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .arrow-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid var(--ihhor-border-color, #626364);
      background: linear-gradient(180deg, #f6f7fb 0%, #e3e7ed 100%);
      color: #2c2f44;
      font-size: 16px;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: background 0.12s ease, box-shadow 0.12s ease, transform 0.08s ease;
    }

    .arrow-btn:hover {
      background: linear-gradient(180deg, #ffffff 0%, #dfe6ef 100%);
    }

    .arrow-btn:active {
      transform: translateY(1px);
    }

    .thermo-svg {
      width: 100%;
      height: 100%;
      color: #2c2f44;
      transition: color 0.2s ease, transform 0.2s ease, filter 0.2s ease;
    }

    .thermo-svg.heating {
      color: #d87474;
      transform: translateY(-1px);
      filter: drop-shadow(0 0 3px rgba(216, 116, 116, 0.4));
      animation: pulse 1.1s ease-in-out infinite;
    }

    @keyframes pulse {
      0% {
        opacity: 0.9;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.9;
      }
    }

    .current-block {
      text-align: center;
      color: #2c2f44;
    }

    .current {
      font-size: 56px;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -1px;
    }

    .humidity-inline {
      margin-top: 4px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.7);
    }

    .target-block {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }

    .unit {
      font-size: 20px;
      color: #2c2f44;
      line-height: 1;
      background: var(--ihhor-panel-bg, #e9f4fb);
      border-radius: 3px;
      padding: 2px 4px 0;
      box-sizing: border-box;
    }

    .target {
      font-size: 20px;
      font-weight: 600;
      color: var(--ihhor-accent, rgb(216, 116, 116));
      background: var(--ihhor-panel-bg, #e9f4fb);
      border-radius: 3px;
      padding: 0 4px;
      border: 1px solid transparent;
      min-width: 48px;
      text-align: right;
      line-height: 1.1;
    }

    .modes {
      width: 225px;
      margin: 6px auto 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(54px, 1fr));
      gap: 2px;
    }

    .mode-btn {
      background: linear-gradient(180deg, #f6f7fb 0%, #e3e7ed 100%);
      border: 1px solid #b9bfc8;
      border-radius: 3px;
      padding: 4px 4px;
      font-size: 12px;
      color: #2c2f44;
      cursor: pointer;
      transition: background 0.12s ease, box-shadow 0.12s ease, transform 0.08s ease;
      height: 26px;
      box-sizing: border-box;
    }

    .mode-btn:hover:not(:disabled) {
      background: linear-gradient(180deg, #ffffff 0%, #dfe6ef 100%);
    }

    .mode-btn:active:not(:disabled) {
      transform: translateY(1px);
    }

    .mode-btn.active {
      background: #dfe8f3;
      border-color: #8091ad;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      cursor: default;
    }

    .mode-btn:disabled {
      opacity: 0.85;
    }

    @media (max-width: 420px) {
      ha-card.card {
        width: 100%;
      }

      .frame {
        width: 100%;
      }

      .panel {
        grid-template-columns: 1fr;
        justify-items: center;
        text-align: center;
        width: 100%;
      }

      .target-block {
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ihhor-card": IhhorCard;
  }
}

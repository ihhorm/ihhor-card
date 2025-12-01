import "./ihhor-card";

type HassEntity = {
  state: string;
  attributes: Record<string, unknown>;
};

type HomeAssistant = {
  states: Record<string, HassEntity>;
  callService(domain: string, service: string, data?: Record<string, unknown>): void;
};

const entityId = "climate.sunny_bedroom";

let hass: HomeAssistant = {
  states: {
    [entityId]: {
      state: "heat",
      attributes: {
        current_temperature: 20.8,
        temperature: 20.7,
        current_humidity: 46,
        hvac_action: "heating",
        target_temp_step: 0.5,
        hvac_mode: "heat",
        hvac_modes: ["off", "heat", "auto"],
        preset_mode: "prog",
        preset_modes: ["off", "on", "auto", "prog"]
      }
    }
  },
  callService: (domain: string, service: string, data?: Record<string, unknown>) => {
    if (domain !== "climate" || data?.entity_id !== entityId) {
      console.warn("Mock callService", domain, service, data);
      return;
    }

    if (service === "set_temperature" && typeof data?.temperature === "number") {
      hass = {
        ...hass,
        states: {
          ...hass.states,
          [entityId]: {
            ...hass.states[entityId],
            attributes: {
              ...hass.states[entityId].attributes,
              temperature: data.temperature
            }
          }
        }
      };
      updateCard();
      return;
    }

    if (service === "set_preset_mode" && typeof data?.preset_mode === "string") {
      hass = {
        ...hass,
        states: {
          ...hass.states,
          [entityId]: {
            ...hass.states[entityId],
            state: data.preset_mode,
            attributes: {
              ...hass.states[entityId].attributes,
              preset_mode: data.preset_mode
            }
          }
        }
      };
      updateCard();
      return;
    }

    if (service === "set_hvac_mode" && typeof data?.hvac_mode === "string") {
      hass = {
        ...hass,
        states: {
          ...hass.states,
          [entityId]: {
            ...hass.states[entityId],
            state: data.hvac_mode,
            attributes: {
              ...hass.states[entityId].attributes,
              hvac_mode: data.hvac_mode
            }
          }
        }
      };
      updateCard();
      return;
    }

    console.warn("Mock callService", domain, service, data);
  }
};

const updateCard = () => {
  card.hass = hass;
};

const card = document.createElement("ihhor-card") as any;
card.setConfig({
  type: "custom:ihhor-card",
  entity: entityId,
  name: "Спальня Сонячна",
  background: "#ebe2cb",
  border_color: "#626364",
  accent_color: "#d87474",
  mode_type: "preset",
  modes: ["off", "on", "auto", "prog"]
});
card.hass = hass;

const host = document.querySelector("#app");
if (host) {
  host.appendChild(card);
}

const style = document.createElement("style");
style.textContent = `
  :root {
    background: radial-gradient(circle at 20% 20%, #f6e8d2, #e6d6b6);
    min-height: 100vh;
  }

  body {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 24px;
    box-sizing: border-box;
    font-family: Verdana, Geneva, sans-serif;
  }

  #app {
    max-width: 340px;
    width: 100%;
  }
`;
document.head.appendChild(style);

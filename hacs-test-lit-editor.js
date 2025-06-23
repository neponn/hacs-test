import { css, html, LitElement, nothing } from "lit";
import memoizeOne from "memoize-one";
import { fireEvent } from "./common";

export class ToggleWithGraphicalConfigurationEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config){
    console.info('HTLE: got config');
    this._config=config;
  }
  _featureContext = memoizeOne((entityId) => ({
    entity_id: entityId,
  }));

  _schema = memoizeOne((entityId) => [
    { name: "entity", selector: { entity: {} } },
    { name: "header", selector: { text: {} } },
  ]);

  render() {
    console.info("HTLE: Render called")
    if (!this.hass || !this._config) {
      console.info("HTLE: exiting render: hass or _config not set")
      return nothing;
    }

    const entityId = this._config.entity;

    const schema = this._schema(entityId);

    const data = {
      ...this._config,
    };
    
    console.info("HTLE: Render concluded")
    return html`
      <div>hacs-test-lit-editor</div>
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        .computeHelper=${this._computeHelperCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    ev.stopPropagation();

    const newConfig = ev.detail.value;

    const config = {
      ...newConfig,
    };

    // this is where manipulation of config according in response to settings should happen

    // fireEvent comes from /common/dom/fire_event - replicate
    fireEvent(this, "config-changed", { config });
  }

  _computeLabelCallback = (schema) => {
    // this is where localisation should happen
    return schema.name;
  };

  _computeHelperCallback = (schema) => {
    // not quite sure what this does - some kind of helper for certain things
    return undefined;
  };

  static get styles() {
    return css`
      .card-config {
        /* Cancels overlapping Margins for HAForm + Card Config options */
        overflow: auto;
      }
      ha-switch {
        padding: 16px 6px;
      }
      .side-by-side {
        display: flex;
        align-items: flex-end;
      }
      .side-by-side > * {
        flex: 1;
        padding-right: 8px;
        padding-inline-end: 8px;
        padding-inline-start: initial;
      }
      .side-by-side > *:last-child {
        flex: 1;
        padding-right: 0;
        padding-inline-end: 0;
        padding-inline-start: initial;
      }
      .suffix {
        margin: 0 8px;
      }
      hui-action-editor,
      ha-select,
      ha-textfield,
      ha-icon-picker {
        margin-top: 8px;
        display: block;
      }
      ha-expansion-panel {
        display: block;
        --expansion-panel-content-padding: 0;
        border-radius: 6px;
        --ha-card-border-radius: 6px;
      }
      ha-expansion-panel .content {
        padding: 12px;
      }
      ha-expansion-panel > *[slot="header"] {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }
      ha-expansion-panel ha-svg-icon {
        color: var(--secondary-text-color);
      }
      .container {
        display: flex;
        flex-direction: column;
      }
      ha-form {
        display: block;
        margin-bottom: 24px;
      }
      .info {
        color: var(--secondary-text-color);
        margin-top: 0;
        margin-bottom: 8px;
      }
      .features-form {
        margin-bottom: 8px;
      }
    `;
  }
}

customElements.define(
  "toggle-with-graphical-configuration-editor",
  ToggleWithGraphicalConfigurationEditor
);

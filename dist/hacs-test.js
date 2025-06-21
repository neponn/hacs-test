(()=>{class e extends HTMLElement{_config;_hass;_elements={};constructor(){super(),console.log("editor:constructor()"),this.doEditor(),this.doStyle(),this.doAttach(),this.doQueryElements(),this.doListen()}setConfig(e){console.log("editor:setConfig()"),this._config=e,this.doUpdateConfig()}set hass(e){console.log("editor.hass()"),this._hass=e,this.doUpdateHass()}onChanged(e){console.log("editor.onChanged()"),this.doMessageForUpdate(e)}doEditor(){this._elements.editor=document.createElement("form"),this._elements.editor.innerHTML=`
            <div class="row"><label class="label" for="header">Header:</label><input class="value" id="header"></input></div>
            <div class="row"><label class="label" for="entity">Entity:</label><input class="value" id="entity"></input></div>
        `}doStyle(){this._elements.style=document.createElement("style"),this._elements.style.textContent=`
            form {
                display: table;
            }
            .row {
                display: table-row;
            }
            .label, .value {
                display: table-cell;
                padding: 0.5em;
            }
        `}doAttach(){this.attachShadow({mode:"open"}),this.shadowRoot.append(this._elements.style,this._elements.editor)}doQueryElements(){this._elements.header=this._elements.editor.querySelector("#header"),this._elements.entity=this._elements.editor.querySelector("#entity")}doListen(){this._elements.header.addEventListener("focusout",this.onChanged.bind(this)),this._elements.entity.addEventListener("focusout",this.onChanged.bind(this))}doUpdateConfig(){this._elements.header.value=this._config.header,this._elements.entity.value=this._config.entity}doUpdateHass(){}doMessageForUpdate(e){let t=Object.assign({},this._config);"header"==e.target.id?t.header=e.target.value:"entity"==e.target.id&&(t.entity=e.target.value);let s=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(s)}}customElements.define("toggle-with-graphical-configuration-editor",e);var t={};t=JSON.parse('{"name":"hacs-test","version":"1.7.0","author":"neponn","repository":{"type":"git","url":"git+https://github.com/neponn/hacs-test.git"},"source":"hacs-test.js","scripts":{"start":"parcel","build":"parcel build"},"type":"module","devDependencies":{"parcel":"^2.15.2"},"dependencies":{"memoize-one":"6.0.0","lit":"^3.1.0"},"description":"[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)","license":"MIT","bugs":{"url":"https://github.com/neponn/hacs-test/issues"},"homepage":"https://github.com/neponn/hacs-test#readme"}');class s extends HTMLElement{_config;_hass;_elements={};constructor(){super(),this.doCard(),this.doStyle(),this.doAttach(),this.doQueryElements(),this.doListen()}setConfig(e){this._config=e,this.doCheckConfig(),this.doUpdateConfig()}set hass(e){this._hass=e,this.doUpdateHass()}onClicked(){this.doToggle()}isOff(){return"off"===this.getState().state}isOn(){return"on"===this.getState().state}getHeader(){return this._config.header}getEntityID(){return this._config.entity}getState(){return this._hass.states[this.getEntityID()]}getAttributes(){return this.getState().attributes}getName(){return this.getAttributes().friendly_name||this.getEntityID()}doCheckConfig(){if(!this._config.entity)throw Error("Please define an entity!")}doCard(){this._elements.card=document.createElement("ha-card"),this._elements.card.innerHTML=`
                <div class="card-content">
                    <p class="error error hidden">
                    <dl class="dl">
                        <dt class="dt"></dt>
                        <dd class="dd">
                            <span class="toggle">
                                <span class="button"></span>
                            </span>
                            <span class="value">
                            </span>
                        </dd>
                    </dl>
                </div>
        `}doStyle(){this._elements.style=document.createElement("style"),this._elements.style.textContent=`
            .error {
                text-color: red;
            }
            .error.hidden { display: none; }
            .dl {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .dl.hidden { display: none; }
            .dt {
                display: flex;
                align-content: center;
                flex-wrap: wrap;
            }
            .dd {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, auto) minmax(0, 2fr));
                margin: 0;
            }
            .toggle {
                padding: 0.6em;
                border: grey;
                border-radius: 50%;
            }
            .toggle.on { background-color: green; }
            .toggle.off{ background-color: red; }
            .button {
                display: block;
                border: outset 0.2em;
                border-radius: 50%;
                border-color: silver;
                background-color: silver;
                width: 1.4em;
                height: 1.4em;
            }
            .value {
                padding-left: 0.5em;
                display: flex;
                align-content: center;
                flex-wrap: wrap;
            }
        `}doAttach(){this.attachShadow({mode:"open"}),this.shadowRoot.append(this._elements.style,this._elements.card)}doQueryElements(){let e=this._elements.card;this._elements.error=e.querySelector(".error"),this._elements.dl=e.querySelector(".dl"),this._elements.topic=e.querySelector(".dt"),this._elements.toggle=e.querySelector(".toggle"),this._elements.value=e.querySelector(".value")}doListen(){this._elements.dl.addEventListener("click",this.onClicked.bind(this),!1)}doUpdateConfig(){this.getHeader()?this._elements.card.setAttribute("header",this.getHeader()):this._elements.card.removeAttribute("header")}doUpdateHass(){this.getState()?(this._elements.error.textContent="",this._elements.topic.textContent=`${this.getName()} (v${t.version})`,this.isOff()?(this._elements.toggle.classList.remove("on"),this._elements.toggle.classList.add("off")):this.isOn()&&(this._elements.toggle.classList.remove("off"),this._elements.toggle.classList.add("on")),this._elements.value.textContent=this.getState().state,this._elements.error.classList.add("hidden"),this._elements.dl.classList.remove("hidden")):(this._elements.error.textContent=`${this.getEntityID()} is unavailable.`,this._elements.error.classList.remove("hidden"),this._elements.dl.classList.add("hidden"))}doToggle(){this._hass.callService("input_boolean","toggle",{entity_id:this.getEntityID()})}static getConfigElement(){return document.createElement("toggle-with-graphical-configuration-editor")}static getStubConfig(){return{entity:"input_boolean.twgc",header:""}}}customElements.define("toggle-with-graphical-configuration",s),window.customCards=window.customCards||[],window.customCards.push({type:"toggle-with-graphical-configuration",name:"Toggle with graphical configuration (Vanilla JS)",description:"Turn an entity on and off"})})();
//# sourceMappingURL=hacs-test.js.map

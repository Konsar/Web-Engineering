import {LitElement, html, css} from 'https://mkaul.github.io/lit/lib/lit.js';

customElements.define('litmenu-component', class extends LitElement {

    static get properties() { //https://lit-element.polymer-project.org/guide/properties
        return {
            alignment: {type: String}
        }
    };
  
    constructor() {
        super();
        this.alignment = "horizontal"
    }

    static get styles() { //https://lit-element.polymer-project.org/guide/styles
        return css`
            div.menu {
                display: flex;
                justify-content: flex-start;
                flex-flow: no wrap;
            }
            div.menu.vertical {
                flex-flow: column wrap;
            }

            div.menu button {
                margin: 10px;
                width: fit-content;
                border-radius: 10px;
                border-width: 3px;
                background-color: #6B709B;
            }
            div.menu button:hover {
                background-color: #6B709BD0;
                box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.24);
            }
            div.menu button:disabled {
                opacity: 0.75;
            }
            div.menu a{
                padding: 5px 20px 5px 20px;
                color: black;
                font-size: 20px;
                font-weight: bold;
                text-decoration: none;
            }
        `
    }
  
    render() {
        let list = Array.from(this.getElementsByTagName("a"));
        console.log(this);
        console.log(this.getElementsByTagName("a"));
        console.log(this.shadowRoot);
        console.log("-----");
        return html`
            <div class="menu ${this.alignment}">
                ${(list.map(element => html`<button>${element}</button>`))}
            </div>
        `;
    }
});

//Import notwendig um es bei components der Vue zu verwenden
import vueMenu from "./vueMenu.mjs";

export default {
    template: `
        <div style="border: 1px solid black; width: fit-content; height: fit-content;">
            <button :style="this.$attrs.orientation=='vertical' ? {'display': 'block'}:''" style="margin: 5px;">Button 1</button>
            <button :style="this.$attrs.orientation=='vertical' ? {'display': 'block'}:''" style="margin: 5px;">Button 2</button>
            <button :style="this.$attrs.orientation=='vertical' ? {'display': 'block'}:''" style="margin: 5px;">Button 3</button>
        </div>
    `,

    data() {
        return {}
    },

    methods: {
    }
}

//Muss ganz unten stehen, da Komponentn sonst nicht bekannt
//Alternativ andere .mjs, dort Komponenten importieren und neues Vue anlegen
new Vue({
    el: "#app",
    components: {
        vueMenu
    }
});

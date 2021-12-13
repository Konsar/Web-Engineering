//Import notwendig um es bei components der Vue zu verwenden
import vueTextField from "./vueTextField.mjs";

export default {
    template: `
        <div>
            <input @input="update" ref="input">
            <p>Anzahl der Buchstaben: {{letters}}</p>
            <p>Anzahl der Leerzeichen: {{spaces}}</p>
            <p>Anzahl der Wörter: {{words}}</p>
        </div>
    `,

    data () {
        return {
            letters: 0,
            spaces: 0,
            words: 0,
            counter: 0
        }
    },

    methods:{
        update() {
            console.log("Update " + ++this.counter);

            let value = this.$refs.input.value;
            this.letters = value.replace(" ", "").length;
            this.spaces = value.split(" ").length - 1;
            value = value.split(/\s+/);
            this.words = 0;
            for(let i = 0; i < value.length; i++){
                if(value[i] != "") this.words++;
            }
        }
    }
}

//Muss ganz unten stehen, da Komponentn sonst nicht bekannt
//Alternativ andere .mjs, dort Komponenten importieren und neues Vue anlegen
new Vue({
    el: "#app",
    components: {
        vueTextField
    }
});

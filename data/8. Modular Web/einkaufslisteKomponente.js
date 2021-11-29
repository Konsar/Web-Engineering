customElements.define('einkaufsliste-komponente', class extends HTMLElement {
    
    constructor() {
        super();
        this._isInitialized = false;
    }

    connectedCallback(){
        if(this._isInitialized) return;

        let shadow = this.attachShadow({mode: "open"});
        shadow.innerHTML = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Einkaufsliste</title>
                    <style>
                        button.delete {
                            margin-left: 10px;
                        }
                    </style>
            
                    <script src="einkaufsliste.js"></script>
                </head>
                <body onload="add_eventListener()">
                    <h1>Einkaufsliste</h1>
                    <!-- Ja, die unteren Texte sind auf Englisch, da das dies so im bereitgestellten Bild war. -->
                    <p style="display:inline-block">Enter a new item:</p>
                    <input id="item" type="text"> <!-- Type wird nur gesetzt um sicher zu gehen. Ohne Spezifikation ist dies auch vom Typ text. Siehe https://www.w3schools.com/tags/tag_input.asp -->
                    <button id="add_item">Add item</button>
            
                    <!-- ul tag, da eine ungeorndete Liste im bereitgestellen Bild genutzt wurde. Siehe https://www.w3schools.com/html/html_lists.asp -->
                    <ul id="shopping_list"></ul>
                </body>
            </html>
        `;

        //Muss initial ausgeführt werden, da body onload="add_EventListener()" nicht ausgeführt wird
        add_eventListener();

        function add_eventListener(){ //Erzeugt den initialen EventListener für das Hinzufügen von Items
            var btn = shadow.getElementById("add_item");
            btn.addEventListener("click", add_item_to_list);
        }
        
        function add_item_to_list(){ //Fügt items der Liste hinzu
            var input = shadow.getElementById("item");
            if(input.value == "") return; //Wenn input leer, dann abbrechen
        
            var shopping_list = shadow.getElementById("shopping_list");
        
            var item = document.createElement("li"); //Erzeugen eines Items für die Liste
            item.textContent = input.value;
            input.value = "";
        
            var delete_button = document.createElement("button"); //Erzeugen eines Lösch-Buttons
            delete_button.textContent = "Delete";
            delete_button.className = "delete";
            delete_button.addEventListener("click", function(){
                item.remove();
            });
        
            item.appendChild(delete_button); //Lösch-Button als Child des erzeugten Item anhängen
        
            shopping_list.appendChild(item); //Erzeugtes Item an die Liste anfügen
        }
    };
});

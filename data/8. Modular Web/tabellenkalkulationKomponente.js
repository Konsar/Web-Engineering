customElements.define('tabellenkalkulation-komponente', class extends HTMLElement {
    
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
                    <title>Tabellenkalkulation</title>
            
                    <style>
                        table {
                            border-collapse: collapse;
                        }
                        td {
                            border: 1px solid black;
                            width: 100px;
                        }
                        input {
                            border-style: none;
                            width: 100%;
                            padding: 0;
                        }
                        button.adjust_table {
                            width: 25px;
                            height: 25px;
                        }
                    </style>
            
                    <script src="tabellenkalkulation.js"></script>
                </head>
                <body onload="initialize()">
                    <h1>Tabellenkalkulation mit contentEditable</h1>
            
                    <!-- Siehe https://www.w3schools.com/html/html_tables.asp -->
                    <table id="table">
                        <tr>
                            <th></th>
                            <th id="remove_col_cell">
                                <button class="adjust_table" id="remove_col">-</button>
                            </th>
                            <th id="add_col_cell">
                                <button class="adjust_table" id="add_col">+</button>
                            </th>
                        </tr>
                        <tr id="remove_row_cell">
                            <th>
                                <button class="adjust_table" id="remove_row">-</button>
                            </th>
                        </tr>
                        <tr id="add_row_cell">
                            <th>
                                <button class="adjust_table" id="add_row">+</button>
                            </th>
                        </tr>
                    </table>
                </body>
            </html>
        `;
        
        //Variablen zum Nachhalten der Anzahl der Zeilen und Spalten
        var row_amount = 0;
        var col_amount = 0;

        //Muss initial ausgeführt werden, da body onload="add_EventListener()" nicht ausgeführt wird
        initialize();

        function initialize(){ //Zur Initialisierung der Webseite
            add_eventListener();
            for(let i = 0; i < 3; i++){
                add_row();
                add_column();
            }
        }
        
        function add_eventListener(){ //Erzeugt initiale eventListener für + und - Button
            //Column (Spalten) Buttons
            var add_column_button = shadow.getElementById("add_col");
            add_column_button.addEventListener("click", add_column);
            var remove_column_button = shadow.getElementById("remove_col");
            remove_column_button.addEventListener("click", remove_column);
            //Row (Zeilen) Button
            var add_row_button = shadow.getElementById("add_row");
            add_row_button.addEventListener("click", add_row);
            var remove_row_button = shadow.getElementById("remove_row");
            remove_row_button.addEventListener("click", remove_row);
        }
        
        function create_input(){ //Erzeugt einen Input des Typ Text
            var field = document.createElement("input");
            field.type = "text";
            field.setAttribute("formula", "");
            field.addEventListener("focusout", function(){
                if((field.value.toString().startsWith("="))){ //Wenn eine Formel, dann Berechnung starten
                    //alert("Formel gefunden");
                    field.setAttribute("formula", field.value.toString());
                }
                calc();
            });
            field.addEventListener("focusin", function(){
                var formula = field.getAttribute("formula");
                field.setAttribute("formula", "");
                if(formula != "") field.value = formula;
            });
            //field.id = id;
            return field;
        }
        
        function create_cell(id){ //Ezeugt eine Zelle für die ID
            var new_cell = document.createElement("td");
            var field = create_input();
            field.id = id;
            //field.value = id;
            new_cell.appendChild(field);
            return new_cell;
        }
        
        function add_column(){ //Fügt Spalte hinzu
            col_amount = col_amount + 1;
            //alert(cols_amount);
            
            //Erstellen des Buchstaben zur Referenzierung der Zellen
            var header_letter = document.createElement("th");
            header_letter.innerHTML = String.fromCharCode(col_amount + 64);
            //alert(header_letter.innerHTML);
        
            var rows = shadow.getElementById("table").getElementsByTagName("tr"); //Greift alle Zeilen ab
            var remove_column_cell = shadow.getElementById("remove_col_cell"); //Greift die (th) Zelle des Löschen Button ab, da vor diesem eingefügt werden muss.
            rows[0].insertBefore(header_letter, remove_column_cell); //Fügt den Buchstaben vor dem Button ein
        
            //Zeilen auffüllen
            for(let i = 0; i < row_amount; i++){
                var id = String.fromCharCode(col_amount + 64) + (i + 1);
                var new_cell = create_cell(id);
                rows[i+1].appendChild(new_cell);
            }
        
            calc();
        }
        
        function remove_column(){ //Entfernt Spalte
            if(col_amount == 0) return;
            var col_symbol = String.fromCharCode(col_amount + 64);
            col_amount = col_amount - 1;
            //alert(col_amount);
        
            var cells = shadow.getElementById("table").getElementsByTagName("td"); //Greift alle Inhaltszellen ab
            for(let i = 0; i < cells.length; i++){
                children = cells[i].children;
                id = "" + children[0].id
                //alert(id);
                if(id.includes(col_symbol)) cells[i].remove();
            }
        
            var remove_col_cell = shadow.getElementById("remove_col_cell"); //Greift die (tr) Zelle des Löschen Button ab, da vor diesem eingefügt werden muss.
            remove_col_cell.previousSibling.remove(); //Löscht die letzte Zeile
        
            calc();
        }
        
        function add_row(){ //Fügt Zeile hinzu
            row_amount = row_amount + 1;
            //alert(row_amount);
            
            //Erstellen des Nummer zur Referenzierung der Zellen
            var new_row = document.createElement("tr");
            var header_number = document.createElement("th");
            header_number.innerHTML = row_amount;
            new_row.appendChild(header_number);
            //alert(header_number.innerHTML);
        
            //Spalten auffüllen
            for(let i = 0; i < col_amount; i++){
                var id = String.fromCharCode(64 + i + 1) + row_amount;
                var new_cell = create_cell(id);
                new_row.appendChild(new_cell);
            }
        
            var remove_row_cell = shadow.getElementById("remove_row_cell"); //Greift die (tr) Zelle des Löschen Button ab, da vor diesem eingefügt werden muss.
            remove_row_cell.parentElement.insertBefore(new_row, remove_row_cell); //Fügt neue Zeile vor der Zeile des Löschen Button ein
        
            calc();
        }
        
        function remove_row(){ //Enternt Zeile
            if(row_amount == 0) return; //Nichts machen wenn es nichts gibt
            row_amount = row_amount - 1;
            //alert(row_amount);
        
            var remove_row_cell = shadow.getElementById("remove_row_cell"); //Greift die (tr) Zelle des Löschen Button ab, da vor diesem eingefügt werden muss.
            remove_row_cell.previousSibling.remove(); //Löscht die letzte Zeile
        
            calc();
        }
        
        //Kalkulationsfunktion
        function calc(){
            //alert("Calculating stuff");
            var cells = shadow.getElementById("table").getElementsByTagName("input"); //Diesmal nicht die eigentlichen Zellen, sondern deren Input
            for(let i = 0; i < cells.length; i++){ //Durchlaufe alle Zellen
                var formula = cells[i].getAttribute("formula"); //Extrahiere Formel
        
                var regex_sum = /^=SUM\([A-Z]+\d+[\,,\:]\s?[A-Z]+\d+\)/; //RegExp anders festgelegt
                if(regex_sum.test(formula)){
                    let formatted_formula = formula.replace(" ", ""); //Remove any spaces
                    formatted_formula = formatted_formula.replace("=SUM(", ""); //Linke Klammer ( löschen
                    formatted_formula = formatted_formula.replace(")", ""); //Rechte Klammer ) löschen
        
                    if(formatted_formula.includes(",")){ //Wenn ,
                        var ids = formatted_formula.split(",");
                    } else { //Sonst :
                        var ids = formatted_formula.split(":");
                    }
        
                    cells[i].value = sum(ids[0], ids[1]);
                }
            }
        }
        
        //Summenfunktion
        function sum(x, y){
            //alert("SUM");
            var x_split = splitID(x);
            var y_split = splitID(y);
        
            if(x_split[0] > y_split[0]){
                temp = x_split[0];
                x_split[0] = y_split[0];
                y_split[0] = temp;
            }
            if(x_split[1] > y_split[1]){
                temp = x_split[1];
                x_split[1] = y_split[1];
                y_split[1] = temp;
            }
            //Konvertieren in Integer
            x_split[0] = x_split[0].charCodeAt(0);
            y_split[0] = y_split[0].charCodeAt(0);
            x_split[1] = Number.parseInt(x_split[1]);
            y_split[1] = Number.parseInt(y_split[1]);
        
            //Wenn außerhalb der Zellen
            if(x_split[0] < 64 || y_split[0] - 64 > col_amount) return "Error: OoB (Columns)";
            else if(x_split[1] < 1 || y_split[1] > row_amount) return "Error: OoB (Rows)";
        
            //Aufaddieren
            var sum = 0;
            for(let i = x_split[0]; i <= y_split[0]; i++){
                let letter = String.fromCharCode(i);
                for(let j = x_split[1]; j <= y_split[1]; j++){
                    let id = letter + j;
                    let cell = shadow.getElementById(id);
                    //Wenn leer, zähl als 0
                    let val = 0;
                    if(cell.value != "") val = Number.parseInt(cell.value);
        
                    sum += val;
                }
            }
            //alert(sum);
            return sum;
        }
        
        function splitID(id){
            var id_alphabetic = "";
            var id_numeric = "";
            for(let i = 0; i < id.length; i++){
                if(Number.isInteger(Number.parseInt(id[i]))){
                    id_alphabetic = id.substring(0, i);
                    id_numeric = id.substring(i);
                    break;
                }
            }
            //alert(id_alphabetic + " : " + id_numeric);
        
            return [id_alphabetic, id_numeric];
        }        
    };
});

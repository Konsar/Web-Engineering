function initialize(){ //Zur Initialisierung der Webseite
    add_eventListener();
    for(i = 0; i < 3; i++){
        add_row();
        add_column();
    }
}

function add_eventListener(){ //Erzeugt initiale eventListener für + und - Button
    //Column (Spalten) Buttons
    var add_column_button = document.getElementById("add_col");
    add_column_button.addEventListener("click", add_column);
    var remove_column_button = document.getElementById("remove_col");
    remove_column_button.addEventListener("click", remove_column);
    //Row (Zeilen) Button
    var add_row_button = document.getElementById("add_row");
    add_row_button.addEventListener("click", add_row);
    var remove_row_button = document.getElementById("remove_row");
    remove_row_button.addEventListener("click", remove_row);
}

var row_amount = 0;
var col_amount = 0;

/*          GEDANKENSEKTION
    IDs für die Zellen vergeben?
        ->  An Excel angelehnt: Spalten - Buchstaben; Zeilen - Zahlen

    Zellen schreibbar machen
        ->  Input des Typ Text in die Zelle stecken

    Code auswerten bei verlassen des Focus
        ->  EventListener (FocusOut?) für Inputs

    Wenn mit = startet, dann Code auswerten
    Hinterlegte Formel muss dennoch nachgehalten werden
        ->  Als Attribute hinterlegen

    Bei Klick in eine Zelle mit Formel, formel anzeigen
        -> EventListener (FocusIn?) für Inputs
*/

function create_input(){ //Erzeugt einen Input des Typ Text
    var field = document.createElement("input");
    field.type = "text";
    field.setAttribute("formula", "");
    field.addEventListener("focusout", function(){
        if((field.value.toString().startsWith("="))){ //Wenn eine Formel, dann Berechnung starten
            //alert("Formel gefunden");
            field.setAttribute("formula", field.value.toString());
            calc();
        }
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
    field.value = id;
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

    var rows = document.getElementsByTagName("tr"); //Greift alle Zeilen ab
    var remove_column_cell = document.getElementById("remove_col_cell"); //Greift die (th) Zelle des Löschen Button ab, da vor diesem eingefügt werden muss.
    rows[0].insertBefore(header_letter, remove_column_cell); //Fügt den Buchstaben vor dem Button ein

    //Zeilen auffüllen
    for(i = 0; i < row_amount; i++){
        var id = String.fromCharCode(col_amount + 64) + (i + 1);
        var new_cell = create_cell(id);
        rows[i+1].appendChild(new_cell);
    }
}

function remove_column(){ //Entfernt Spalte
    if(col_amount == 0) return;
    var col_symbol = String.fromCharCode(col_amount + 64);
    col_amount = col_amount - 1;
    //alert(col_amount);

    var cells = document.getElementsByTagName("td"); //Greift alle Inhaltszellen ab
    for(i = 0; i < cells.length; i++){
        children = cells[i].children;
        id = "" + children[0].id
        //alert(id);
        if(id.includes(col_symbol)) cells[i].remove();
    }

    var remove_col_cell = document.getElementById("remove_col_cell"); //Greift die (tr) Zelle des Löschen Button ab, da vor diesem eingefügt werden muss.
    remove_col_cell.previousSibling.remove(); //Löscht die letzte Zeile
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
    for(i = 0; i < col_amount; i++){
        var id = String.fromCharCode(64 + i + 1) + row_amount;
        var new_cell = create_cell(id);
        new_row.appendChild(new_cell);
    }

    var remove_row_cell = document.getElementById("remove_row_cell"); //Greift die (tr) Zelle des Löschen Button ab, da vor diesem eingefügt werden muss.
    remove_row_cell.parentElement.insertBefore(new_row, remove_row_cell); //Fügt neue Zeile vor der Zeile des Löschen Button ein
}

function remove_row(){ //Enternt Zeile
    if(row_amount == 0) return; //Nichts machen wenn es nichts gibt
    row_amount = row_amount - 1;
    //alert(row_amount);

    var remove_row_cell = document.getElementById("remove_row_cell"); //Greift die (tr) Zelle des Löschen Button ab, da vor diesem eingefügt werden muss.
    remove_row_cell.previousSibling.remove(); //Löscht die letzte Zeile

    //Calc aufrufen, für den Fall, dass eine referenzierte Zelle gelöscht wurde?
}

function calc(){
    alert("Calculating stuff");
}

function add_eventListener(){ //Erzeugt den initialen EventListener für das Hinzufügen von Items
    btn = document.getElementById("add_item");
    btn.addEventListener("click", add_item_to_list);
}

function add_item_to_list(){ //Fügt items der Liste hinzu
    input = document.getElementById("item");
    if(input.value == "") return; //Wenn input leer, dann abbrechen

    shopping_list = document.getElementById("shopping_list");

    var item = document.createElement("li"); //Erzeugen eines Items für die Liste
    item.innerHTML = input.value;
    input.value = "";

    delete_button = document.createElement("button"); //Erzeugen eines Lösch-Buttons
    delete_button.innerHTML = "Delete";
    delete_button.className = "delete";
    delete_button.addEventListener("click", function(){
        item.remove();
    });

    item.appendChild(delete_button); //Lösch-Button als Child des erzeugten Item anhängen

    shopping_list.appendChild(item); //Erzeugtes Item an die Liste anfügen
}

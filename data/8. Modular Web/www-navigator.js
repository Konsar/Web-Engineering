var data = "";

async function initialize(){
    await load();
    load_main_menu();
    let search_params = new URLSearchParams(window.location.search);
    let params = [search_params.get("m"), search_params.get("s")];
    console.log("URL params found: " + params);
    if(params[0] != null){ //Wenn ein Hauptpunkt gedrückt wurde, erstelle Sidebar
        load_sidebar(params[0]);
    }
    if(params[0] != null && params[1] != null){ //Wenn ein Hauptpunt UND ein Unterpunkt gedrückt wurde, lade Inhalt
        load_content(params[0], params[1]);
    }
}

async function load(){ //Lädt www-navigator.json in Variable data
    console.log("Loading json-file")
    await fetch("www-navigator.json")
                    .then(response => response.text()
                    .then(function(text) {
                        data = JSON.parse(text);
                    })
                )
}

function load_main_menu(){ //Lädt Hauptmenü
    console.log("Creating buttons of main-menu")
    let main_keys = Object.keys(data);
    let mainmenu = document.getElementById("mainmenu");
    for(let i = 0; i < main_keys.length; i++){
        let menu_link = document.createElement("a");
        menu_link.innerHTML = main_keys[i];
        menu_link.id = main_keys[i];
        menu_link.setAttribute("href", "?m=" + main_keys[i]);
        mainmenu.appendChild(menu_link);
    }
    mainmenu.requestUpdate();
}

function load_sidebar(m){ //Lädt Untermenü
    console.log("Creating buttons of sidebar for: " + m);
    let side_keys = Object.keys(data[m]);
    let sidemenu = document.getElementById("sidemenu");
    for(let i = 0; i < side_keys.length; i++){
        let side_link = document.createElement("a");
        side_link.innerHTML = side_keys[i];
        side_link.id = side_keys[i];
        side_link.setAttribute("href", "?m=" + m + "&s=" + side_keys[i]);
        sidemenu.appendChild(side_link);
    }
    sidemenu.requestUpdate();
}

function load_content(m, s){ //Lädt Context (Content + References)
    console.log("Loading context for: " + m + " & " + s);
    let content = document.getElementById("content");
    let references = document.getElementById("references");

    console.log("Loading content for: " + m + " & " + s);
    let context_data = data[m][s];
    content.innerHTML = context_data["content"];

    console.log("Loading references for: " + m + " & " + s);
    let references_data = context_data["references"];
    let refrences_output = "";
    for(let i = 0; i < references_data.length; i++){
        refrences_output += "<br><a href=" + references_data[i] + ">" + references_data[i] + "</a>";
    }
    references.innerHTML = "Weitere Informationen:" + refrences_output;
}

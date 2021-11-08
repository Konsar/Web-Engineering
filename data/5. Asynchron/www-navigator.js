var data = "";
const base_url = location.protocol + "//" + location.host + location.pathname;

async function initialize(){
    await load();
    load_main_menu();
    let search_params = new URLSearchParams(window.location.search);
    let params = [search_params.get("m"), search_params.get("s")];
    console.log("URL params found: " + params);
    if(params[0] != null){ //Wenn ein Hauptpunkt gedrückt wurde, erstelle Sidebar
        document.getElementById(params[0]).style.background="grey";
        load_sidebar(params[0]);
    }
    if(params[0] != null && params[1] != null){ //Wenn ein Hauptpunt UND ein Unterpunkt gedrückt wurde, lade Inhalt
        document.getElementById(params[1]).style.background="grey";
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
    let menu = document.getElementById("menu");
    for(let i = 0; i < main_keys.length; i++){
        let menu_button = document.createElement("button");
        menu_button.innerHTML = main_keys[i];
        menu_button.id = main_keys[i];
        menu_button.addEventListener("click", function(){
            location.href = base_url + "?m=" + main_keys[i];
        });

        menu.appendChild(menu_button);
    }
}

function load_sidebar(m){ //Lädt Untermenü
    console.log("Creating buttons of sidebar for: " + m);
    let sub_keys = Object.keys(data[m]);
    let sidebar = document.getElementById("sidebar");
    for(let i = 0; i < sub_keys.length; i++){
        let sidebar_button = document.createElement("button");
        sidebar_button.innerHTML = sub_keys[i];
        sidebar_button.id = sub_keys[i];
        sidebar_button.addEventListener("click", function(){
            location.href = base_url + "?m=" + m + "&s=" + sub_keys[i];
        });
        let div = document.createElement("div");
        div.appendChild(sidebar_button);
        sidebar.appendChild(div);
    }
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

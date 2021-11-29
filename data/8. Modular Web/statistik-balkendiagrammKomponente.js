customElements.define('statistik-balkendiagramm-komponente', class extends HTMLElement {
    
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
                    <title>Statistik-Balkendiagramm</title>
                    <style>
                        svg{
                            width:45%;
                        }
                    </style>
                </head>
                <body>
                    <h1>Sitzverteilung des 20. Bundestages</h1>
                    <svg viewbox="0 0 300 350" id="svg"></svg>
                </body>
            </html>    
        `;
            
        fetch("sitzverteilung.json")
                .then(response => response.text()
                .then(function(text) {
                    visualize(JSON.parse(text));
                })
            )

        function visualize(data){
            console.log(data);
            let svg = shadow.getElementById("svg");

            for(let i = 0; i < Object.keys(data).length - 1; i++){
                let fraktion = document.createElementNS("http://www.w3.org/2000/svg", "text");
                fraktion.setAttribute("x", 0); //Text ganz links
                fraktion.setAttribute("y", (300/data.length - 1)*i + 12); //Höhe mit Offset um es zu "zentrieren"
                fraktion.style = "font-size: 5px";
                fraktion.innerHTML = data[i]["fraktion"]; //Fraktionsname

                let balken = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                balken.setAttribute("x", 50); //Rechts einrücken, damit links Platz für den Fraktionsnamen ist
                balken.setAttribute("y", (300/data.length - 1)*i); //Höhewert / Verteilen der Fraktionen
                balken.setAttribute("height", (150/Object.keys(data).length)); //Dicke des Rechtecks
                balken.setAttribute("width", (data[i]["sitze"]/data.at(-1)["gesamt"])*300); //Breite des Rechtecks
                balken.setAttribute("fill", data[i]["farbe"]); //Farbe des Rechtecks

                let sitze = document.createElementNS("http://www.w3.org/2000/svg", "text");
                sitze.setAttribute("x", (data[i]["sitze"]/data.at(-1)["gesamt"])*300 + 55); //Hinter das Rechteck
                sitze.setAttribute("y", (300/data.length - 1)*i + 12); //Höhe mit Offset
                sitze.style = "font-size: 5px";
                sitze.innerHTML = data[i]["sitze"]; //Anzahl der Sitze

                svg.appendChild(fraktion);
                svg.appendChild(balken);
                svg.appendChild(sitze);
            }
        }
    };
});

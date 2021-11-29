customElements.define('kalligraphie-editor-komponente', class extends HTMLElement {
    
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
                    <title>Kalligraphie-Editor</title>
                    <style>
                        svg{
                            width:45%;
                            border: 1px solid black;
                        }
                    </style>
                </head>
                <body>
                    <h1>Kalligraphie-Editor</h1>
                    <svg viewbox="0 0 1000 1000" id="svg"></svg>
                </body>
            </html>                  
        `;
            
        const svg = shadow.getElementById("svg"); //SVG Element
        var point = svg.createSVGPoint(); //Punkt für spätere Berechnungen
        var prev = null; //Referenz für spätere Pfade
        
        function cursorPoint(evt){ //Quelle: https://stackoverflow.com/questions/10298658/mouse-position-inside-autoscaled-svg
            point.x = evt.clientX;
            point.y = evt.clientY;
            return point.matrixTransform(svg.getScreenCTM().inverse());
        }

        function setup(){
            svg.addEventListener("mousedown", startDrag);
            svg.addEventListener("mousemove", drag);
            svg.addEventListener("mouseup", endDrag);
            svg.addEventListener("mouseleave", endDrag);
        }

        function startDrag(evt){
            let coords = cursorPoint(evt);
            console.log(coords);

            prev = coords;
        }

        function drag(evt){
            if(prev == null) return;
            let coords = cursorPoint(evt);
            console.log(coords);

            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("fill", "none"); //Keine Fläche
            path.setAttribute("stroke", "black"); //Farbe auf Schwarz
            path.setAttribute("stroke-width", "3px");
            path.setAttribute("d", "M " + prev.x + "," + prev.y + " L" + coords.x + "," + coords.y);
            svg.append(path);

            prev = coords;
        }

        function endDrag(){
            prev = null;
        }

        setup();
    };
});

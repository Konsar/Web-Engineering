customElements.define('bezier-animation-komponente', class extends HTMLElement {
    
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
                    <title>Bezier-Animation</title>
                    <style>
                        svg{
                            width:45%;
                            border: 1px solid black;
                        }
                        .draggable{
                            cursor: move;
                        }
                    </style>
                </head>
                <body>
                    <h1>Bezier-Animation</h1>
                    <svg viewbox="0 0 1000 1000" id="svg">
                        <path fill="none" stroke="black" id="curve"/>
                        <circle cx="100" cy="100" r="10" fill="red" class="draggable" id="cc"></circle> <!-- Control point / circle -->
                        <circle cx="100" cy="900" r="10" fill="blue" class="draggable" id="cb"></circle> <!-- Start point -->
                        <circle cx="900" cy="100" r="10" fill="green" class="draggable" id="cg"></circle> <!-- End point -->
                    </svg>
                </body>
            </html>          
        `;
            
        makeDraggable(shadow.getElementById("cc"));
        makeDraggable(shadow.getElementById("cb"));
        makeDraggable(shadow.getElementById("cg"));
        
        var selectedElement, offset;

        function makeDraggable(elem){
            elem.addEventListener('mousedown', startDrag);
            elem.addEventListener('mousemove', drag);
            elem.addEventListener('mouseup', endDrag);
            elem.addEventListener('mouseleave', endDrag);
        }

        function startDrag(evt) {
            if (evt.target.classList.contains('draggable')) {
                selectedElement = evt.target;
                offset = getMousePosition(evt);
                offset.x -= parseFloat(selectedElement.getAttribute("cx"));
                offset.y -= parseFloat(selectedElement.getAttribute("cy"));
            }
        }

        function drag(evt) {
            if (selectedElement) {
                evt.preventDefault();
                var coord = getMousePosition(evt);
                selectedElement.setAttribute("cx", coord.x - offset.x);
                selectedElement.setAttribute("cy", coord.y - offset.y);
                updateCurve(); //Update Kurve
            }
        }

        function endDrag(evt) {
            selectedElement = null;
        }

        function getMousePosition(evt) {
            const CTM = shadow.getElementById("svg").getScreenCTM();
            return {
                x: (evt.clientX - CTM.e) / CTM.a,
                y: (evt.clientY - CTM.f) / CTM.d
            };
        }

        const cc = shadow.getElementById("cc");
        const cb = shadow.getElementById("cb");
        const cg = shadow.getElementById("cg");
        const curve = shadow.getElementById("curve");
        
        function updateCurve(){
            let cc_xy = parseFloat(cc.getAttribute("cx")) + "," + parseFloat(cc.getAttribute("cy"));
            let cb_xy = parseFloat(cb.getAttribute("cx")) + "," + parseFloat(cb.getAttribute("cy"));
            let cg_xy = parseFloat(cg.getAttribute("cx")) + "," + parseFloat(cg.getAttribute("cy"));

            let path = "M" + cb_xy + " L" + cc_xy + " L" + cg_xy + " S" + cc_xy + " " + cb_xy;

            curve.setAttribute("d", path);
        }

        updateCurve();
    };
});

customElements.define('rednerliste-komponente', class extends HTMLElement {
    
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
                    <title>Rednerliste</title>
                    <style>
                        button.delete, button.timer, p.counter {
                            margin-left: 10px;
                        }
                    </style>
            
                    <script src="rednerliste.js"></script>
                </head>
                <body onload="add_eventListener()">
                    <h1>Rednerliste</h1>
                    
                    <p style="display:inline-block">Neuer Redner:</p>
                    <input id="orator" type="text"> <!-- Type wird nur gesetzt um sicher zu gehen. Ohne Spezifikation ist dies auch vom Typ text. Siehe https://www.w3schools.com/tags/tag_input.asp -->
                    <button id="add_orator">Hinzufügen</button>
            
                    <!-- ul tag, da eine ungeorndete Liste im bereitgestellen Bild genutzt wurde. Siehe https://www.w3schools.com/html/html_lists.asp -->
                    <ul id="orator_list">
                    </ul>
                </body>
            </html>
        `;

        //Muss initial ausgeführt werden, da body onload="add_EventListener()" nicht ausgeführt wird
        add_eventListener();

        function add_eventListener(){ //Erzeugt initialen eventListener für das Hinzufügen der Redner
            var btn = shadow.getElementById("add_orator");
            btn.addEventListener("click", add_orator_to_list);
        }
        
        function add_orator_to_list(){
            var input = shadow.getElementById("orator");
            if(input.value == "") return; //Wenn kein Inhalt, dann abbrechen
            
            stop_all_timer(); //Laufenden Timer stoppen
        
            //Erzeugen der benötigten Objekte
            var orator = create_orator(input);
            var delete_button = create_delete_button(orator);
            var counter = create_counter();
            var timer = create_timer(counter);
            var timer_button = create_timer_button(timer);
        
            all_timer.push([timer, timer_button]); //Fügt Timer und TimerButton dem Array hinzu
        
            //Ausgabe- bzw. Interaktionsobjekte als Child des erzeugten Redners anfügen
            orator.appendChild(counter);
            orator.appendChild(timer_button);
            orator.appendChild(delete_button);
        
            var orator_list = shadow.getElementById("orator_list");
            orator_list.appendChild(orator); //Redner der Liste anfügen
        
            timer_button.click(); //Neu erzeugten Timer starten via Klick des zugehörigen TimerButton; Siehe https://www.w3schools.com/jsref/met_html_click.asp
        }
        
        function create_orator(input){ //Erzeugt li-Tag für die Liste
            var orator = document.createElement("li");
            orator.innerHTML = input.value;
            input.value = "";
        
            return orator;
        }
        
        function create_delete_button(orator){ //Erzeugt Button zum Löschen des Redners
            var delete_button = document.createElement("button");
            delete_button.innerHTML = "Löschen";
            delete_button.className = "delete";
            delete_button.addEventListener("click", function(){
                orator.remove();
            });
        
            return delete_button;
        }
        
        function create_counter(){ //Erschaffen für die Ausgabe des aktuellen Timer-Standes. Eigentlich einfach nur ein p-tag
            var counter = document.createElement("p");
            counter.innerHTML = format_time(0);
            counter.className = "counter";
            counter.style.display = "inline";
        
            return counter;
        }
        
        function create_timer(counter){ //Timer-Funktion; Siehe https://www.w3schools.com/js/js_timing.asp
            var running = false;
            var sec = 0;
            var interval = null;
            return{
                start:function(){
                    stop_all_timer();
                    running = true;
                    interval = setInterval(function(){ //Erhöht jede Sekunde den Sekundenzähler um 1
                        sec++;
                        counter.innerHTML = format_time(sec);
                    }, 1000);
                },
                stop:function(){
                    running = false;
                    clearInterval(interval); //Hält das Hochzählen an
                },
                isRunning(){
                    return running;
                }
            }
        }
        
        function create_timer_button(timer){ //Erzeugt TimerButton zum Starten bzw. Stoppen der Redezeit
            var timer_button = document.createElement("button");
            timer_button.innerHTML = "Start!";
            timer_button.className = "timer";
            timer_button.addEventListener("click", function(){
                if(timer.isRunning()){
                    timer.stop();
                    timer_button.innerHTML = "Start!"
                } else { //Zähler läuft nicht
                    timer.start();
                    timer_button.innerHTML = "Stop!";
                }
            });
        
            return timer_button;
        }
        
        function format_time(sec){ //Nice to have - Formatiert Sekunden in das erwartete Format um
            return new Date(sec * 1000).toISOString().substr(11,8);
        }
        
        var all_timer = [];
        
        function stop_all_timer(){ //Stopt alle Timer indem es den TimerButton des laufenden Timers klickt
            for(let i = 0; i < all_timer.length; i++){
                if(all_timer[i][0].isRunning()){
                    all_timer[i][1].click();
                }
            }
        }        
    };
});

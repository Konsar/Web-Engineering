const fs = require("fs"); //Lädt FileSystem https://nodejs.org/api/fs.html

let maxValue = process.argv[2];  //process.argv = ['node', 'yourscript.js', ...]
maxValue = maxValue.replace("_", ""); //String bereinigen von Underscores
maxValue = parseInt(maxValue);

function alpha(n){ //Funktion zum Bestimmen des Strings (26 = Z; 27 = AA)
    let out = "";
    while(n >= 0){
        out = String.fromCharCode(n%26 + 65) + out;
        n = Math.floor(n/26) - 1;
    }
    return out;
}

let text = "";
for(let i = 0; i < maxValue; i++){
    text += alpha(i) + "\n";
}

fs.writeFileSync("./alpha_file_" + maxValue + ".txt", text); //writeFileSync zum snchronen schreiben statt writeFile

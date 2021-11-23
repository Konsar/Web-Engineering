const fs = require("fs"); //Lädt FileSystem https://nodejs.org/api/fs.html

let maxValue = process.argv[2];  //process.argv = ['node', 'yourscript.js', ...]
maxValue = maxValue.replace("_", ""); //String bereinigen von Underscores
maxValue = parseInt(maxValue);

let text = "";
for (let i = 1; i <= maxValue; i++){ //Text für die Datei schreiben
    text += i + ".\n";
}

fs.writeFileSync("./number_file_" + maxValue + ".txt", text); //writeFileSync zum snchronen schreiben statt writeFile

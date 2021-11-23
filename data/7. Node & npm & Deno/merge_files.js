const fs = require("fs"); //Lädt FileSystem https://nodejs.org/api/fs.html

console.time("timer");
let file1_lines = [];
let file2_lines = [];
let merged_lines = [];

fs.readFile(process.argv[2], "utf8", function read(err, data){ //https://nodejs.dev/learn/reading-files-with-nodejs
    if(err){
        console.error(err);
        return;
    }
    file1_lines.push(data.split("\n"));
    merge();
});

fs.readFile(process.argv[3], "utf8", function read(err, data){ //https://nodejs.dev/learn/reading-files-with-nodejs
    if(err){
        console.error(err);
        return;
    }
    file2_lines.push(data.split("\n"));
    merge();
});

function merge(){
    if(file1_lines.length > 0 && file2_lines.length > 0){
        file1_lines[0].forEach((elem1, index) => {
        merged_lines.push(elem1 + file2_lines[0][index]);
        });

        fs.writeFileSync("./merge_files.txt", merged_lines.join("\n"));
        console.timeEnd("timer");
    }
}

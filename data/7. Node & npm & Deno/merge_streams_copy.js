const fs = require("fs"); //Lädt FileSystem https://nodejs.org/api/fs.html

console.time("timer");
let file1 = [];
let file2 = [];

let stream1 = fs.createReadStream(process.argv[2], "utf8");
let stream2 = fs.createReadStream(process.argv[3], "utf8");

stream1.on("data", chunk => {
    file1 = file1.concat(chunk.split("\n"));
});
stream2.on("data", chunk => {
    file2 = file2.concat(chunk.split("\n"));
});

stream1.on("end", out);
stream2.on("end", out);

let toggle = false;
let merged = [];
function out(){
    if(toggle){
        file1.forEach((elem1, index) => {
            merged.push(elem1 + file2[index]);
        });

        fs.writeFileSync("merge_streams.txt", merged.join("\n"));
        console.timeEnd("timer");
    } else {
        toggle = true;
    }
}

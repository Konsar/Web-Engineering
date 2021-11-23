const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');

var app = express();
app.use(fileUpload());

app.get('/', function(req, res){
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Merge-Service</title>
            </head>
            <body>
                <h1>Merge-Service</h1>
                <div>
                    <form action='/post/' method='post' enctype="multipart/form-data">
                    <input name="datei1" type="file"/>
                    <input name="datei2" type="file"/>
                    <input type="submit" value="senden"/>
                    </form>
                </div>
            </body>
        </html>
  `)
});

app.post ('/post', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let file1 = req.files.datei1.data.toString().split("\n");
    let file2 = req.files.datei2.data.toString().split("\n");
    let merged = [];
    function merge(){
        if(file1.length > 0 && file2.length > 0){
            file1.forEach((elem1, index) => {
                merged.push(elem1 + file2[index]);
            });
            
        fs.writeFileSync("./merge_files.txt", merged.join("\n"));
        }
    }
    merge();

    res.download("merge_files.txt");
});

app.listen(3000,function() {});

const fs = require("fs");
const path = require("path");
const express = require("express");

const port = 3000;
const localDir = "C:/Users/manal/Downloads";

function runApp() {
    // method to run app
    console.log("Node Js application is running @ PORT: ", port);
}

function getIndexPage(req, response) {
    // Index page 
    response.send("<b>Hello World !This is the index page</b>");
}

function getList(req, response) {
    // method to get list of files

    function readFiles(err, files) {
        // method to get files in the directory
        if (err) 
            throw err;
        
        console.log(files);
        let resText = "<ul style='list-style-type: None; font-weight: bold'>";
        files.forEach((file) => {
            let fileFormat = path.extname(localDir + "/" + file);
            resText += "<li>";
            switch (fileFormat.toLowerCase()) {
                case "": resText += "<img src='images/folder.png' width='30' height='30'/>   ";
                    break;
                case ".png":
                case ".jpg":
                case ".jpeg": resText += "<img src='images/image.png' width='30' height='30'/>   ";
                    break;
                case ".docx":
                case ".doc": resText += "<img src='images/Downloads/word.png' width='30' height='30'/>   ";
                    break;
                case ".txt":
                case ".text": resText += "<img src='images/notepad.png' width='30' height='30'/>   ";
                    break;
                case ".iso":
                case ".img": resText += "<img src='images/iso.png' width='30' height='30'/>   ";
                    break;
                case ".zip": resText += "<img src='images/zip.png' width='30' height='30'/>   ";
                    break;
                case ".rar": resText += "<img src='images/rar.png' width='30' height='30'/>   ";
                    break;
                case ".xls":
                case ".csv": resText += "<img src='images/xls.png' width='30' height='30'/>   ";
                    break;
                case ".mp4":
                case ".avi": resText += "<img src='images/mp4.png' width='30' height='30'/>   ";
                    break;
                case ".mp3":
                case ".wav": resText += "<img src='images/mp3.png' width='30' height='30'/>   ";
                    break;
                case ".exe": resText += "<img src='images/exe.png' width='30' height='30'/>   ";
                    break;
                case ".json": resText += "<img src='images/json.png' width='30' height='30'/>   ";
                    break;
                case ".msi": resText += "<img src='images/msi.png' width='30' height='30'/>   ";
                    break;
                default: resText += "<img src='images/default.png' width='30' height='30'/>   ";
                    break;
            }
            resText += file + "</li>";
        });
        resText += "</ul>";
        // resText += "<img src='images/folder.png' />";
        response.send(resText);
    }
    fs.readdir(localDir, readFiles);
}


function createFile(req, response)
{
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate() +
               "-" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(date);
  fs.writeFileSync( date + ".txt", date, { flag: 'wx' }, (err) => {
        if (err) {
            console.log("---",err);
            response.status(500).json({result: false, message: "Internal server error"});
            
            throw err;
            return;
        }
    });
    
    //console.log(localDir + "/" + date + ".txt")
    response.send("File written Successfully !")

}


app = express();
app.listen(port, runApp);

// Added static file hosting
app.use("/images", express.static(path.join(__dirname, "images")));

// API routing
app.get("/", getIndexPage);
app.get("/list", getList);
app.get("/createFile", createFile);

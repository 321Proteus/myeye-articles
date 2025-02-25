import express from "express";
import fs from "fs";
import AdmZip from "adm-zip";
import path from "path";
const app = express();

function getPath(id) {
    return "./db/" + id
}

function getHeader(id) {

    const exts = ["jpg", "png", "jpeg", "gif", "webp"]

    for (const ext of exts) { 
        const fpath = path.resolve(getPath(id)) + "/img01." + ext;
        if (fs.existsSync(fpath)) return fpath;
    }

    return null

}

function getArticle(id) {

    const dbPath = getPath(id);

    if (!fs.existsSync(dbPath)) return;

    const zip = new AdmZip();
    zip.addLocalFolder(dbPath);
    console.log(`Spakowano id ${id} z ${zip.getEntryCount()} plikami`);

    const entries = zip.getEntries()
    for (const entry of entries) {
        console.log(entry.name);
    }

    return zip.toBuffer();

}

app.get("/list/:t", (req, res) => {
    console.log(req.params.t);
    const t = parseInt(req.params.t).toString(2).padEnd(64, '0');

    var output = ""
    console.log(t)

    for (var i=1;i<t.length;i++) {
        if (t[i] === '0' && fs.existsSync(getPath(i-1))) {
            output += i-1 + " ";
        }
    }

    res.status(200).send(output);
})

app.get("/header/:id", (req, res) => {

    const filePath = getHeader(req.params.id);
    if (!fs.existsSync(filePath)) {
        res.status(404).send("Nie ma takiego artykulu");
        return;
    }

    res.status(200).sendFile(filePath);

})

app.get("/:id", (req, res) => {

    const id = req.params.id;

    const zipped = getArticle(id);

    if (!zipped) {
        return res.status(404).send("Nie ma takiego artykulu");
    }

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename=${id}.zip`);

    res.status(200).send(zipped);

})

app.get("/article/:id", (req, res) => {
    
    const filePath = getPath(req.params.id) + "/article.txt";
    if (!fs.existsSync(filePath)) {
        res.status(404).send("Nie ma takiego artykulu");
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send(err.syscall);
            return;
        }

        const text = data.toString();

        res.status(200).send(text.toString());
    })

})

app.get("/", (req, res) => {
    console.log("Got request")
    res.status(200).send(":)");
})

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log("port " + port) });
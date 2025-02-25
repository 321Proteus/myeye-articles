import express from "express";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { fileURLToPath } from "url";
const app = express();

function getPath(id) {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), "../db/" + id)
    console.log(__dirname)
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

    const filePath = getPath(req.params.id) + "/img01.jpg";
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

app.listen(process.env.PORT || 3000, () => { console.log("port 2137") });
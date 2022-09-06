const { request } = require('express');
const express = require('express');
const DataStore = require('nedb');
require('dotenv').config();
const app = express();

app.listen(process.env.PORT, ()=>console.log("port 3000"));
app.use(express.static('public'));
app.use(express.json({ limit : "1mb" }));

const database = new DataStore('database.db');
database.loadDatabase();

app.get("/api", (req, res) => {
    database.find({}, (err, docs) => {
        console.log("data requested!!");
        res.json(docs);
    });
});

app.post("/api", (req, res) => {
    console.log("inserted");
    const timestamp = Date.now();
    req.body.timestamp = timestamp;
    res.json(req.body);
    database.insert(req.body);
});


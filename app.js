const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));

const spiceRack = [
    {
        id: 1,
        name: "cardamom",
        grams: 45,
    },
    {
        id: 2,
        name: "pimentón",
        grams: 20,
    },
    {
        id: 3,
        name: "cumin",
        grams: 450,
    },
    {
        id: 4,
        name: "sichuan peppercorns",
        grams: 107,
    },
];

let nextSpiceId = 5;

app.use(bodyParser.json());

// Add your code here:

app.get("/spices", (req, res, next) => {
    res.send(spiceRack);
});

app.post("/spices", (req, res, next) => {
    const newSpice = req.body.spice;
    if (newSpice.name && newSpice.grams) {
        newSpice.id = nextSpiceId++;
        spiceRack.push(newSpice);
        res.send(newSpice);
    } else {
        res.status(400).send();
    }
});

app.get("/spices/:spiceId", (req, res, next) => {
    const spiceId = Number(req.params.id);
    const spiceIndex = spiceRack.findIndex((spice) => spice.id === spiceId);
    if (spiceIndex !== -1) {
        res.send(spiceRack[spiceIndex]);
    } else {
        res.status(404).send("Spice not found.");
    }
});

app.put("/spices/:spiceId", (req, res, next) => {
    const spiceId = Number(req.params.id);
    const spiceIndex = spiceRack.findIndex((spice) => spice.id === spiceId);
    if (spiceIndex !== -1) {
        spiceRack[spiceIndex] = req.body.spice;
        res.send(spiceRack[spiceIndex]);
    } else {
        res.status(404).send("Spice not found.");
    }
});

app.delete("/spices/:spiceId", (req, res, next) => {
    const spiceId = Number(req.params.id);
    const spiceIndex = spiceRack.findIndex((spice) => spice.id === spiceId);
    if (spiceIndex !== -1) {
        spiceRack.splice(spiceIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send("Spice not found.");
    }
});

// export app for use in main.js and for testing
module.exports = {
    app,
};

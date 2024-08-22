const express = require("express");
const app = express();
app.use(express.json());

const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "backend-agosto-24";
const client = new MongoClient(url);

async function main() {
    await client.connect();
    console.info("Connected to the database");
    const db = client.db(dbName);
    const collection = db.collection("herois");
    
    app.get("/herois", async function (req, res) {
        const herois = await collection.find().toArray();
        res.send(herois);
    });

    app.post("/herois", async function (req, res) {
        const novoHeroi = req.body;
        await collection.insertOne(novoHeroi);
        res.send("Heroi criado com sucesso!");
    });

    app.get("/herois/:id", async function (req, res) {
        const id = req.params.id;
        const heroi = await collection.findOne(
            {_id: new ObjectId(id)});
        res.send(heroi)
    })

    app.put("/herois/:id", async function (req, res) {
        const id = req.params.id;
        const novoNome = req.body;
        await collection.updateOne(
            {_id: new ObjectId(id)}, 
            {$set: novoNome})
        res.send("Heroi alterado com sucesso!");
    })

    app.delete("/herois/:id", async function (req, res) {
        const id = req.params.id;
        await collection.deleteOne(
            {_id: new ObjectId(id)});
        res.send("Heroi deletado com sucesso!");
    })

    app.listen(3000);
}

main();

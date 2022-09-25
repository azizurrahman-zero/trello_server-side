const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.m2z3fr9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

async function run() {
    try {
        await client.connect();
        const allListCollection = client.db("Trello").collection("AllList");

        // load todo list
        app.get("/todos", async (req, res) => {
            const query = { status: 'To Do' };
            const cursor = allListCollection.find(query);
            const todos = await cursor.toArray();
            res.send(todos);
        });

        // load research list
        app.get("/researchs", async (req, res) => {
            const query = { status: 'Research' };
            const cursor = allListCollection.find(query);
            const researchs = await cursor.toArray();
            res.send(researchs);
        });

        // load in progress list
        app.get("/inProgress", async (req, res) => {
            const query = { status: 'In Progress' };
            const cursor = allListCollection.find(query);
            const inProgress = await cursor.toArray();
            res.send(inProgress);
        });

        // load review list
        app.get("/reviews", async (req, res) => {
            const query = { status: 'Review' };
            const cursor = allListCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        // load completed list
        app.get("/completed", async (req, res) => {
            const query = { status: 'Completed' };
            const cursor = allListCollection.find(query);
            const completed = await cursor.toArray();
            res.send(completed);
        });

        // add ticket
        app.post("/add", async (req, res) => {
            const ticket = req.body;
            const result = await allListCollection.insertOne(ticket);
            res.send(result);
        });

        // edit ticket
        app.put("/edit/:id", async (req, res) => {
            const id = req.params.id;
            const editedTicket = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: editedTicket,
            };
            const result = await allListCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // delete ticket
        app.delete("/delete/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await allListCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/', (req, res) => {
            res.send('Hello from Server!');
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})
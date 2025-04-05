const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kp6erxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const allListCollection = client.db("Trello").collection("AllList");

    app.get("/:query", async (req, res) => {
      try {
        const query = req.params.query;
        const validStatuses = ["todo", "research", "inProgress", "review", "completed", "all"];
        
        // Validate if query is a valid status
        if (!validStatuses.includes(query)) {
          return res.status(400).send({ 
            success: false, 
            message: "Invalid status query." 
          });
        }
        
        // If query is "all", use an empty filter to get all documents
        const filter = query === "all" ? {} : { status: query };
        const result = await allListCollection.find(filter).toArray();
        
        res.send({ success: true, data: result });
      } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send({ 
          success: false, 
          message: "Error fetching data", 
          error: err.message 
        });
      }
    });

    // add ticket
    app.post("/add", async (req, res) => {
      const ticket = req.body;
      // Make sure priority is included in the ticket
      if (!ticket.priority) {
        ticket.priority = "Medium"; // Default priority if not provided
      }
      const result = await allListCollection.insertOne(ticket);
      res.send(result);
    });

    // edit ticket
    app.put("/edit/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const editedTicket = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: editedTicket,
        };
        const result = await allListCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      } catch (error) {
        console.error("Error updating ticket:", error);
        res
          .status(500)
          .send({ message: "Error updating ticket", error: error.message });
      }
    });

    // update ticket status (for drag and drop)
    app.put("/updateStatus/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { status } = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: { status },
        };
        const result = await allListCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating ticket status:", error);
        res
          .status(500)
          .send({
            message: "Error updating ticket status",
            error: error.message,
          });
      }
    });

    // update ticket priority
    app.put("/updatePriority/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { priority } = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: { priority },
        };
        const result = await allListCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating ticket priority:", error);
        res
          .status(500)
          .send({
            message: "Error updating ticket priority",
            error: error.message,
          });
      }
    });

    // delete ticket
    app.delete("/delete/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await allListCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.error("Error deleting ticket:", error);
        res
          .status(500)
          .send({ message: "Error deleting ticket", error: error.message });
      }
    });

    app.get("/", (req, res) => {
      res.send("Hello from Server!");
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

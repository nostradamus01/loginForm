const { MongoClient } = require('mongodb');
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

router.get('/', async (req, res) => {
    const result = await run();
    console.log(result);
    res.send(result);
    // res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

const uri = "mongodb+srv://mimain:mimain.2022@mycluster1.ulsva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");

        const database = client.db("basa1");
        const movies = database.collection("collect1");

        const doc = {
            title: "Record of a Shriveled Datum",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
        }

        // const result = await movies.insertOne(doc);
        const result = await movies.find().toArray();
        console.log(result);
        // alert('Ayoo');
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        return result;
        // console.log(result);
    } catch (e) {
        return e;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

app.use('/.netlify/functions/mongo', router);

module.exports.handler = serverless(app);

// run();np
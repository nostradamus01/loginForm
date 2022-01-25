const { MongoClient } = require('mongodb');
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(express.static('dist'));
app.use(bodyParser.json());

const uri = "mongodb+srv://mimain:mimain.2022@mycluster1.ulsva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async (callback) => {
    try {
        await client.connect();
        await callback();
        console.log('Connected successfully');
    } catch (e) {
        console.error(e);
    }
}

router.post('/register', async (req, res) => {
    let result = null;
    let error = null;
    await connect(async () => {
        try {
            result = await createUser(req.body);
        } catch (e) {
            if (e.code === 11000) {
                error = 'Email is already used'
            } else {
                error = 'There is a problem'
            }
        }
    });
    res.send({
        ok: !error,
        message: error || 'Good',
        res: !error ? result.insertedId : ''
    });
});

router.post('/login', async (req, res) => {
    let error = null;
    let user = null;
    let right = false;
    let message = '';
    await connect(async () => {
        try {
            user = await getUser(req.body.email);
            if (user) {
                message = 'Wrong Password';
                if (user.password === req.body.password) {
                    right = true;
                }
            }
        } catch (e) {
            error = e;
        }
        res.send({
            ok: !error,
            message: message || error,
            res: right,
        });
    });

});

const getDatabasesList = async () => {
    const dbList = await client.db().admin().listDatabases();
    dbList.databases.forEach((db) => {
        console.log(`DataBase: ${db.name}`);
    });
}

const createUser = async (user) => {
    return await client.db('basa1').collection('collect1').insertOne(user);
}

const getUser = async (email) => {
    return await client.db('basa1').collection('collect1').findOne({
        email: email
    });
}

app.use('/.netlify/functions/mongo', router);

module.exports.handler = serverless(app);

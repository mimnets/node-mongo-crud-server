const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


// mongoCrud
// ZJ7kQbgBVWRw91Ic



const uri = "mongodb+srv://mongoCrud:ZJ7kQbgBVWRw91Ic@cluster0.ak6zw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async await
async function run(){
    try{
        const userCollection = client.db('nodeMongoCrud').collection('users');
        app.post('/users', async (req, res)=>{
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user)
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(err => console.log(err));

// const run = async () =>{

// }
// run().catch(err => console.log(err));

app.get('/', (req, res, next) => {
    res.send('Hello form node mongo crud server')
})

app.listen(port, ()=>{
    console.log('Listening on port', port)
})
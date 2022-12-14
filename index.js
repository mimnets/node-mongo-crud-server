const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// mongoCrud
// ZJ7kQbgBVWRw91Ic



const uri = "mongodb+srv://mongoCrud:ZJ7kQbgBVWRw91Ic@cluster0.ak6zw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async await
async function run(){
    try{
        const userCollection = client.db('nodeMongoCrud').collection('users');

        // R - Read of CRUD operations
        app.get('/users', async (req, res) =>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        // U - Show in the input form for update of CRUD operations
        app.get('/user/:id', async (req,res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user = await userCollection.findOne(query);
            res.send(user);
        })


        // C- Create of CRUD operations
        app.post('/users', async (req, res)=>{
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user)
            res.send(result);
        })

        // U - Update of CRUD operation
        app.put('/users/:id', async (req, res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const user = req.body;
            const option = {upsert: true}
            const updatedUser = {
                $set:{
                    name: user.name,
                    address: user.address,
                    email: user.email
                }
            }
            const result = await userCollection.updateOne(filter, updatedUser, option)
            res.send(result); 
            // console.log(user); 
        })


        // D - Delete of CRUD operations
        app.delete('/users/:id', async (req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            // console.log('Trying to delete', id)
            res.send(result)
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
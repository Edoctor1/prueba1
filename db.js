/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://edoctor:Pruebas123@cluster0.fha8lbz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    });
client.connect(err => {
    const collection = client.db('Dependencies').collection('humanResources', 'factory', 'commercial');
    client.close()
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
});*/
const mongoose = require('mongoose');

async function run(){
await mongoose.connect("mongodb://edoctor:Pruebas123@ac-fn3yv41-shard-00-00.fha8lbz.mongodb.net:27017,ac-fn3yv41-shard-00-01.fha8lbz.mongodb.net:27017,ac-fn3yv41-shard-00-02.fha8lbz.mongodb.net:27017/?ssl=true&replicaSet=atlas-13kxxe-shard-0&authSource=admin&retryWrites=true&w=majority",{
    useNewUrlParser: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));
mongoose.set('strictQuery', false);
}

run()
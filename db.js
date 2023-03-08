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
await mongoose.connect('mongodb+srv://edoctor:Pruebas123@cluster0.fha8lbz.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));
mongoose.set('strictQuery', false);
}

run()
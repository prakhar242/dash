const express = require('express');
const bodyParser= require('body-parser')
const MongoClient= require('mongodb').MongoClient;
var cors = require("cors");
const app = express()
const url = "mongodb+srv://dbUser:Prakhi24@prakhi-jpsfe.mongodb.net/dash?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get('/characters',(req,res)=>{
    MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    let str
    let result = {
      "count":" ",
      "details":[]
    }
    const db =client.db('dash')
    db.collection('characters').count()
    .then(results => {
      str = results
      db.collection('characters').find().toArray()
      .then(results =>{
           result.count=str;
           result.details=results;
           res.send(result)
      })
      .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error))
})


app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port 3000 ${process.env.PORT}`);
})
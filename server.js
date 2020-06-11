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
});
app.post('/login',(req,res)=>{
  console.log(req.body)
  MongoClient.connect(url, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db =client.db('dash')
  console.log(db.auth(req.body.userName,req.body.password))
  res.send()
})
.catch(error => console.error(error))
})


app.listen(process.env.PORT || 3001, ()=> {
  console.log(`app is running on port 3001 ${process.env.PORT}`);
})
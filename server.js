const express = require('express');
const mongoose = require('mongoose');
const PublicationsRoute = require('./routes/pubs.js');
const env = require('dotenv').config();
const password = env.parsed.PASSWORD;

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbUri = (db) => `mongodb+srv://felipepbernardo:${password}@pernilongo.6dynetw.mongodb.net/${db}?retryWrites=true&w=majority`;
mongoose.connect(dbUri('Publications'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
  app.use('/api/pubs', PublicationsRoute)
})
.catch(err => console.log(err));

// routes
app.get("/", (req, res) => {
  res.send("Página principal")
});


app.listen(env.parsed.PORT, () => {
  console.log("Listening at http://localhost:3000");
})

module.exports = app;
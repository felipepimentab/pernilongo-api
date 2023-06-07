const express = require('express');
const mongoose = require('mongoose');
const PublicationsRoute = require('./routes/pubs.js');
const path = require('path');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const password = process.env.PASSWORD;
const port = process.env.PORT || '3000';
const dbUri = (db) => `mongodb+srv://felipepbernardo:${password}@pernilongo.6dynetw.mongodb.net/${db}?retryWrites=true&w=majority`;

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));

process.on('uncaughtException', function(err) {
  console.log(err)
})
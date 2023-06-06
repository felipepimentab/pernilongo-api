const { Current, Speed, State, Temperature, Tension, Voltage, Warning } = require('../models/pubs.js');
const express = require('express');
const router = express.Router();

// Get summary
router.get('/', async (req, res) => { 
  const todos = await Speed.find();
  res.json(todos);
});

// Get State
router.get('/state', async (req, res) => { 
  const Estados = await State.find();
  res.json(Estados);
});
// Create new todo
router.post('/state', async (req, res) => {
  console.log(req)
  const newStatePub = new State(
    req.body
    // {
    //   topic: '/motor/state',
    //   payload: {
    //     message: true,
    //     time: new Date(),
    //   },
    //   qos: 0,
    //   retain: true,
    //   _msgid: 'dadasdiudb98eg217bd128pbd012',
    // }, 
  );
  const savedStatePub = await newStatePub.save()
  res.json(savedStatePub)
})



module.exports = router;
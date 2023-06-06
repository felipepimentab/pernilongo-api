const { Current, Speed, State, Temperature, Tension, Warning } = require('../models/pubs.js');
const express = require('express');
const router = express.Router();

/**
 * Returns a summary of the last 30 pubs from all topics
 */
router.get('/all', async (req, res) => { // TO-DO: reescrever com "promise all"
  const currentPubs = await Current.find();
  const speedPubs = await Speed.find();
  const statePubs = await State.find();
  const temperaturePubs = await Temperature.find();
  const tensionPubs = await Tension.find();
  const warningPubs = await Warning.find();
  const pubs = { // TO-DO: refazer essa filtragem usando as queries do mongodb
    current: currentPubs.slice(0,30),
    speed: speedPubs.slice(0,30),
    state: statePubs.slice(0,30),
    temperature: temperaturePubs.slice(0,30),
    tension: tensionPubs.slice(0,30),
    warning: warningPubs.slice(0,30)
  }
  res.json(pubs);
});

// -- Current
router.get('/current', async (req, res) => {
  const currentPubs = await Current.find();
  res.json(currentPubs);
});
router.post('/current', async (req, res) => {
  const newCurrentPub = new Current(req.body);
  const savedCurrentPub = await newCurrentPub.save();
  res.json(savedCurrentPub);
});

// -- Speed
router.get('/speed', async (req, res) => {
  const speedPubs = await Speed.find();
  res.json(speedPubs);
});
router.post('/speed', async (req, res) => {
  const newSpeedPub = new Speed(req.body);
  const savedSpeedPub = await newSpeedPub.save();
  res.json(savedSpeedPub);
});

// -- State
router.get('/state', async (req, res) => { 
  const statePubs = await State.find();
  res.json(statePubs);
});
router.post('/state', async (req, res) => {
  const newStatePub = new State(req.body);
  const savedStatePub = await newStatePub.save();
  res.json(savedStatePub);
});

// -- Temperature
router.get('/temperature', async (req, res) => {
  const temperaturePubs = await Temperature.find();
  res.json(temperaturePubs);
});
router.post('/temperature', async (req, res) => {
  const newTemperaturePub = new Temperature(req.body);
  const savedTemperaturePub = await newTemperaturePub.save();
  res.json(savedTemperaturePub);
});

// -- Tension
router.get('/tension', async (req, res) => {
  const tensionPubs = await Tension.find();
  res.json(tensionPubs);
});
router.post('/tension', async (req, res) => {
  const newTensionPub = new Tension(req.body);
  const savedTensionPub = await newTensionPub.save();
  res.json(savedTensionPub);
});

// -- Warning
router.get('/warning', async (req, res) => {
  const warningPubs = await Warning.find();
  res.json(warningPubs);
});
router.post('/warning', async (req, res) => {
  const newWarningPub = new Warning(req.body);
  const savedWarningPub = await newWarningPub.save();
  res.json(savedWarningPub);
});

module.exports = router;
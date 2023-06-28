const { Current, Speed, State, Temperature, Tension, Warning } = require('../models/pubs.js');
const express = require('express');
const router = express.Router();

// -- Get Pubs from All Topics
router.get('/', async (req, res) => { // TO-DO: reescrever com "promise all"
  // const currentPubs = await Current.find();
  // const speedPubs = await Speed.find();
  // const statePubs = await State.find();
  // const temperaturePubs = await Temperature.find();
  // const tensionPubs = await Tension.find();
  // const warningPubs = await Warning.find();
  // const pubs = {
  //   current: currentPubs, 
  //   speed: speedPubs,
  //   state: statePubs,
  //   temperature: temperaturePubs,
  //   tension: tensionPubs,
  //   warning: warningPubs
  // };
  // res.json(pubs);
  res.status(503).json({ message: 'Route temporarily unavailable.' })
}).catch((error) => {
  res.status(500).json({ message: error.message });
});

// -- Get Pubs from Topic
router.get('/:topic', checkTopic, async (req, res) => {
  let pubs
  try {
    switch (req.params.topic) {
      case 'current': // MOTOR (exclusivo)
        pubs = await Current.find();
        break;

      case 'speed': // MOTOR (exclusivo)
        pubs = await Speed.find();
        break;

      case 'state': // MOTOR & ESTEIRA (reaproveitado)
        pubs = await State.find();
        break;

      case 'temperature': // MOTOR (exclusivo)
        pubs = await Temperature.find();
        break;

      case 'tension': // MOTOR (exclusivo)
        pubs = await Tension.find();
        break;

      case 'warning': // MOTOR & ESTEIRA (reaproveitado)
        pubs = await Warning.find();
        break;

      case 'items': // ESTEIRA (exclusivo)
        pubs = await Warning.find();
        break;

      case 'accepted': // ESTEIRA (exclusivo)
        pubs = await Warning.find();
        break;

      case 'rejected': // ESTEIRA (exclusivo)
        pubs = await Warning.find();
        break;

      default:
        return res.status(404).json({ message: `Topic ${req.params.topic} does not exist.` })
    }
    res.json(pubs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// -- Post Sub to Topic
router.post('/:topic', checkTopic, async (req, res) => {
  let newPub;

  switch (req.params.topic) {
    case 'current':
      newPub = new Current(req.body);
      break;

    case 'speed':
      newPub = new Speed(req.body);
      break;

    case 'state':
      newPub = new State(req.body);
      break;

    case 'temperature':
      newPub = new Temperature(req.body);
      break;

    case 'tension':
      newPub = new Tension(req.body);
      break;

    case 'warning':
      newPub = new Warning(req.body);
      break;

    default:
      return res.status(404).json({ message: `Topic ${req.params.topic} does not exist.` })
  }

  try {
    const savedPub = await newPub.save();
    res.status(201).json(savedPub);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// -- Middleware
const topics = ['current', 'speed', 'state', 'temperature', 'tension', 'warning'];
async function checkTopic(req, res, next) {
  if (!topics.includes(req.params.topic))
    return res.status(404).json({ message: `Topic \'${req.params.topic}\' does not exist.` })
  next()
}

module.exports = router;
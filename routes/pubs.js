const { Current, Speed, State, Temperature, Tension, Warning, Items, Accepted, Rejected } = require('../models/pubs.js');
const express = require('express');
const router = express.Router();

// -- Get Pubs from All Topics
router.get('/', async (req, res) => { // TO-DO: reescrever com "promise all"
  try {
    const currentPubs = await Current.find();
    const speedPubs = await Speed.find();
    const statePubs = await State.find();
    const temperaturePubs = await Temperature.find();
    const tensionPubs = await Tension.find();
    const warningPubs = await Warning.find();
    const itemsPubs = await Items.find();
    const acceptedPubs = await Accepted.find();
    const rejectedPubs = await Rejected.find();

    const pubs = {
      current: currentPubs, 
      speed: speedPubs,
      state: statePubs,
      temperature: temperaturePubs,
      tension: tensionPubs,
      warning: warningPubs,
      items: itemsPubs,
      accepted: acceptedPubs,
      rejected: rejectedPubs
    };
    res.json(pubs);
    // res.status(503).json({ message: 'Route temporarily unavailable.' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
        pubs = await Items.find();
        break;

      case 'accepted': // ESTEIRA (exclusivo)
        pubs = await Accepted.find();
        break;

      case 'rejected': // ESTEIRA (exclusivo)
        pubs = await Rejected.find();
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

    case 'items':
      newPub = new Items(req.body);
      break;

    case 'accepted':
      newPub = new Accepted(req.body);
      break;

    case 'rejected':
      newPub = new Rejected(req.body);
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
const topics = ['current', 'speed', 'state', 'temperature', 'tension', 'warning', 'items', 'accepted', 'rejected'];
async function checkTopic(req, res, next) {
  if (!topics.includes(req.params.topic))
    return res.status(404).json({ message: `Topic \'${req.params.topic}\' does not exist.` })
  next()
}

module.exports = router;
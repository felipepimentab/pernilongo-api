const mongoose = require('mongoose');

const CurrentSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  payload: {
    message: {
      type: Number,
      required: true
    },
    time: {
      type: Date,
      immutable: true,
      default: () => Date.now()
    },
  },
  qos: {
    type: Number,
    min: 0,
    max: 2,
    default: 0,
  },
  retain: {
    type: Boolean,
    default: true
  },
  _msgid: String,
}, { collection: 'Current'});
const Current = new mongoose.model('Current', CurrentSchema)

const SpeedSchema = new mongoose.Schema({
  topic: String,
  payload: {
    message: Number,
    time: Date
  },
  qos: Number,
  retain: Boolean,
  _msgid: String,
}, { collection: 'Speed'});
const Speed = new mongoose.model('Speed', SpeedSchema)

const StateSchema = new mongoose.Schema({ // esteira (reaproveitado)
  topic: String,
  payload: {
    message: Boolean,
    time: Date
  },
  qos: Number,
  retain: Boolean,
  _msgid: String,
}, { collection: 'State'});
const State = new mongoose.model('State', StateSchema)

const TemperatureSchema = new mongoose.Schema({
  topic: String,
  payload: {
    message: Number,
    time: Date
  },
  qos: Number,
  retain: Boolean,
  _msgid: String,
}, { collection: 'Temperature'});
const Temperature = new mongoose.model('Temperature', TemperatureSchema)

const TensionSchema = new mongoose.Schema({
  topic: String,
  payload: {
    message: Number,
    time: Date
  },
  qos: Number,
  retain: Boolean,
  _msgid: String,
}, { collection: 'Tension'});
const Tension = new mongoose.model('Tension', TensionSchema)

const WarningSchema = new mongoose.Schema({ // esteira (reaproveitado)
  topic: String,
  payload: {
    message: String,
    time: Date
  },
  qos: Number,
  retain: Boolean,
  _msgid: String,
}, { collection: 'Warning'});
const Warning = new mongoose.model('Warning', WarningSchema)

const ItemsSchema = new mongoose.Schema({ // ESTEIRA
  topic: String,
  payload: {
    message: Number,
    time: Date
  },
  qos: Number,
  retain: Boolean,
  _msgid: String,
}, { collection: 'Items'});
const Items = new mongoose.model('Items', ItemsSchema)

const AcceptedSchema = new mongoose.Schema({ // ESTEIRA
  topic: String,
  payload: {
    message: Number,
    time: Date
  },
  qos: Number,
  retain: Boolean,
  _msgid: String,
}, { collection: 'Accepted'});
const Accepted = new mongoose.model('Accepted', AcceptedSchema)

const RejectedSchema = new mongoose.Schema({ // ESTEIRA
  topic: String,
  payload: {
    message: Number,
    time: Date
  },
  qos: Number,
  retain: Boolean,
  _msgid: String,
}, { collection: 'Rejected'});
const Rejected = new mongoose.model('Rejected', RejectedSchema)

module.exports = { Current, Speed, State, Temperature, Tension, Warning, Items, Accepted, Rejected }
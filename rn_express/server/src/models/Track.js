const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  timestamp: Number, // Represents the time when data is pooled from user device
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

// MondoDB will understand, that userId pointing to User Schema
const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    default: '',
  },
  locations: [pointSchema],
});

mongoose.model('Track', trackSchema);

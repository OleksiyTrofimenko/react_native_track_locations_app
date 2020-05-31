require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

// Handle data in json format
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  'mongodb+srv://admin:5OzDxqsh9zBesl26@cluster0-k3tig.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance');
});

mongoose.connection.on('error', () => {
  console.log('connected to mongo instance has error');
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

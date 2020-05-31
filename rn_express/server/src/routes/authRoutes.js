const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  // save user in mongoDB collection ( async call )
  const { email, password } = req.body;

  try {
    const user = new User({
      email,
      password,
    });

    await user.save();

    // generate fresh token based on received id from mongoDB
    const token = jwt.sign(
      {
        userId: user._id,
      },
      'MY SECRET KEY'
    );

    res.send({
      token,
    });
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password ' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).send({ error: 'Email not found' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY SECRET KEY');
    res.send({ token });
  } catch (error) {
    res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;

const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) throw new Error('All fields required');
    if (await User.findOne({ email })) throw new Error('Email already in use');
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Email & password required');
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

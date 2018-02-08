const mongoose = require('mongoose');
const user_mongoose = mongoose.createConnection('mongodb://localhost:27017/react');

module.exports = user_mongoose;
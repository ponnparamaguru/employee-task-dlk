const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['admin', 'employee'] },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});
module.exports = mongoose.model('User', userSchema);

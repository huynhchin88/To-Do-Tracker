const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: {type: String, required: true},
    blnCompleted: {type: Boolean, default: false}
});

module.exports = mongoose.model('Todo', TodoSchema);
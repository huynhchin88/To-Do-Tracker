const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

const app = express()
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mern_todo', {
    useNewURLParser: true,
    useUnifiedTopology: true,
});

app.use('/api/todos', todoRoutes);
app.listen(5000, () => console.log('Server running on port 5000.'));
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

// Define Mongoose Model for Message
const Message = mongoose.model('Message', new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: Date, default: Date.now },
}));

// Route to save a message to the database
app.post('/save-message', async (req, res) => {
  const { username, text } = req.body;

  try {
    const newMessage = new Message({ username, text });
    await newMessage.save();
    res.status(200).send({ message: 'Message saved successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving message', error });
  }
});

// Route to get all messages from the database
app.get('/get-messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ time: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching messages', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

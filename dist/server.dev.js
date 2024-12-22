"use strict";

var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var cors = require('cors');

var dotenv = require('dotenv');

var path = require('path'); // Load environment variables from .env file


dotenv.config();
var app = express();
var port = process.env.PORT || 3000; // Middleware

app.use(cors());
app.use(bodyParser.json()); // MongoDB Atlas Connection

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB Atlas connected');
})["catch"](function (err) {
  return console.log('Error connecting to MongoDB Atlas:', err);
}); // Define Mongoose Model for Message

var Message = mongoose.model('Message', new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    "default": Date.now
  }
})); // Route to save a message to the database

app.post('/save-message', function _callee(req, res) {
  var _req$body, username, text, newMessage;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, text = _req$body.text;
          _context.prev = 1;
          newMessage = new Message({
            username: username,
            text: text
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(newMessage.save());

        case 5:
          res.status(200).send({
            message: 'Message saved successfully!'
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).send({
            message: 'Error saving message',
            error: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Route to get all messages from the database

app.get('/get-messages', function _callee2(req, res) {
  var messages;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Message.find().sort({
            time: 1
          }));

        case 3:
          messages = _context2.sent;
          res.json(messages);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send({
            message: 'Error fetching messages',
            error: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Start the server

app.listen(port, function () {
  console.log("Server running on port ".concat(port));
});
//# sourceMappingURL=server.dev.js.map

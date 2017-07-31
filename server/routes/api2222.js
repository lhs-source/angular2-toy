const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var Event = require('../models/calendar-events');

// declare axios for making http requests
const axios = require('axios');
//const API = 'https://jsonplaceholder.typicode.com';
const API = 'https://jsonplaceholder.typicode.com';


//const db = "mongodb://192.168.0.8:27017/events";
const db = "mongodb://localhost/events";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
  if(err){ 
    console.error("Error! " + err);
  }
  console.error("Success! ");
});


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/event/:date', (req, res)=>{
  // Event.find({ date : req.params.date }, function (err, events) {
  //   if(err) return next(err);
  //   res.json(events);
  // });
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

// Get all posts
// router.get('/posts', (req, res) => {
//   // Get posts from the mock api
//   // This should ideally be replaced with a service that connects to MongoDB
//   axios.get(`${API}/posts`)
//     .then(posts => {
//       res.status(200).json(posts.data);
//     })
//     .catch(error => {
//       res.status(500).send(error)
//     });
// });

module.exports = router;
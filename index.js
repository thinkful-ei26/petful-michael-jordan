'use strict';
 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

let catData = [ 
  {imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'},
  {imageURL:'https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 
  imageDescription: 'Grey scottish fold with bright blue eyes starting at camera',
  name: 'Scotland',
  sex: 'Male',
  age: '6 mos',
  breed: 'Scottish Fold',
  story: 'Found in a barn'},

  {imageURL:'https://images.pexels.com/photos/923360/pexels-photo-923360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 
  imageDescription: 'Grey tabby purring in some christmas lights.',
  name: 'Firefly',
  sex: 'Female',
  age: 5,
  breed: 'Tabby',
  story: 'Owners moved to no pets allowed apartment'},
]

let dogData = [
  {imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'},

  {imageURL: 'https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  imageDescription: 'Brown and black german shepard puppy.',
  name: 'Ashford',
  sex: 'Male',
  age: '4 mos',
  breed: 'German Shepard',
  story: 'Found wandering the streets in Queens'},

  {imageURL: 'https://images.pexels.com/photos/374898/pexels-photo-374898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  imageDescription: 'A comfy fawn collored pug snuggling in her blanket.',
  name: 'Princess Leia',
  sex: 'Female',
  age: 1,
  breed: 'Pug',
  story: 'Owner Passed away'},
]

app.get('/api/cat', (req, res) => {
    res.status(200).json(catData[0])
});

app.get('/api/dog', (req, res) => {
    res.status(200).json(dogData[0])
});

//route a delete request request to each endpoint to remove the first animal of an array 
app.delete('/api/cat', (req, res, next) => {

  catData.shift()
  res.status(204).end();

});

app.delete('/api/dog', (req, res, next) => {

  dogData.shift()
  res.status(204).end();

});


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  runServer();
}

module.exports = { app };

// set up connection to mongodb

var mongoose = require('mongoose');

// function to connect to the database 
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://Administrator:N8isGr8@web3-asg2.jqthskv.mongodb.net/test');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Could not connect to MongoDB');
  }

  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('We are connected!');
  });
}


async function getAllMovies() {
  // connect to the database
  await connect();

  const movies = db.collection('movies').find({}).toArray();
  return movies;

  // get all movies from the database
  // var Movie = mongoose.model('Movie', {
  //    id: Number,
  //     tmdb_id: Number,
  //     imdb_id: String,
  //     release_date: String,
  //     title: String,
  //     runtime: Number,
  //     revenue: Number,
  //     tagline: String,
  //     poster: String,
  //     backdrop: String,
  //     ratings: {
  //       popularity: Number,
  //       average: Number,
  //       count: Number
  //     },
  //     details: {
  //       overview: String,
  //       genres: [{
  //         id: Number,
  //         name: String
  //       }]
  //     }
  //   });

  
}

exports.getAllMovies = getAllMovies;


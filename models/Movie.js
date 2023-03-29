const mongoose = require('mongoose');

const schema = mongoose.Schema({
  id: Number,
  tmdb_id: Number,
  imdb_id: String,
  release_date: String,
  title: String,
  runtime: Number,
  revenue: Number,
  tagline: String,
  poster: String,
  backdrop: String,
  ratings: {
    popularity: Number,
    average: Number,
    count: Number
  },
  details: {
    overview: String,
    genres: [{
      id: Number,
      name: String
    }]
  }
}, { collection: 'movies' });

module.exports = mongoose.model('Movie', schema);
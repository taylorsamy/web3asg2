
const express = require("express")
const Movie = require("./models/Movie") // new
const router = express.Router()

// Get all posts
router.get("/movies", async (req, res) => {
	const movies = await Movie.find()
	res.send(movies)
})

router.get("/movies/limit/:limit", async (req, res) => {
  const limit = req.params.limit
  const movies = await Movie.find().limit(parseInt(limit))
  res.send(movies)
})

router.get("/movies/:id", async (req, res) => {
  const id = req.params.id
  const movie = await Movie.findOne({ id: id })
  res.send(movie)
})

router.get("/movies/tmdb/:id", async (req, res) => {
  const id = req.params.id
  const movie = await Movie.findOne({ tmdb_id: id })
  res.send(movie)
})

router.get("/movies/year/:min/:max", async (req, res) => {
  const min = req.params.min
  const max = req.params.max
  const movies = await Movie.find({ release_date: { $gte: min, $lte: max } })
  res.send(movies)
})

router.get("/movies/rating/:min/:max", async (req, res) => {
  const min = req.params.min
  const max = req.params.max
  const movies = await Movie.find({ "ratings.average": { $gte: min, $lte: max } })
  res.send(movies)
})

router.get("/movies/title/:title", async (req, res) => {
  const title = req.params.title
  console.log(title)
  const movies = await Movie.find({ title: { $regex: title, $options: "i" } })
  res.send(movies)
})

router.get("/movies/genre/:genre", async (req, res) => {
  const genre = req.params.genre
  const movies = await Movie.find({ "details.genres.name": { $regex: genre, $options: "i" } })
  res.send(movies)
})

module.exports = router
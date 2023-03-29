
const express = require("express")
const Movie = require("./models/Movie") // new
const router = express.Router()

// Get all posts
router.get("/movies", async (req, res) => {
	const movies = await Movie.find()
  console.log("movies: ")
  console.log(movies)
	res.send(movies)
})

module.exports = router
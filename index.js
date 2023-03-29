
const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes") // new

mongoose
  .connect('mongodb+srv://Administrator:N8isGr8@web3-asg2.jqthskv.mongodb.net/assignment_2')
  .then(() => {
    const app = express()
    app.use("/api", routes) // new

    app.listen(5000, () => {
      console.log("Server has started!")
    })
  })



const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
// const userRoutes = require("./routes/user")
// const sauceRoutes = require("./routes/sauce")
// const path = require("path")

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !"))

const testSchema = new mongoose.Schema({
  name: String,
  lastName: String,
})
const testModel = mongoose.model("essai", testSchema)
const app = express()

app
  .use("/ping", (req, res) => {
    console.log("ping")
    res.send("ok")
  })
  .get("/coucou", async (req, res) => {
    console.log("Requête")
    const test = await testModel.find()
    res.send(test)
  })
// .use(express.json())
// .use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
//   next()
// })
// .use("/api/auth", userRoutes)
// .use("/api/sauces", sauceRoutes)
// .use("/images", express.static(path.join(__dirname, 'images')))

module.exports = app

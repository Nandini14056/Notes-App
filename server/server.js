const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/",(req,res) => {
  res.send("Hello there")
})

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`)
})
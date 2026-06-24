const express = require("express");
const app = express();

app.cors();

app.listen(3000, (req,res) => {
  res.send("server is listening on port")
})
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const notesRouter = require('./routes/notes.routes');
const authRouter = require('./routes/auth.routes');
const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(cors());
app.use(express.json())

app.use('/api/notes',notesRouter);
app.use('/api/user', authRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`)
})
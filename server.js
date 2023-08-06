const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });



// Define your CRUD routes here
app.use("/api",require("./routes/todo"));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

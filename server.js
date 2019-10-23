const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
const employeeRoute = require("./routes/employee");
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/Atlan", { useNewUrlParser: true })
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

app.use("/employee", employeeRoute);
const port = 8080;

app.listen(port, () => {
  console.log(`The Server is running at port ${port}`);
});

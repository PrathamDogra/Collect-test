const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
const Routes = require("./routes/Routes");
app.use(express.json());

// MongoDB is connected
mongoose
  .connect(
    "mongodb+srv://Pratham:Pratham@node-cluster-gx6ut.mongodb.net/Atlan?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

app.use("/employee", Routes);
const port = 8080;
// Express Server
app.listen(port, () => {
  console.log(`The Server is running at port ${port}`);
});

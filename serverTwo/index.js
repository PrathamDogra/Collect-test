const express = require("express");

const port = 5000;
const app = express();

app.get("/stop", (req, res) => {
  const flag = req.query.flag;
  if (flag == 0) {
    return res.status(200).json("Stop");
  } else if (flag == 1) {
    return res.status(200).json("Resume");
  }
});

app.listen(port, () => {
  console.log(`The Second server is running at port ${port}`);
});

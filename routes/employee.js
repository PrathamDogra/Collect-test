const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model");
const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");

const array = [];
var flag = "Resume";
fs.createReadStream("Book.csv")
  .pipe(csv())
  .on("data", row => array.push(row))
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
router.post("/add", (req, res) => {
  uploadBlock()
    .then(result => {
      res.json(result);
      console.log(result);
    })
    .catch(err => {
      res.status(400).json(err);
      console.log(err);
    });
});

const uploadBlock = () => {
  return new Promise((resolve, reject) => {
    array.map(async (val, i) => {
      const newEmployee = new Employee(val);
      const flagStop =  axios.get("http://localhost:5000/stop?flag=0")
      console.log(flagStop);
      // const flagResume = await axios.get("http://localhost:5000/stop/1");

      if (flag === "Resume") {
        newEmployee
          .save()
          .then(() => {
            console.log(`Employee ${i + 1} added`);
          })
          .catch(err => console.log(err));
        resolve("Upload is Successfull");
      } else if (flag === "Stop") {
        reject("Session is Stopped");
      }
    });
  });
};

router.get("/", (req, res) => {
  Employee.find()
    .then(exercises => res.status(200).json(exercises))
    .catch(err => res.status(400).json(err));
});
module.exports = router;

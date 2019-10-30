const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model");
const csv = require("csv-parser");
const fs = require('fs')
const array = [];
var globalFlag = 1;

// This code block is used to read the content of CSV file and load it to the array
fs.createReadStream("Book.csv")
  .pipe(csv())
  .on("data", row => array.push(row))
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

// API endpoint to stop or terminate the CSV upload
router.get("/stop", (req, res) => {
  res.json({
    flag: 0,
    comment: "Stop"
  });
  globalFlag = 0;
});

// API endpoint to resume the CSV upload
router.get("/resume", (req, res) => {
  res.json({
    flag: 1,
    comment: "Resume"
  });
  globalFlag = 1;
});

// API function to upload the CSV data to MongoDB
router.post("/add", (req, res) => {
  const flag = req.body.flag;

  upload(flag)
    .then(result => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch(err => {
      res.status(400).json(err);
      console.log(err);
    });
});

const upload = flag => {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      if (flag === 1 && globalFlag != 0) {
        const newEmployee = Employee(array[i]);
        await newEmployee.save();

        console.log(`Row ${i + 1} Added`);
        if (i == array.length - 1) {
          resolve("Upload Completed");
        }
      } else if (globalFlag === 0) {
        reject("Session is being Stopped");
      }
    }
  });
};

// API function to get the data from MongoDB
router.get("/", (req, res) => {
  Employee.find()
    .then(exercises => res.status(200).json(exercises))
    .catch(err => res.status(400).json(err));
});

module.exports = router;

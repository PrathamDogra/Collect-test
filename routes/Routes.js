const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model");
const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");
const request = require("request");

const array = [];
var globalFlag = 1;
fs.createReadStream("Book.csv")
  .pipe(csv())
  .on("data", row => array.push(row))
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
router.get("/stop", (req, res) => {
  res.json({
    flag: 0,
    comment: "Stop"
  });
  globalFlag = 0;
});
router.get("/resume", (req, res) => {
  res.json({
    flag: 1,
    comment: "Resume"
  });
  globalFlag = 1;
});
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

        console.log(`Employee ${i + 1} Added`);
        if (i == array.length - 1) {
          resolve("Upload Completed");
        }
      } else if (globalFlag === 0) {
        reject("Session is being Stopped");
      }
    }
  });
};

router.get("/", (req, res) => {
  Employee.find()
    .then(exercises => res.status(200).json(exercises))
    .catch(err => res.status(400).json(err));
});

module.exports = router;

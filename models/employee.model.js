const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for csv file
const employeeSchema = new Schema({
  S_NO :{
    required: false,
    type: Number
  },
  CASE_STATUS :{
    required: true,
    type: String
  },
  EMPLOYER_NAME :{
    required: true,
    type: String
  },
  SOC_NAME :{
    required: true,
    type: String
  },
  JOB_TITLE :{
    required: true,
    type: String
  },
  FULL_TIME_POSITION :{
    required: true,
    type: String
  },
  PREVAILING_WAGE :{
    required: true,
    type: String
  },
  YEAR :{
    required: true,
    type: String
  },
  WORKSITE :{
    required: true,
    type: String
  },
  lon :{
    required: true,
    type: String
  },
  Last :{
      required: true,
      type: String
  }
});

module.exports = mongoose.model('Employee', employeeSchema);

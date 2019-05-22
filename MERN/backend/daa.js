// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const airline= new Schema(
  {
    id: Number,
    airline:{type:String, unique:true},
    password:{type:String},
    
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Airline", airline);

// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    message: String,
    username:{type:String, unique:true},
    password:{type:String},

  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);


const	User= new Schema(
  {
    id: Number,
    username:{type:String, unique:true},
    password:{type:String},
    airline:{type:String}
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", User);


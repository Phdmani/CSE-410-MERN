const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const User = require('./data');
const Data = require('./data');
const Airline = require('./daa');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://bina:123@bina-oi5x5.mongodb.net/test?retryWrites=true";
// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//var randomNumber = Math.floor(Math.random()*airlines.length);

router.post('/register', function(req,res){
    var newuser = new User();

    Airline.find({},function(err,air){
  var username= req.body.username;
  var password = req.body.password;
  var randomNumber = Math.floor(Math.random()*air.length);
  var airline = air[randomNumber].airline;
  //console.log("airline: "+airline);

  newuser.username = username;
  newuser.password = password;
  newuser.airline = airline;

  newuser.save(function(err,savedUser){
    if(err){
      console.log(err);
        var redir = { redirect: "/500" };
        console.log(redir);
        return res.json(redir);    }

        var redir = { redirect: "/", airline:airline };
        console.log(redir);
        return res.json(redir);  
  })
        }) 

})

router.post('/regiairy', function(req,res){
  var password = req.body.password;
  var airline = req.body.username;

  var newa = new Airline();

  newa.airline = airline;
  newa.password = password;
  newa.save(function(err,savedUser){
    if(err){
      console.log(err);
        var redir = { redirect: "/500" };
        console.log(redir);
        return res.json(redir);    }

      var redir = { redirect: "/" };
        console.log(redir);
        return res.json(redir);  
  })
})

router.post('/login', function(req,res){
  var username= req.body.username;
  var password = req.body.password;
  console.log(username)
  console.log(password)

  User.findOne({username:username,password:password}, function(err,user){
    
    if(err){
      console.log(err);
        var redir = { redirect: "/500" };
        console.log(redir);
        return res.json(redir);
    }
    if(!user){
       var redir = { redirect: "/404" };
        console.log(redir);
        return res.json(redir);

    }

        var redir = { redirect: "/", airline:user.airline };
        console.log(redir);
        return res.json(redir);  


  })

});



router.post('/getAirlines', function(req,res){
  var flight= req.body.flight;
console.log(flight)
  Airline.find({},function(err,air){
    if (err) throw err;
    var list=[];
    air.forEach(function(air){
      if(air.airline!=flight){
              console.log(air.airline)

      list.push(air.airline);
    }
    })


    res.json(list);
  })


});


// this is our get method
// this method fetches all available data in our database
// router.get("/getData", (req, res) => {
//   Data.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});




// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
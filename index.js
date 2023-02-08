//Importing express for use in nodejs
const express = require('express');
const hbs = require('hbs'); //import hbs into nodejs for template inheritance
const wax = require('wax-on');
const app = express();
const mongo = require('mongodb').MongoClient;

//intialise the view engine
app.set('view engine','hbs');

//intialise express to use static files
//telling express where to find these static files
app.use(express.static('./public'));

//Initalise wax-on
wax.on(hbs.handlebars);
//Where the template for inheritance is located
wax.setLayoutPath('./views/layouts');


//Enabling form processing
app.use(express.urlencoded({
  extended:false
}))

const mongoURI = "mongodb+srv://cerealgiant:rotiprata1234@cluster0.mirw50s.mongodb.net/?retryWrites=true&w=majority"

async function main() {

  //Connect to mongodb
  const client = await mongo.connect(mongoURI, {
    "useUnifiedTopology":true
  })

  const db = client.db("complaints_database");

  app.get('/',function(req,res) {
    res.render('home');
  })

  app.get('/faults',function(req,res) {
    res.render('faults');
  })

  app.post('/faults',function(req,res) {
    res.render("successful");
    //For the checkbox class
    let selectedCheckboxes;
    let selectedReasons = req.body.happen_again || [];
    selectedCheckboxes = Array.isArray(selectedReasons) ? selectedReasons : [selectedReasons];
    console.log(req.body);

    // Adding to mongodb
    db.collection("ComplaintsAndIssues").insertOne({
      'name':req.body.name,
      'email':req.body.email,
      'issue_type':req.body.issue_type,
      'issue_desc':req.body.issue_desc,
      'yesnoradio':req.body.yesnoradio,
      'happen_again':selectedCheckboxes
    })

  })

  app.get('/complaints',function(req,res) {
    res.render('complaints');
  })
}

main();

app.listen(3000,function() {
  console.log("Server has started");
})

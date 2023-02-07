//Importing express for use in nodejs
const express = require('express');

const app = express();

//intialise the view engine
app.set('view engine','hbs');


app.get('/',function(req,res) {
  res.send("Hello World!");
})

app.listen(3000,function() {
  console.log("Server has started");
})

//Importing express for use in nodejs
const express = require('express');
const wax = require('wax-on');

const app = express();

//intialise the view engine
app.set('view engine','hbs');

//intialise express to use static files
//telling express where to find these static files
app.use(express.static('./public'));

//Initalise wax-on
wax.on(hbs.handlebars);
//Where the template for inheritance is located
wax.setLayoutPath('./views/layouts');

app.get('/',function(req,res) {
  res.send("Hello World!");
})

app.listen(3000,function() {
  console.log("Server has started");
})

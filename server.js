var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'html');

app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res){
	res.render('index');
});

app.all('*', function(req, res) {
  console.log("HTTP: " + req.url);
  return res.redirect("http://" + req.headers["host"] + req.url);
});

app.listen(port);
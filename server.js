var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

// app.set('view engine', 'htm');

app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res){
	res.render('index');
});

app.listen(port);
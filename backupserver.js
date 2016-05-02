var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var redis           =	  require("redis");
var mysql           =	  require("mysql");
var session         =	  require('express-session');
var redisStore      =	  require('connect-redis')(session);
var cookieParser    =	  require('cookie-parser');
var path            =	  require("path");
var async           =	  require("async");
var client          =   redis.createClient();
var router          =	  express.Router();
var mysql = require('mysql');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


var pool	=	mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'redis_demo',
    debug    :  false
});

app.use(session({
		secret: 'ssshhhhh',
		store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
		saveUninitialized: false,
		resave: false
}));
app.use(cookieParser("secretSign#143_!223"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/',function(req,res){
  res.sendfile("index.html");
});

app.get('/shop.html',function(req,res){
	res.sendfile("product-details.html");
});

app.get('/checkout.html',function(req,res){
	res.sendfile("checkout.html");
});

app.get('/login.html',function(req,res){
	res.sendfile("login.html");
	console.log(req.body);
	//res.json({"error":true, "message":"test msg"});
	
});


app.get('/contact-us.html',function(req,res){
	res.sendfile("contact-us.html");
});

app.get('/cart.html',function(req,res){
	res.sendfile("cart.html");
});

function handle_database(req,type){

	console.log("i have beeen called");
}

app.post('/login.html', function(req,res){
	console.log(req.body.email);
	handle_database(req,"login",{
		
	});
	res.json({"email":req.body.email,"password":req.body.password});
	console.log("json format :"+ req.body.email);
	res.sendfile("dummy.html");
});

app.get('/dummy.html',function(req,res){
	res.writeHead(404,{"Content-Type":"application/json"});
});



app.listen(8080,function(){
  console.log("Started on PORT 8080");
})


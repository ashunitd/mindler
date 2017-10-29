var config=require('./config');
var mysql=require('mysql');
var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var app=express();
var http=require('http').Server(app);

var connection = mysql.createConnection({
					  host     : 'localhost',
					  user     : 'root',
					  password : '',
					  database : 'mindler',
					  multipleStatements: true
					});
 
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database");
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use(express.static(__dirname + '/public'));

var api=require('./app/routes/api')(app,express,connection);
app.use('/api',api)


app.get('*',function(req,res){
	res.sendFile(__dirname+'/public/views/index.html');

});



http.listen(config.port,function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('listening on port', http.address().port);

	}
})


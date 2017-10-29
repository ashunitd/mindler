var config=require('./config');
var mysql=require('mysql');
var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var app=express();
var http=require('http').Server(app);

// var connection = mysql.createConnection({
// 					  host     : 'us-cdbr-iron-east-05.cleardb.net',
// 					  user     : 'b34a8e07148a7d',
// 					  password : 'b9c7775c',
// 					  database : 'heroku_02dc774aa58a4ec',
// 					  multipleStatements: true
// 					});
 
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to database");
// });


function handleDisconnect() {
  connection = mysql.createConnection({host: 'us-cdbr-iron-east-05.cleardb.net',
					  user     : 'b34a8e07148a7d',
					  password : 'b9c7775c',
					  database : 'heroku_02dc774aa58a4ec',
					  multipleStatements: true}); 
                                                  

  connection.connect(function(err) {              
    if(err) {                                     
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                     
  });                                     
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                  
    }
  });
}

handleDisconnect();





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


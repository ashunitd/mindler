var mysql=require('mysql');
var jsonwebtoken=require('jsonwebtoken');
var config=require('../../config');
var secretkey=config.secretKey;

function createToken(results){

	var token=jsonwebtoken.sign({
		
		username:results[0].username
		
	}, secretkey,{
		expiresIn:1440
	});

	return token;

}




module.exports=function(app,express,connection){
	var api=express.Router();




  api.post('/login',function(req,res){
    
  var username=req.body.username;
    var password=req.body.password;
    connection.query('SELECT * FROM login WHERE username = ?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            error:error
            })
      }else{
        console.log(results[0]);
        if(results.length >0){
            var token=createToken(results);
            var username=results[0].username;
            if(password==results[0].password){
                res.json({
                    status:true,
                    message:'successfully logged in',
                    token:token

                })
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
  });


  api.use(function(req,res,next){
   console.log('ssomeone trying to connect');
   var token = req.body.token || req.param.token || req.headers['x-access-token'];
    
    
   if(token){

     jsonwebtoken.verify(token,secretkey,function(err,decoded){
       if(err){
         res.status(403).send({success:false,message:"failed to authenticate user"});

       }else{
          
         req.decoded=decoded;
          
         next();
       }
     });
   }else{
      
     res.status(403).send({success:false,message:'no token provided'});
   }
  });

  api.get('/me',function(req,res){
    
    res.json(req.decoded);

  });






api.post('/genesisdata',function(req,res){
		
	var uid=req.body.uid;
  var user_id=req.body.uid;

connection.query('SELECT users.uid,users.first_name,users.last_name,users.email,user_packages.package,user_packages.sub_package FROM users LEFT JOIN user_packages ON user_packages.user_id=users.uid WHERE uid = ?;SELECT test_result.user_id FROM test_result WHERE user_id=?;SELECT career_os_sd_match.os_parameter,career_os_sd_match.stanine as career_os_sd_match_stanine FROM career_os_sd_match WHERE user_id = ?;SELECT test_result.sub_dimension_id,test_result.stanine,interest.interests FROM test_result LEFT JOIN interest ON interest.id=test_result.sub_dimension_id WHERE user_id =?;SELECT final_calculation.career_id,final_calculation.match,career_domains.domain FROM final_calculation LEFT JOIN career_domains ON final_calculation.career_id=career_domains.id WHERE user_id=?;SELECT final_calculation.career_id,final_calculation.match,career_domains.domain FROM final_calculation LEFT JOIN career_domains ON career_domains.id=final_calculation.career_id WHERE user_id=? ORDER BY final_calculation.match DESC LIMIT 5 ',[uid,uid,uid,uid,uid,uid], function (error, results, fields) {
      if (error) {
          res.json({
           error,
            status:false,
            
            })
      }else{
        
        if(results.length >0){
              if(results[1]==''){
                results[1]={test_result:"NA"};
              }else{
                    results[1]={test_result:"Completed"};
              }
             res.json(results);
        }
        else{
          res.json({
              status:false,    
            message:"User Id does not exits"
          });
        }
      }
    })
  



  });






    




























	















	return api
}
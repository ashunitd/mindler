angular.module('loginController',[])


.controller('loginCtrl',function($route,$rootScope,$location,Auth){
	var vm=this;
	vm.usernames=[];
	
	vm.loggedIn=Auth.isLoggedIn();
	Auth.getUser()
			.then(function(data){
				vm.user=data.data;
				console.log(vm.user);
				
				
				

			});
	
	

	vm.doLogin=function(){
		vm.processing=true;
		vm.error='';
		
		

		Auth.login(vm.loginData.username,vm.loginData.password)
			.success(function(data){
				vm.error=data.data.message;
				console.log(vm.error);
				vm.processing=false;
				Auth.getUser()
					.then(function(data){
						$route.reload();
						});
					
			});
	}
	vm.doLogout=function(){
		Auth.logout();
		$route.reload();
	}



})
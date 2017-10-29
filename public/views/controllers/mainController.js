angular.module('mainController',[])

.controller('mainCtrl',function($rootScope,Search){
var vm=this;

vm.doSubmit=function(){
		
		

		Search.value(vm.searchData.search)
			.success(function(data){
				if(data[0]!=''){
					vm.data=data;
				}else{
					alert("Invalid User")
				}
				

				console.log(data);

				});
	}

});
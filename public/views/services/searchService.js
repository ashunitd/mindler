angular.module('searchService',[])

.factory('Search',function($http){
	  var searchFactory={};

	  searchFactory.value=function(uid){

	  	return $http.post('/api/genesisdata',{

	  		uid:uid
	  		
	  		})
	  	.success(function(data){
			

	  		return data;
	  	})
	  }
	  
	 	

	  return searchFactory;
})





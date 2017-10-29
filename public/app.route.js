angular.module('appRoutes',['ngRoute'])


	.config(function($routeProvider,$locationProvider){

		$routeProvider

			.when('/',{
				templateUrl:'views/pages/home.html',
				controller:'loginCtrl',
				controllerAs:'login'
				})
				
				
			
			
		$locationProvider.html5Mode(true);

})
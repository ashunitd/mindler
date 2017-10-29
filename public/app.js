angular.module('myApp',['appRoutes','mainController','searchService','loginController','loginService'])


.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
})
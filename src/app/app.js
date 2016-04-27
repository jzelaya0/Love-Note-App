angular.module('loveNote', [
  'appRoutes',
  'authService',
  'mainCtrl'
])


// integrate tokens in requests
.config(function ($httpProvider){

  // attach auth interceptor from auth service to the http requests
  $httpProvider.interceptors.push('AuthInterceptor');

});

angular.module('loveNote', [
  'appRoutes',
  'mainCtrl'
])


// integrate tokens in requests
.config(function ($httpProvider){

  // attach auth interceptor from auth service to the http requests
  $httpProvider.interceptor.push('AunthInterceptor');

});

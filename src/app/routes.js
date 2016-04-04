// src/app/routes.js
angular.module("appRoutes", ["ngRoute"])

  .config(function($routeProvider, $locationProvider){

      $routeProvider
      //Home page route
      .when('/', {
        templateUrl: 'app/views/templates/home.html'
      });

      $locationProvider.html5Mode(true);

  });

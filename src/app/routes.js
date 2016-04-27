// src/app/routes.js
angular.module("appRoutes", ["ngRoute"])

  .config(function($routeProvider, $locationProvider){

      $routeProvider
      //Home page route
      .when('/', {
        templateUrl: 'app/views/templates/home.html'
      })

      .when('/login', {
        templateUrl: 'app/views/templates/login.html',
        controller: 'mainController',
        controllerAs: 'login'
      });

      $locationProvider.html5Mode(true);

  });

// src/app/controllers/mainCtrl.js
angular.module('mainCtrl', [])

  .controller('mainController', function($rootScope, $location, Auth){
    var vm = this;

    // Check if user is logged in
    vm.loggedIn = Auth.isLoggedIn();

    // Every request checks if a user is logged in (route change)
    $rootScope.$on('$routeChangeStart', function(){
      //Checks for valid token
      vm.loggedIn = Auth.isLoggedIn();
    });

    //Get the user data from /api/me on page load
    Auth.getUser()
      .success(function(data){
        vm.user = data;
      });



    // Handle login form
    // ==============================
    vm.doLogin = function(){
      // User's inputted email and password to post to /authenticate endpoint
      Auth.login(vm.loginData.email, vm.loginData.password)
        .success(function(data){

          //Get user info once logged in
          Auth.getUser()
            .then(function(data){
              vm.user = data.data;
            });

          //Successful log in directs user to user's dashboard page
          $location.path('/dashboard');
        });
    };

    // Handle logout
    // ==============================
    vm.doLogOut = function() {
      Auth.logout();

      // Return user to the landing page
      $location.path('/');
    };


  });// End Main Controller

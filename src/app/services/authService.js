angular.module('authService', [])

// ==============================
// factory that handles token and
// store them in local storage
// ==============================
  .factory('AuthToken', function($window){
    // authToken object
    var authTokenFactory = {};

    // function to grab token from local storage
    authTokenFactory.getToken = function () {
      return $window.localStorage.getItem('token');
    };

    // function to set or clear token
    // if token passed, then set it
    // if no token, then clear it in local storage
    authTokenFactory.setToken = function (token){
      if(token){
        $window.localStorage.setItem('token', token);
      }else{
        $window.localStorage.removeItem('token');
      }
    };

    // return the token factory object
    return authTokenFactory;

  })

  // ==============================
  // factory to login user and get info
  // ==============================

  .factory('Auth', function ($http, $q, AuthToken){
    // auth object
    var authFactory = {};

    // function to log user in
    authFactory.login = function (username, password) {
      // return promise object and its data
      // post to the api's authenticate endpoint
      return $http.post('/api/authenticate', {
        email: email,
        password: password
      });
    };

    // function to log user out by clearing token
    authFactory.logout = function (){
      AuthToken.setToken();
    };

    // function to check if user is logged in
    authFactory.isLoggedIn = function (){
      if(AuthToken.getToken()){
        return true;
      }else {
        return false;
      }
    };

    // function to get logged in user
    authFactory.getUser = function (){
      if(AuthToken.getToken()) {
        return $http.get('/api/me');
      }else {
        return $q.reject({message: "User does not have a token"});
      }
    };

    // return auth factory object
    return authTokenFactory;

  })

  // ==============================
  // Factory to integrate token in http request
  // ==============================
  .factory('AunthInterceptor', function($q, $location, AuthToken){
    // interceptor object
    var interceptorFactory = {};

    // function to execute on all http requests
    interceptorFactory.request = function (config) {
      //get token
      var token = AuthToken.getToken();

      // Add existing token to http request header as x-access-token
      if (token) {
        config.headers['x-access-token'] = token;
      }

      return config;
    };

    // function that happens on response errors
    interceptorFactory.responseError = function (response) {
      // if server responds with 404 error
      if(response.status == 403) {
        // redirect to the login page
        $location.path('/login');
      }

      // return errors as a promise
      return $q.reject(response);
    };

    return interceptorFactory;
  });

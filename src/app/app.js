angular.module('loveNote', [])
  .controller("mainCtrl", function(){
    console.log("howdy");
    var vm = this;

    vm.helloWorld = function(){
      console.log("hola mundo!");
    }
  })

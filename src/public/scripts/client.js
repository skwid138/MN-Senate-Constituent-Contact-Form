/*jshint esversion: 6 */
console.log('client.js sourced');

// AngularJS and sourced in modules
const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'vcRecaptcha']);

myApp.config(function ($routeProvider) {

    // client side routing
    $routeProvider.when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeController as hc'
    }).otherwise('/');

}); // end config
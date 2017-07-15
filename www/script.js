var nameApp = angular.module('starter', ['ionic', 'ngMessages']);

nameApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('auth', {
            url: '/auth',
            templateUrl: 'auth.html',
            controller: 'AuthCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        });

    $urlRouterProvider.otherwise("/auth");

});


nameApp.controller('AuthCtrl', function($scope, $state) {

    $scope.authorization = {
        username: '',
        password : ''
    };

    $scope.signIn = function(form) {
        if(form.$valid) {
            $state.go('home');
        }
    };

});

nameApp.controller('HomeCtrl', function($scope) {

});
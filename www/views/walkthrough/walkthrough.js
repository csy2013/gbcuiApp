'use strict';
angular.module('gbcui_shopApp.walkthrough', [
    'gbcui_shopApp.walkthrough.controllers',
    'gbcui_shopApp.walkthrough.directives',
    'gbcui_shopApp.walkthrough.services'
]);

angular.module("gbcui_shopApp.walkthrough.controllers", []).controller("TestCtrl", ["$scope", function (e) {
}]);


angular.module("gbcui_shopApp.walkthrough.directives", []).directive("testDirective", ["$timeout", function (e) {
    return {
        restrict: "A", scope: {}, controller: ["$scope", function (e) {
        }], link: function (e, n, t, i) {
        }
    }
}]);


angular.module("gbcui_shopApp.walkthrough.services", []).service("TestService", ["$http", "$q", function (e, n) {
    this.testMethod = function () {
    }
}])
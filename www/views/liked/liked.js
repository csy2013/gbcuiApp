'use strict';
angular.module('gbcui_shopApp.liked', [
    'gbcui_shopApp.liked.directives',
    'gbcui_shopApp.liked.services',
    'gbcui_shopApp.liked.controllers'
]);


angular.module("gbcui_shopApp.liked.directives", []).directive("testDirective", ["$timeout", function (e) {
    return {
        restrict: "A", scope: {}, controller: ["$scope", function (e) {
        }], link: function (e, n, t, i) {
        }
    }
}]);
angular.module("gbcui_shopApp.liked.services", []).service("ListService", ["$http", "$q", function (e, n) {
    this.getUserLists = function () {
        var t = n.defer();
        return e.get("logged_user_db.json").success(function (e) {
            t.resolve(e.user.lists)
        }), t.promise
    }, this.getList = function (t) {
        var i = n.defer();
        return e.get("logged_user_db.json").success(function (e) {
            var n = _.find(e.user.lists, function (e) {
                return e.id == t
            });
            i.resolve(n)
        }), i.promise
    }
}]);

angular.module("gbcui_shopApp.liked.controllers", []).controller("LikedCtrl", ["$scope", "lists", function (e, n) {
    e.lists = n
}])
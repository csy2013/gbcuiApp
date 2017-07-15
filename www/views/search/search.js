'use strict';
angular.module('gbcui_shopApp.search', [
    'gbcui_shopApp.search.directives',
    'gbcui_shopApp.search.services',
    'gbcui_shopApp.search.controllers',
    'gbcui_shopApp.search.fashion.controllers',
    'gbcui_shopApp.search.filters'
]);

angular.module("gbcui_shopApp.search.controllers", []).controller("SearchCtrl", ["$scope", "FoodService", "results","SERVER_URL", function (e, n, t,s) {
    e.search = {query: ""},
        e.products = t,
        e.cancelSearch = function () {
        e.search = {query: ""}
    }
    e.serverUrl = s;
}])

angular.module("gbcui_shopApp.search.fashion.controllers", []).controller("FashionSearchCtrl", ["$scope", "FoodService", "results","SERVER_URL", function (e, n, t,s) {
        e.search = {query: ""},
            e.products = t,
            e.cancelSearch = function () {
                e.search = {query: ""}
            }
        e.serverUrl = s;
    }])


angular.module("gbcui_shopApp.search.directives", []).directive("testDirective", ["$timeout", function (e) {
    return {
        restrict: "A", scope: {}, controller: ["$scope", function (e) {
        }], link: function (e, n, t, i) {
        }
    }
}]);


angular.module("gbcui_shopApp.search.filters", []).filter("searchField", ["$parse", function (e) {
    function n(e) {
        return angular.isArray(e) ? e : Object.keys(e).map(function (n) {
            return e[n]
        })
    }

    return function (t) {
        var i, s;
        t = angular.isObject(t) ? n(t) : t;
        var o = Array.prototype.slice.call(arguments, 1);
        return angular.isArray(t) && o.length ? t.map(function (n) {
            return s = o.map(function (t) {
                return (i = e(t))(n)
            }).join(" "), angular.extend(n, {searchField: s})
        }) : t
    }
}]);

angular.module("gbcui_shopApp.search.services", []).service("TestService", ["$http", "$q", function (e, n) {
    this.testMethod = function () {
    }
}])
'use strict';
angular.module('gbcui_shopApp.getting-started', [
    'gbcui_shopApp.getting-started.directives',
    'gbcui_shopApp.getting-started.services',
    'gbcui_shopApp.getting-started.controllers'
]);

angular.module("gbcui_shopApp.getting-started.controllers", []).controller("GettingStartedCtrl", ["$scope", "$state", "$ionicSlideBoxDelegate", function (e, n, t) {
    e.skipIntro = function () {
        n.go("main.app.feed.fashion")
    }, e.show_call_to_action_button = !1, e.show_skip_button = !1;
    var i = t.$getByHandle("getting-started-slides");
    e.pagerClicked = function (e) {
        i.slide(e)
    }, e.slideChanged = function (n) {
        n + 1 === i.slidesCount() ? (e.show_call_to_action_button = !0, i.update()) : e.show_call_to_action_button = !1, n + 1 > 1 ? e.show_skip_button = !0 : e.show_skip_button = !1
    }, e.browsing = "Plus Size", e.pick_categories = {}, e.pick_categories.tops = !0, e.pick_categories.jackets = !0
}]);

angular.module("gbcui_shopApp.getting-started.directives", []).directive("customCheckbox", ["$ionicConfig", function (e) {
    return {
        restrict: "E",
        scope: {title: "@", model: "=ngModel"},
        replace: !0,
        transclude: !0,
        templateUrl: "views/getting-started/custom-checkbox.template.html",
        compile: function (n, t) {
            var i = n[0].querySelector(".checkbox");
            i.classList.add("checkbox-" + e.form.checkbox())
        }
    }
}]);

angular.module("gbcui_shopApp.getting-started.services", []).service("TestService", ["$http", "$q", function (e, n) {
    this.testMethod = function () {
    }
}]).controller("ListDetailsCtrl", ["$scope", "$state", "$rootScope", "list", function (e, n, t, i) {
    e.goBack = function () {
        var e = _.last(t.previousView);
        n.go(e.fromState, e.fromParams)
    }, e.list = i
}]).controller("NewListCtrl", ["$scope", "$state", "$rootScope", function (e, n, t) {
    e.cancel = function () {
        var e = _.last(t.previousView);
        n.go(e.fromState, e.fromParams)
    }, e.create = function () {
        var e = _.last(t.previousView);
        n.go(e.fromState, e.fromParams)
    }
}]);
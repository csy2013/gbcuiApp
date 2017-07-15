'use strict';
angular.module('gbcui_shopApp.filters', [
    'gbcui_shopApp.filters.services',
    'gbcui_shopApp.filters.directives',
    'gbcui_shopApp.filters.controllers'
]);

angular.module("gbcui_shopApp.filters.services", []).service("TestService", ["$http", "$q", function (e, n) {
    this.testMethod = function () {
    }
}]);

angular.module("gbcui_shopApp.filters.directives", []).directive("filterTabs", ["$ionicSlideBoxDelegate", function (e) {
    return {
        restrict: "A", scope: {slider: "@"}, controller: ["$scope", function (n) {
            var t = n.tabs = [], i = this;
            this.select = function (i) {
                angular.forEach(t, function (e) {
                    e.selected = !1
                }), i.selected = !0, e.$getByHandle(n.slider).slide(i.index - 1)
            }, this.addTab = function (e) {
                0 === t.length && i.select(e), t.push(e)
            }
        }]
    }
}]);
angular.module("gbcui_shopApp.filters.controllers", []).controller("FiltersCtrl", ["$scope", "$state", "$rootScope", "$ionicSlideBoxDelegate", function (e, n, t, i) {
        e.category_filter = "Fashion", e.tags_filter = {}, e.tags_filter.vegetables = !0, e.tags_filter.asian = !0,
        e.color_filter = "#c284e5", e.size_filter = "M", e.ingredients_filter = {},
        e.ingredients_filter.butter = !0, e.ingredients_filter.lemon = !0, e.show_filter = "Bars",
        e.budget_filter = "$", e.distance_filter = 30, e.bedrooms_filter = 3, e.bathroom_filter = 1,
        e.price_filter = {
        from: 144,
        to: 523
    }, e.price_filter_range = {min: 0, max: 800}, e.cancelRefine = function () {
        var e = _.last(t.previousView);
        n.go(e.fromState, e.fromParams)
    }, e.applyRefine = function () {
        var e = _.last(t.previousView);
        n.go(e.fromState, e.fromParams)
    }, e.lockSlide = function () {
        i.$getByHandle("filter-tabs-slider").enableSlide(!1)
    }
}]).directive("filterTab", function () {
    return {
        restrict: "E",
        require: "^filterTabs",
        templateUrl: "views/filters/tab.template.html",
        transclude: !0,
        replace: !0,
        scope: {index: "@tab"},
        link: function (e, n, t, i) {
            i.addTab(e), n.on("click", function (n) {
                i.select(e)
            })
        }
    }
}).directive("tagCheckbox", ["$ionicConfig", function (e) {
    return {
        restrict: "E",
        scope: {title: "@", model: "=ngModel"},
        replace: !0,
        transclude: !0,
        templateUrl: "views/filters/tag-checkbox.template.html",
        compile: function (n, t) {
            var i = n[0].querySelector(".checkbox");
            i.classList.add("checkbox-" + e.form.checkbox())
        }
    }
}]).directive("tagRadio", function () {
    return {
        restrict: "E",
        replace: !0,
        scope: {model: "=ngModel", value: "=ngValue", name: "@name"},
        transclude: !0,
        templateUrl: "views/filters/tag-radio.template.html",
        compile: function (e, n) {
            return function (e, n, t) {
                e.getValue = function () {
                    return e.ngValue || t.value
                }
            }
        }
    }
}).directive("colorRadio", function () {
    return {
        restrict: "E",
        replace: !0,
        scope: {model: "=ngModel", value: "=ngValue", name: "@name"},
        transclude: !0,
        templateUrl: "views/filters/color-radio.template.html",
        compile: function (e, n) {
            return function (e, n, t) {
                e.getValue = function () {
                    return e.ngValue || t.value
                }
            }
        }
    }
}).directive("numberInput", function () {
    return {
        restrict: "E",
        replace: !0,
        scope: {model: "=ngModel"},
        transclude: !0,
        templateUrl: "views/filters/number-input.template.html",
        controller: ["$scope", function (e) {
            e.minusOne = function () {
                e.model > 1 && (e.model = e.model - 1)
            }, e.plusOne = function () {
                e.model = e.model + 1
            }
        }]
    }
})
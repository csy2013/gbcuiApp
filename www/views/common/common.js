'use strict';
angular.module('gbcui_shopApp.common', [
    'gbcui_shopApp.common.directives',
    'gbcui_shopApp.common.controllers'
]);

angular.module("gbcui_shopApp.common.controllers", []).controller("AppCtrl", ["$scope", "$ionicHistory",  function (e, n) {
}]);


angular.module("gbcui_shopApp.common.directives", []).directive("multiBg", ["_", function (e) {
    return {
        scope: {multiBg: "=", interval: "=", helperClass: "@"},
        controller: ["$scope", "$element", "$attrs", function (n, t, i) {
            n.loaded = !1;
            var s = this;
            this.animateBg = function () {
                n.$apply(function () {
                    n.loaded = !0, t.css({"background-image": "url(" + n.bg_img + ")"})
                })
            }, this.setBackground = function (e) {
                n.bg_img = e
            }, e.isUndefined(n.multiBg) || (e.isArray(n.multiBg) && n.multiBg.length > 1 && !e.isUndefined(n.interval) && e.isNumber(n.interval) ? s.setBackground(n.multiBg[0]) : s.setBackground(n.multiBg[0]))
        }],
        templateUrl: "views/common/templates/multi-bg.html",
        restrict: "A",
        replace: !0,
        transclude: !0
    }
}])
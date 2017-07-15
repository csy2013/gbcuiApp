'use strict';
angular.module('gbcui_shopApp.shopping-cart', [
    'gbcui_shopApp.shopping-cart.directives',
    'gbcui_shopApp.shopping-cart.services',
    'gbcui_shopApp.shopping-cart.controllers'
]);


angular.module("gbcui_shopApp.shopping-cart.controllers", []).controller("ShoppingCartCtrl", ["$scope", "$state", "$rootScope", "$ionicActionSheet", "shoppingCart",
    "ShoppingCartService", "GetShoppingCart", "SERVER_URL", "ModifyCart", function (e, n, t, i, s, o, gsc, sl, ModifyCart) {
        console.log('ShoppingCartCrtl get Shopping Cart', s)
        e.shoppingCart = s;
        e.serverUrl = sl;
        var a = .07;
        e.minusOne = function (item, index) {
            if (angular.isNumber(item.quantity)) {
                item.quantity -= 1;
            } else {
                item.quantity = 1;
            }
            var obj = {removeSelected: false};
            obj['update_' + index] = item.quantity;
            ModifyCart.get(obj).$promise.then(function (response) {
                gsc.get(function (resp) {
                    e.shoppingCart = resp.resultData;
                }, function (err) {

                })
            }, function (error) {
            })
        };
        e.plusOne = function (item, index) {
            if (angular.isNumber(item.quantity)) {
                item.quantity += 1;
            } else {
                item.quantity = 1;
            }
            var obj = {removeSelected: false};
            obj['update_' + index] = item.quantity;
            ModifyCart.get(obj).$promise.then(function (response) {
                gsc.get(function (resp) {
                    e.shoppingCart = resp.resultData;
                }, function (err) {

                })
            }, function (error) {
            })
        }
        e.close = function () {
            var e = _.last(t.previousView);
            console.log(e)
            /*if(e.fromState) {
                n.go(e.fromState, e.fromParams)
            }else{*/
                n.go('main.app.feed.fashion')
            //}
        };
        e.removeFromCart = function (id) {
            i.show({
                titleText: "删除商品",
                destructiveText: "从购物车删除",
                cancelText: "取消",
                cancel: function () {
                    return !0
                },
                destructiveButtonClicked: function () {
                    var obj = {removeSelected: true, selectedItem: id};
                    ModifyCart.get(obj).$promise.then(function (response) {
                        gsc.get(function (resp) {
                            e.shoppingCart = resp.resultData;
                        }, function (err) {

                        })
                    }, function (error) {
                    });
                    return !0
                }
            })
        };


    }]);

angular.module("gbcui_shopApp.shopping-cart.directives", []).directive("testDirective", ["$timeout", function (e) {
    return {
        restrict: "A", scope: {}, controller: ["$scope", function (e) {
        }], link: function (e, n, t, i) {
        }
    }
}]);
angular.module("gbcui_shopApp.shopping-cart.services", []).service("ShoppingCartService", ["$http", "$q", "$rootScope", "GetShoppingCart", "GetShoppingCartCount", function (e, n, t, gsc, c) {
    this.getShoppingCart = function () {
        var defer = n.defer();
        return gsc.get(function (resp) {
            defer.resolve(resp.resultData)
        }, function (err) {
            n.reject(err)
        }), defer.promise
    };
    this.updatedProducts = function (e) {
        window.localStorage.gbcui_shopApp_cart = JSON.stringify(e), t.$broadcast("cart_updated", e)
    };
    this.addProduct = function (e) {
        var n = _.isUndefined(window.localStorage.gbcui_shopApp_cart) ? [] : JSON.parse(window.localStorage.gbcui_shopApp_cart), i = _.find(n, function (n) {
            return n.id == e.id
        });
        i || (n.push(e), t.$broadcast("cart_updated", n), t.$emit("cart_updated", n)), window.localStorage.gbcui_shopApp_cart = JSON.stringify(n)
    };
    this.removeProduct = function (e) {
        var n = JSON.parse(window.localStorage.gbcui_shopApp_cart), i = _.reject(n, function (n) {
            return n.id == e.id
        });
        window.localStorage.gbcui_shopApp_cart = JSON.stringify(i), t.$broadcast("cart_updated", i)
    };
    this.getShoppingCartCount = function () {
        var defer = n.defer();
        return c.get(function (resp) {
            console.log('GetShoppingCartCount:', resp)
            defer.resolve(resp.resultData.cartCount);
        }, function (err) {
            n.reject(err)
            console.log('GetShoppingCartCount:', err)
        }), defer.promise
    };
}])
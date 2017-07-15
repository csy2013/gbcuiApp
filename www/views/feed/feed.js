'use strict';
angular.module('gbcui_shopApp.feed', [
    'gbcui_shopApp.feed.directives',
    'gbcui_shopApp.feed.filters',
    'gbcui_shopApp.feed.services',
    'gbcui_shopApp.feed.controllers'
]);

angular.module("gbcui_shopApp.feed.controllers", []).controller("FeedCtrl", ["$scope", "$ionicScrollDelegate", "ShoppingCartService", "GetShoppingCartCount", function (e, n, t, c) {
    /*c.get(function (resp) {
        console.log('GetShoppingCartCount:', resp)
        e.shoppingCartCount = resp.resultData.cartCount;
    }, function (err) {
    });*/
     t.getShoppingCartCount().then(function(resp){
         e.shoppingCartCount = resp;
    });
    /*e.shoppingCartCount = function(){
         t.getShoppingCartCount().then(function(data){
            return data;
        });
    }*/
}]).controller("FashionCtrl", ["$scope", "$stateParams", "products", "SERVER_URL", function (e, n, t, s) {

    e.filters = n.filters, e.products = t
    e.serverUrl = s;
}]).controller("FoodCtrl", ["$scope", "products", "SERVER_URL", function (e, n, s) {
    e.products = n;
    e.serverUrl = s;
}]).controller("TravelCtrl", ["$scope", "products", "SERVER_URL", function (e, n, s) {
    console.log("TravelCtrl=========",n);
    e.products = n;
    e.serverUrl = s;
}]).controller("DealsCtrl", ["$scope", "products", function (e, n) {
    e.products = n
}]).controller("RealStateCtrl", ["$scope", "products", "SERVER_URL", function (e, n, s) {
    e.serverUrl = s;
    e.products = n
}]), angular.module("gbcui_shopApp.feed.directives", []).directive("slidingList", ["$ionicScrollDelegate", "$rootScope", "$state", function (e, n, t) {
    return {
        restrict: "E", transclude: !0, scope: {}, controller: ["$scope", "$element", "$attrs", function (n, i, s) {
            var o = n.items = [], a = (n.active_class = "", this), l = n.$on("$stateChangeSuccess", function (e, t, i, s, o) {
                if (console.log("state changed", t), console.log("active_class", n.active_class), console.log("from [" + s.name + "] indexOf", s.name.indexOf("main.app.feed")), console.log("to [" + t.name + "] indexOf", t.name.indexOf("main.app.feed")), -1 == s.name.indexOf("main.app.feed") && t.name.indexOf("main.app.feed") >= 0) {
                    console.log("**** Estoy navegando de otra tab hacia la tab de feed");
                    var l = a.getSelectedItem(), r = a.getItem(t.name);
                    console.log("selected_item", l), console.log("previous_item", r), l.state != r.state ? (n.$broadcast("item-selected", r), console.log("ANIMATING SCROLL")) : console.log("DONT ANIMATE SCROLL")
                }
            });
            n.$on("$destroy", function () {
                console.log("destroing feed directives scope, should clean up"), l()
            }), this.selectItem = function (e) {
                angular.forEach(o, function (e) {
                    e.selected = !1
                }), e.selected = !0, n.active_class = e.state, console.log("item selected", e.state)
            }, n.$on("item-selected", function (n, t) {
                a.selectItem(t);
                var s = i[0].querySelector(".scroll");
                console.log("scrolling, ITEM => ", t);
                var o = s.clientWidth, l = t.position.left - (o / 2 - t.position.width / 2);
                e.$getByHandle("sliding-list-scroll").scrollTo(l, 0, !0), console.log("fixing safari lazy repaint bug"), i[0].style.display = "none", i[0].offsetHeight, i[0].style.display = "block"
            }), this.addItem = function (e) {
                0 === o.length && console.log("The state is: ", t.current.name), e.index = o.length || 0, o.push(e), t.current.name == e.state && (console.log("The item is the same as the state. ITEM => ", e), n.$broadcast("item-selected", e))
            }, this.getItem = function (e) {
                var n = {};
                return angular.forEach(o, function (t) {
                    t.state == e && (n = t)
                }), n
            }, this.getSelectedItem = function () {
                var e = {};
                return angular.forEach(o, function (n) {
                    n.selected && (e = n)
                }), e
            }
        }], link: function (e, n, t, i) {
        }, templateUrl: "views/feed/templates/sliding-list.html"
    }
}]).directive("centerEdges", function () {
    return {
        priority: 100, scope: {}, link: function (e, n, t) {
            var i = n.children(), s = i.length, o = i[0], a = i[s - 1], l = angular.element("<li/>"), r = angular.element("<li/>");
            l.css("width", "calc(50vw - " + o.clientWidth / 2 + "px)"), r.css("width", "calc(50vw - " + a.clientWidth / 2 + "px)"), n.prepend(l), n.append(r)
        }, restrict: "A"
    }
}).directive("slidingItem", ["$ionicPosition", "$timeout", function (e, n) {
    return {
        restrict: "E",
        require: "^slidingList",
        transclude: !0,
        replace: !0,
        scope: {state: "@"},
        controller: ["$scope", "$element", "$attrs", function (e, n, t) {
            e.select = function (n) {
                e.$emit("item-selected", n)
            }
        }],
        link: function (t, i, s, o) {
            var a = i, l = {};
            n(function () {
                l = e.position(a), t.position = l, o.addItem(t)
            }, 0)
        },
        templateUrl: "views/feed/templates/sliding-item.html"
    }
}]), angular.module("gbcui_shopApp.feed.filters", []).filter("cleanStateClass", function () {
    return function (e) {
        return e.replace(/\./g, "-")
    }
}).filter("floor", function () {
    return function (e) {
        return Math.floor(e)
    }
});
angular.module("gbcui_shopApp.feed.services", []).service("FashionService", ["$http", "$q", "ProductSearch", "ProductSummary", "ConfigProductConfig", "ProductContent",
    "GetAssociatedProducts", "ProductBase", function (e, n, ProductSearch, ProductSummary, ConfigProductConfig, ProductContent, GetAssociatedProduct, ProductBase) {
        this.getProducts = function () {
            var t = n.defer();
            return ProductSearch.query({SEARCH_CATEGORY_ID: '10000'}, function (data) {
                if (data.resultData && data.resultData.productIds && data.resultData.productIds.length == 0) {
                }
                var products1 = [];
                if (data.resultData) {
                    var productIds = data.resultData.productIds;
                    if (productIds) {
                        angular.forEach(productIds, function (data1, index) {
                            ProductSummary.get({productId: data1}, function (response) {
                                var productinfo = response.resultData;
                                productinfo.id = index;
                                if (response.resultData) {
                                    if (response.resultData.productTypeId === 'AGGREGATED') {
                                        ConfigProductConfig.get({productId: data1}, function (response) {
                                            console.log(response)
                                            productinfo.totalPriceShow = true;
                                            productinfo.totalPrice = response.resultData.totalPrice;
                                        });
                                    }
                                }
                                console.log("productInfo:", productinfo)
                                products1.push(productinfo);
                            }, function (response) {
                                $q.reject(response.resultData);
                            });
                        })
                        t.resolve(products1)
                    }
                }
            }), t.promise
            /*  return e.get("fashion_db.json").success(function (e) {
             t.resolve(e.products)
             }), t.promise*/
        };
        this.getProduct = function (id) {
            var i = n.defer()
            return ProductSummary.get({productId: id}, function (data) {
                if (data.resultData) {
                    var product = data.resultData;
                    ProductContent.get({
                        productId: id,
                        contentTypeId: 'LONG_WAP_DESCRIPTION'
                    }, function (content) {
                        if (content.resultData && content.resultData.productContents) {
                            console.log(content)
                            product.wapDesc = content.resultData.productContents.LONG_WAP_DESCRIPTION;
                        }
                    });
                    GetAssociatedProduct.get({
                        productId: id,
                        type: 'ALSO_BOUGHT'
                    }, function (content) {
                        if (content.resultData && content.resultData.assocProducts) {
                            var s = content.resultData.assocProducts;
                            product.assocProducts = s;

                        }
                        i.resolve(product);
                    });
                }
            }),
                i.promise
        };

    }]).
    service("FoodService", ["$http", "$q", "ProductSearch", "ProductSummary", "ConfigProductConfig", "ProductReview", "ProductContent", "GetAssociatedProducts", function (e, n, ProductSearch, ProductSummary, ConfigProductConfig, ProductReview, ProductContent, GetAssociatedProducts) {
        this.getProducts = function () {
            var t = n.defer();
            return ProductSearch.query({SEARCH_CATEGORY_ID: '10001'}).$promise.then(function (data) {
                if (data.resultData && data.resultData.productIds && data.resultData.productIds.length == 0) {
                }
                var products1 = [];
                if (data.resultData) {
                    var productIds = data.resultData.productIds;
                    if (productIds) {
                        angular.forEach(productIds, function (data1) {
                            ProductSummary.get({productId: data1}).$promise.then(function (response) {
                                var productinfo = response.resultData;
                                if (response.resultData) {
                                    if (response.resultData.productTypeId === 'AGGREGATED') {
                                        ConfigProductConfig.get({productId: data1}).$promise.then(function (response) {
                                            console.log(response);
                                            productinfo.totalPriceShow = true;
                                            productinfo.totalPrice = response.resultData.totalPrice;
                                        })
                                    }
                                    ProductReview.get({productId: data1}).$promise.then(function (response) {
                                        console.log(response)
                                        if (response.resultData && response.resultData.averageRating) {
                                            productinfo.averageRating = response.resultData.averageRating;
                                        } else {
                                            productinfo.averageRating = 3;
                                        }
                                    });
                                }

                                products1.push(productinfo);
                            }, function (response) {
                                n.reject(response.resultData);
                            })
                        });
                        t.resolve(products1)
                    }
                }

            }), t.promise
        };

        this.getProduct = function (id) {
            var i = n.defer()
            return ProductSummary.get({productId: id}, function (data) {
                if (data.resultData) {
                    var product = data.resultData;
                    ProductContent.get({
                        productId: id,
                        contentTypeId: 'LONG_WAP_DESCRIPTION'
                    }, function (content) {
                        if (content.resultData && content.resultData.productContents) {
                            console.log(content)
                            product.wapDesc = content.resultData.productContents.LONG_WAP_DESCRIPTION;
                        }
                    });
                    GetAssociatedProducts.get({
                        productId: id,
                        type: 'ALSO_BOUGHT'
                    }, function (content) {
                        console.log('GetAssocProduct=========:', content)
                        if (content.resultData && content.resultData.assocProducts) {
                            var s = content.resultData.assocProducts;
                            product.assocProducts = s;

                        }
                        i.resolve(product);
                    });
                }
            }),
                i.promise
        }
    }]).service("DealsService", ["$http", "$q", function (e, n) {
        this.getProducts = function () {
            var t = n.defer();
            return e.get("deals_db.json").success(function (e) {
                t.resolve(e.products)
            }), t.promise
        }; this.getProduct = function (t) {
            var i = n.defer();
            return e.get("deals_db.json").success(function (e) {
                var n = _.find(e.products, function (e) {
                    return e.id == t
                });
                i.resolve(n)
            }), i.promise
        }
    }]).service("TravelService", ["$http", "$q", "ProductSearch", "ProductSummary", "ConfigProductConfig", "ProductReview", "ProductCategoryByParentId", function (e, n, ProductSearch, ProductSummary, ConfigProductConfig, ProductReview, pct) {
        this.getProducts = function () {
            var t = n.defer();
            return pct.get({categoryId: '10002'}).$promise.then(function (data) {
                if (data.resultData && data.resultData.categories) {
                    var products1 = [];
                    angular.forEach(data.resultData.categories[0].child, function (cdata) {
                        ProductSearch.query({SEARCH_CATEGORY_ID: cdata.productCategoryId}).$promise.then(function (pdata) {
                            if (pdata.resultData && pdata.resultData.productIds && pdata.resultData.productIds.length == 0) {
                            }
                            if (pdata.resultData) {
                                var productIds = pdata.resultData.productIds;
                                if (productIds) {
                                    angular.forEach(productIds, function (pidData) {
                                        ProductSummary.get({productId: pidData}).$promise.then(function (response) {
                                            var productinfo = response.resultData;
                                            productinfo.categoryName = cdata.categoryName;
                                            if (response.resultData) {
                                                if (response.resultData.productTypeId === 'AGGREGATED') {
                                                    ConfigProductConfig.get({productId: data1}).$promise.then(function (response) {
                                                        console.log(response);
                                                        productinfo.totalPriceShow = true;
                                                        productinfo.totalPrice = response.resultData.totalPrice;
                                                    })
                                                }
                                                ProductReview.get({productId: pidData}).$promise.then(function (response) {
                                                    if (response.resultData) {
                                                        productinfo.averageRating = response.resultData.averageRating;
                                                    } else {
                                                        productinfo.averageRating = 3;
                                                    }
                                                });
                                            }
                                            products1.push(productinfo);
                                        }, function (response) {
                                            n.reject(response.resultData);
                                        })
                                    });
                                }
                            }
                        })
                    });
                    t.resolve(products1)

                }
            }), t.promise
        };
        this.getProduct = function (t) {
            var i = n.defer();
            return e.get("travel_db.json").success(function (e) {
                var n = _.find(e.products, function (e) {
                    return e.id == t
                });
                i.resolve(n)
            }), i.promise
        }
    }]).service("RealStateService", ["$http", "$q", "ProductSearch", "ProductSummary", "ConfigProductConfig", "ProductReview", "ProductCategoryByParentId", function (e, n, ProductSearch, ProductSummary, ConfigProductConfig, ProductReview, pct) {

        this.getProducts = function () {
            var t = n.defer();
            return pct.get({categoryId: '10004'}).$promise.then(function (data) {
                if (data.resultData && data.resultData.categories) {
                    var allCategries = [];
                    angular.forEach(data.resultData.categories[0].child, function (cdata) {
                        var category = {categoryName: cdata.categoryName};
                        var products = [];
                        ProductSearch.query({SEARCH_CATEGORY_ID: cdata.productCategoryId}).$promise.then(function (pdata) {
                            if (pdata.resultData && pdata.resultData.productIds && pdata.resultData.productIds.length == 0) {
                            }
                            if (pdata.resultData) {
                                var productIds = pdata.resultData.productIds;
                                if (productIds) {
                                    angular.forEach(productIds, function (pidData) {
                                        ProductSummary.get({productId: pidData}).$promise.then(function (response) {
                                            var productinfo = response.resultData;
                                            productinfo.categoryName = cdata.categoryName;
                                            if (response.resultData) {
                                                if (response.resultData.productTypeId === 'AGGREGATED') {
                                                    ConfigProductConfig.get({productId: data1}).$promise.then(function (response) {
                                                        console.log(response);
                                                        productinfo.totalPriceShow = true;
                                                        productinfo.totalPrice = response.resultData.totalPrice;
                                                    })
                                                }
                                                ProductReview.get({productId: pidData}).$promise.then(function (response) {
                                                    if (response.resultData) {
                                                        productinfo.averageRating = response.resultData.averageRating;
                                                    } else {
                                                        productinfo.averageRating = 3;
                                                    }
                                                });
                                            }
                                            products.push(productinfo);
                                        }, function (response) {
                                            n.reject(response.resultData);
                                        })
                                    });
                                }
                            }
                        });
                        category.products = products;
                        allCategries.push(category);
                    });
                    console.log(allCategries)
                    t.resolve(allCategries)
                }
            }), t.promise
        };
        this.getProduct = function (t) {
            var i = n.defer();
            return e.get("real_state_db.json").success(function (e) {
                var n = _.find(e.products, function (e) {
                    return e.id == t
                });
                i.resolve(n)
            }), i.promise
        }
    }])
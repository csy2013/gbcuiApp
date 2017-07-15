'use strict';
angular.module('gbcui_shopApp.content', [
    'gbcui_shopApp.content.directives',
    'gbcui_shopApp.content.controllers'
]);

angular.module("gbcui_shopApp.content.controllers", []).controller("FashionContentCtrl", ["$scope", "$state", "$ionicPopup", "$rootScope", "product", "ShoppingCartService",
    "$ionicLoading", "SERVER_URL", "$ionicActionSheet", "$timeout", "VariantProductQuery","AddItemToShoppingCart","$q", function (e, n, t, i, s, o, a, su, ias, timeout, vpq,AddItemToShoppingCart,q) {

        e.serverUrl = su;
        e.goBack = function () {
            var e = _.last(i.previousView);
            n.go(e.fromState, e.fromParams)
        };
        console.log("product info:", s);
        e.product = s;

        var l = {}, r = {};


        e.featureColor = "颜色", e.featureSize = '尺寸';
        e.colorList = [{colorId: 'White', colorName: '白色'}, {colorId: 'Navy', colorName: '藏青色'}, {
            colorId: 'Coral',
            colorName: '珊瑚色'
        }, {colorId: 'Lime', colorName: '绿黄色'}];
        e.sizeList = [{sizeId: 'XS', sizeName: '特小号'}, {sizeId: 'S', sizeName: '小号'}, {
            sizeId: 'M',
            sizeName: '中号'
        }, {sizeId: 'L', sizeName: '大号'}, {sizeId: 'XL', sizeName: '特大号'}];
        e.chosen_color = "Navy", e.chosen_size = "M";

        e.featureColorChange = function (color) {
            e.chosen_color = color.colorId
        };
        e.openColorChooser = function () {
            l = t.show({
                cssClass: "popup-outer color-chooser-view",
                templateUrl: "views/content/fashion/color-chooser.html",
                scope: angular.extend(e, {data_chosen_color: e.chosen_color, colorList: e.colorList}),
                title: "颜色",
                buttons: [{
                    text: "关闭", type: "close-popup",
                    onTap: function (o) {
                        e.featureColor = _.find(e.colorList, function (color) {
                            return color.colorId == e.chosen_color;
                        }).colorName;
                    }
                }]
            })
        };

        e.featureSizeChange = function (size) {
            e.chosen_size = size.sizeId
        };
        e.openSizeChooser = function () {
            r = t.show({
                cssClass: "popup-outer size-chooser-view",
                templateUrl: "views/content/fashion/size-chooser.html",
                scope: angular.extend(e, {chosen_size: e.chosen_size}),
                title: "尺寸",
                buttons: [{
                    text: "关闭", type: "close-popup", onTap: function (o) {
                        e.featureSize = _.find(e.sizeList, function (size) {
                            return size.sizeId == e.chosen_size
                        }).sizeName;
                    }
                }]
            })
        };

        if (s.isVirtual === 'Y' && s.variantTreeChoose) {
            e.variantTreeChoose = s.variantTreeChoose;
            e.choosen_features_names = {};
            e.choosen_features_ids = {};
            e.showSubmitBtn = 0;
        } else {
            e.showSubmitBtn = 1;
        }

        e.openFeatureChooser = function (name, features) {
            console.log('feature name:', name);
            console.log('feature feature:', features);

            e.featureChange = function (feature) {
                console.log('featureChange:', feature);
                e.chosen_feature = feature.productFeatureId;

                var choosenFeature = _.find(features, function (feature) {
                    console.log('e.chosen_feature:', e.chosen_feature)
                    return feature.productFeatureId == e.chosen_feature
                });
                e.choosen_features_names[name] = choosenFeature.description;
                e.choosen_features_ids[feature.productFeatureTypeId] = choosenFeature.productFeatureId;
                console.log('choosen_features_names:', e.choosen_features_names);
                console.log('choosen_features_ids:', e.choosen_features_ids);

                //计算出对应的变形产品
                //当全部选择后查询出变形产品
                var selectFeatureCount = Object.getOwnPropertyNames(e.variantTreeChoose).length;
                var choosen_features_count = Object.getOwnPropertyNames(e.choosen_features_ids).length;
                if (choosen_features_count === selectFeatureCount) {
                    vpq.get({
                        productId: e.product.productId,
                        selectedFeatures: angular.toJson(e.choosen_features_ids)
                    }).$promise.then(function (response) {
                            console.log(response);
                            if (response.resultData && response.resultData.variantProduct) {
                                e.cartItem.add_product_id = response.resultData.variantProduct.productId;
                                e.product.priceResult.defaultPrice = response.resultData.variantProduct.price;
                                e.showSubmitBtn = true;
                            }
                        }, function (error) {
                            console.log(error);
                        });
                }
            };

            r = t.show({
                cssClass: "popup-outer size-chooser-view",
                templateUrl: "views/content/fashion/feature-chooser.html",
                scope: angular.extend(e, {chosen_feature: e.chosen_feature, features: features}),
                title: name,
                buttons: [{
                    text: "关闭", type: "close-popup", onTap: function (o) {

                    }
                }]
            })
        };
        e.addToCart = function (cart) {
            cart.product_id = e.product.productId;
            if(!cart.add_product_id){
                cart.add_product_id = e.product.productId;
            }
            console.log('addToCart:', cart)
            a.show({
                template: "加入购物车",
                duration: 1e3
            });
            AddItemToShoppingCart.get(cart,function(resp){
                if(resp){
                    n.go('main.app.shopping-cart');
                }

            },function(err){
                q.reject(err);
            })
        };
        //定义cart及数量
        e.cartItem = {};
        e.cartItem.quantity = 1;
        e.minusOne = function (n) {
            if (angular.isNumber(n)) {
                if (n > 1) {
                    e.cartItem.quantity = n - 1;
                } else {
                    e.cartItem.quantity = 1;
                }
            } else {
                e.cartItem.quantity = 1;
            }
        };

        e.plusOne = function (n) {
            if (angular.isNumber(n)) {
                e.cartItem.quantity = n + 1;
            } else {
                e.cartItem.quantity = 1;
            }
        }

        e.scenes = [
            {
                label: "会话",
                value: 0
            },
            {
                label: "朋友圈",
                value: 1
            },
            {
                label: "收藏",
                value: 2
            }
        ];
        var msg = {};
        msg.title = s.productName;
        msg.description = s.description;
        msg.thumb = su + s.smallImageUrl;
        msg.media = {};
        msg.media.webpageUrl = "www.yuaoq.com/alifind";
        e.socialShare = function (id) {
            cordova.exec(function (result) {
                console.log('分享成功');
            }, function (error) {
                console.log('分享失败');
                console.debug(error)
            }, "ShareSDK", "share", [msg.title, msg.description, msg.thumb, msg.media.webpageUrl]);

        };
        console.log('dddd')

    }]).
    controller("FoodContentCtrl", ["$scope", "$state", "$rootScope", "$ionicPopup", "product", "SERVER_URL", function (e, n, t, i, s, su) {
        e.serverUrl = su;
        e.goBack = function () {
            var e = _.last(t.previousView);
            n.go(e.fromState, e.fromParams)
        }, e.product = s;
        e.product.selected_schedule = {name: "今日 上午8:00-下午12:00"},
            e.product.dishes = [{
                name: "新疆大盘鸡",
                rating: 4
            }, {name: "北京烤鸭", rating: 2}], e.product.addresses = [{
            street: "0 Waubesa Junction",
            city: "Houston",
            state: "TX",
            postal_code: "77020",
            phone: "1-(713)471-0205",
            lat: 43.07493,
            lng: -89.381388
        }, {
            street: "50 Northfield Way",
            city: "Brooklyn",
            state: "NY",
            postal_code: "11210",
            phone: "1-(347)846-3569",
            lat: 43.07493,
            lng: -88.381388
        }], e.product.selected_address = s.addresses[0], e.selectAddress = function (n) {
            e.product.selected_address = n, a.close()
        };
        var o = {}, a = {};
        e.openSchedules = function () {
            o = i.show({
                cssClass: "popup-outer food-schedules-view",
                templateUrl: "views/content/food/schedules.html",
                scope: angular.extend(e, {}),
                title: "更多",
                buttons: [{text: "关闭", type: "close-popup"}]
            })
        }, e.openAddresses = function () {
            a = i.show({
                cssClass: "popup-outer food-addresses-view",
                templateUrl: "views/content/food/addresses.html",
                scope: angular.extend(e, {
                    addresses: e.product.addresses,
                    selected_address: e.product.selected_address
                }),
                title: "地址",
                buttons: [{text: "关闭", type: "close-popup"}]
            })
        }, e.$on("mapInitialized", function (n, t) {
            e.map = t
        })
    }]).controller("TravelContentCtrl", ["$scope", "$state", "$rootScope", "product", function (e, n, t, i) {
        e.goBack = function () {
            var e = _.last(t.previousView);
            n.go(e.fromState, e.fromParams)
        }, e.product = i
    }]).controller("DealsContentCtrl", ["$scope", "$state", "$rootScope", "product", function (e, n, t, i) {
        e.goBack = function () {
            var e = _.last(t.previousView);
            n.go(e.fromState, e.fromParams)
        }, e.product = i
    }]).controller("RealStateContentCtrl", ["$scope", "$state", "$rootScope", "product", function (e, n, t, i) {
        e.goBack = function () {
            var e = _.last(t.previousView);
            n.go(e.fromState, e.fromParams)
        }, e.product = i
    }]);
angular.module("gbcui_shopApp.content.directives", []).directive("progressBar", function () {
    return {
        restrict: "E",
        scope: {min: "@", max: "@", model: "=ngModel"},
        replace: !0,
        templateUrl: "views/content/food/progress-bar.template.html"
    }
}), angular.module("gbcui_shopApp.content.services", []).service("TestService", ["$http", "$q", function (e, n) {
    this.testMethod = function () {
    }
}])
'use strict';
angular.module('gbcui_shopApp.resource', [
    'gbcui_shopApp.resource.services'
]);
angular.module('gbcui_shopApp.resource.services', ['ngResource','LocalStorageModule']);


angular.module('gbcui_shopApp.resource.services')
    .constant('SERVER_URL', 'http://gbcui.com')
    .constant('PRODUCT_SERVER_URL', 'http://gbcui.com/mobile-token/api/product.')
    .constant('ORDER_SERVER_URL', 'http://gbcui.com/mobile-token/api/order.')
    .constant('ACCOUNT_SERVER_URL', 'http://gbcui.com/mobile-token/api/account.')
    .constant('COMMON_SERVER_URL', 'http://gbcui.com/mobile-token/api/common.')
    .constant('CONTENT_SERVER_URL', 'http://gbcui.com/mobile-token/api/content.')
    .constant('HUMANRES_SERVER_URL', 'http://gbcui.com/mobile-token/api/humanres.')
    .constant('MARKET_SERVER_URL', 'http://gbcui.com/mobile-token/api/market.')
    .constant('PARTY_SERVER_URL', 'http://gbcui.com/mobile-token/api/party.')
    .constant('AUTH_SERVER_URL', 'http://gbcui.com/mobile-token/auth')
    .constant('OAUTH_BASE_URL','http://gbcui.com/mobile-token/api')
    .constant('OAUTH_SERVER_URL','http://gbcui.com/mobile-token/api')

    //.constant('SERVER_URL', 'http://10.9.16.89')
    //.constant('PRODUCT_SERVER_URL', 'http://10.9.16.89:8080/mobile-token/api/product.')
    //.constant('ORDER_SERVER_URL', 'http://10.9.16.89:8080/mobile-token/api/order.')
    //.constant('ACCOUNT_SERVER_URL', 'http://10.9.16.89:8080/mobile-token/api/account.')
    //.constant('COMMON_SERVER_URL', 'http://10.9.16.89:8080/mobile-token/api/common.')
    //.constant('CONTENT_SERVER_URL', 'http://10.9.16.89:8080/mobile-token/api/content.')
    //.constant('HUMANRES_SERVER_URL', 'http://10.9.16.89:8080/mobile-token/api/humanres.')
    //.constant('MARKET_SERVER_URL', 'http://10.9.16.89:8080/mobile-token/api/market.')
    //.constant('PARTY_SERVER_URL', 'http://10.9.16.89:8080/mobile-token/api/party.')
    //.constant('AUTH_SERVER_URL', 'http://10.9.16.89:8080/mobile-token/auth')

    //.constant('SERVER_URL', 'https://yuaoq.com')
    //.constant('PRODUCT_SERVER_URL', 'https://yuaoq.com/mobile-token/api/product.')
    //.constant('ORDER_SERVER_URL', 'https://yuaoq.com/mobile-token/api/order.')
    //.constant('ACCOUNT_SERVER_URL', 'https://yuaoq.com/mobile-token/api/account.')
    //.constant('COMMON_SERVER_URL', 'https://yuaoq.com/mobile-token/api/common.')
    //.constant('CONTENT_SERVER_URL', 'https://yuaoq.com/mobile-token/api/content.')
    //.constant('HUMANRES_SERVER_URL', 'https://yuaoq.com/mobile-token/api/humanres.')
    //.constant('MARKET_SERVER_URL', 'https://yuaoq.com/mobile-token/api/market.')
    //.constant('PARTY_SERVER_URL', 'https://yuaoq.com/mobile-token/api/party.')
    //.constant('AUTH_SERVER_URL', 'https://yuaoq.com/mobile-token/auth')

    .constant('AUTH_EVENTS', {
        unauthorized: 'auth-not-authorized',
        forbidden: 'page-is-forbidden',
        pageNotFound: 'page-not-find'
    })
    .constant('USER_ROLES', {
        loginUser: 'user_role',
        anonymousUser: 'anonymous_role'
    }).factory('authHttpInterceptor', ['localStorageService', '$rootScope', 'AUTH_EVENTS', '$q', function (localStorageService, $rootScope, AUTH_EVENTS, $q) {
        return {
            request: function (config) { 
                if (config.skipAuthorization) {
                    return config;
                }
                if (config.urlParam) {
                    config.params = config.params || {};
                    // Already has the token in the url itself
                    if (config.params[config.urlParam]) {
                        return config;
                    }
                } else {
                    config.headers = config.headers || {};
                    // Already has an Authorization header
                    if (config.headers['X-Auth-Token']) {
                        return config;
                    }
                }
                if (localStorageService.get('appToken')) {
                    config.headers['X-Auth-Token'] = localStorageService.get('appToken');
                }

                return config;
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.unauthorized,
                    403: AUTH_EVENTS.forbidden,
                    404: AUTH_EVENTS.pageNotFound
                }[response.status], response);
                return $q.reject(response);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authHttpInterceptor');
    }])

    /*  .config(function Config($httpProvider, jwtInterceptorProvider) {
     // Please note we're annotating the function so that the $injector works when the file is minified
     jwtInterceptorProvider.tokenGetter = ['GetToken', function(GetToken) {
     GetToken.get({productId: data});
     return localStorage.getItem('id_token');
     }];
     $httpProvider.interceptors.push('jwtInterceptor');
     })*/
    //product
    .factory('ProductSearch', ['$resource', 'PRODUCT_SERVER_URL',
        function ($resource, PRODUCT_SERVER_URL) {
            return $resource(PRODUCT_SERVER_URL + 'productSearch', {},
                {
                    query: {
                        method: 'POST',
                        skipAuthorization: true,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest: transformRequest
                    }

                }
            );
        }
    ])
    .factory('ProductSummary', ['$resource', 'PRODUCT_SERVER_URL',
        function ($resource, PRODUCT_SERVER_URL) {
            return $resource(PRODUCT_SERVER_URL + 'productSummary',
                {},
                {
                    get: {
                        method: 'POST',
                        skipAuthorization: true,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest: transformRequest
                    }
                }
            );
        }
    ])
    .factory('ProductContent', ['$resource', 'PRODUCT_SERVER_URL',
        function ($resource, PRODUCT_SERVER_URL) {
            return $resource(PRODUCT_SERVER_URL + 'productContent',
                {},
                {
                    get: {
                        method: 'POST',
                        skipAuthorization: true,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest: transformRequest
                    }
                }
            );
        }
    ])

    .factory('ProductReview', ['$resource', 'PRODUCT_SERVER_URL',
        function ($resource, PRODUCT_SERVER_URL) {
            return $resource(PRODUCT_SERVER_URL + 'productReview',
                {},
                {
                    get: {
                        method: 'POST',
                        skipAuthorization: true,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest: transformRequest
                    }
                }
            );
        }
    ]).factory('ProductBase', ['$resource', 'PRODUCT_SERVER_URL',
        function ($resource, PRODUCT_SERVER_URL) {
            return $resource(PRODUCT_SERVER_URL + 'productSummary',
                {},
                {
                    get: {
                        method: 'POST',
                        skipAuthorization: true,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        transformRequest: transformRequest
                    }
                }
            );
        }
    ]).factory('ProductCategoryList', ['$resource', 'PRODUCT_SERVER_URL', function ($resource, PRODUCT_SERVER_URL) {
        return $resource(PRODUCT_SERVER_URL + 'productCategoryList',
            {}, {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }]).factory('ProductCategory', ['$resource', 'PRODUCT_SERVER_URL', function ($resource, PRODUCT_SERVER_URL) {
        return $resource(PRODUCT_SERVER_URL + 'productCategory',
            {}, {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }]).factory('ProductCategoryByCatalogAndType', ['$resource', 'PRODUCT_SERVER_URL', function ($resource, PRODUCT_SERVER_URL) {
        return $resource(PRODUCT_SERVER_URL + 'productCategoryByCatalogAndType',
            {}, {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }]).factory('ProductCategoryByParentId', ['$resource', 'PRODUCT_SERVER_URL', function ($resource, PRODUCT_SERVER_URL) {
        return $resource(PRODUCT_SERVER_URL + 'productCategoryByParentId',
            {}, {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }]).factory('CategoryProducts', ['$resource', 'PRODUCT_SERVER_URL', function ($resource, PRODUCT_SERVER_URL) {
        return $resource(PRODUCT_SERVER_URL + 'categoryProducts',
            {},
            {
                get: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }])
    .factory('VariantProductQuery', ['$resource', 'PRODUCT_SERVER_URL', function ($resource, PRODUCT_SERVER_URL) {
        return $resource(PRODUCT_SERVER_URL + "variantProductQuery",
            {},
            {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }]).factory('ConfigProductConfig', ['$resource', 'PRODUCT_SERVER_URL', function ($resource, PRODUCT_SERVER_URL) {
        return $resource(PRODUCT_SERVER_URL + "configProductConfig",
            {},
            {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }]).factory('GetAssociatedProducts', ['$resource', 'PRODUCT_SERVER_URL', function ($resource, PRODUCT_SERVER_URL) {
        return $resource(PRODUCT_SERVER_URL + "getAssociatedProducts",
            {},
            {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }])

//common service
    .factory('UserLogin', ['$resource', 'AUTH_SERVER_URL', function ($resource, AUTH_SERVER_URL) {
        return $resource(AUTH_SERVER_URL,
            {},
            {
                get: {
                    skipAuthorization: true,
                    method: 'POST',
                }
            });
    }]).factory('GetAssociatedStateList', ['$resource', 'COMMON_SERVER_URL', function ($resource, COMMON_SERVER_URL) {
        return $resource(COMMON_SERVER_URL + "getAssociatedStateList",
            {}, {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            })
    }]).factory('GetStorePaymentOptions', ['$resource', 'COMMON_SERVER_URL', function ($resource, COMMON_SERVER_URL) {
        return $resource(COMMON_SERVER_URL + 'getStorePaymentOptions',
            {},
            {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }

            })
    }])
//party service

    .factory('PersonBaseQuery', ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + 'personBaseQuery',
            {},
            {
                get: {
                    method: 'POST'
                }
            })
    }])
    .factory('PersonScoreQuery', ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personScoreQuery",
            {},
            {
                get: {
                    method: 'POST'
                }
            }
        )
    }]).factory('PersonAddressQuery', ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personAddressQuery",
            {},
            {
                get: {
                    method: 'POST'
                }
            }
        )
    }]).factory("PersonAddressDetail", ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personAddressDetail",
            {},
            {
                get: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            })
    }])
    .factory("PersonAddressUpdate", ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personAddressUpdate",
            {},
            {
                update: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            })
    }])

    .factory("PersonAddressAdd", ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personAddressAdd",
            {},
            {
                save: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            })
    }]).factory("PersonAddressDel", ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personAddressDel",
            {},
            {
                get: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            })
    }])
    .factory('PersonBaseSave', ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personBaseSave",
            {},
            {
                save: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }])
    .factory('PersonContentUpload', ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personContentUpload",
            {},
            {
                upload: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }])
    .factory('PersonContent', ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personContent",
            {},
            {
                get: {
                    method: 'POST'
                }
            }
        )
    }])
    .factory('PersonProfileDefault', ['$resource', "PARTY_SERVER_URL", function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personProfileDefault",
            {},
            {
                get: {
                    method: 'POST'
                }
            }
        )
    }])
    //设置默认收货地址
    .factory('SetDefaultPersonProfile', ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "setPartyProfileDefaults",
            {},
            {
                set: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            })
    }]).factory('PersonAddressDefault', ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personAddressDefault",
            {},
            {
                get: {
                    method: 'POST'
                }
            })
    }]).factory('PersonRegister', ['$resource', 'PARTY_SERVER_URL', function ($resource, PARTY_SERVER_URL) {
        return $resource(PARTY_SERVER_URL + "personRegister",
            {},
            {
                get: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            })
    }])
    //orderService
    .factory('AddItemToShoppingCart', ['$resource', 'ORDER_SERVER_URL', function ($resource, ORDER_SERVER_URL) {
        return $resource(ORDER_SERVER_URL + "addItemToShoppingCart",
            {

                //变形产品
                //FTCOLOR:0
                //FTDIMENSION:10010REMIN
                ///////
                //配置产品
                //0:0
                //1:0
            },
            {
                get: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest

                }
            }
        )
    }])

    .factory('GetShoppingCart', ['$resource', 'ORDER_SERVER_URL', function ($resource, ORDER_SERVER_URL) {
        return $resource(ORDER_SERVER_URL + "getShoppingCart",
            {},
            {
                get: {
                    method: 'POST'
                }
            }
        )
    }])
    .factory('GetShoppingCartCount', ['$resource', 'ORDER_SERVER_URL', function ($resource, ORDER_SERVER_URL) {
        return $resource(ORDER_SERVER_URL + "getShoppingCartCount",
            {},
            {
                get: {
                    method: 'POST'
                }
            }
        )
    }])
    .factory('ModifyCart', ['$resource', 'ORDER_SERVER_URL', function ($resource, ORDER_SERVER_URL) {
        return $resource(ORDER_SERVER_URL + "modifyCart", {},
            {
                get: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest
                }
            }
        )
    }]).factory('GetCartShipments', ['$resource', 'ORDER_SERVER_URL', function ($resource, ORDER_SERVER_URL) {
        return $resource(ORDER_SERVER_URL + "getCartShipments",
            {}, {
                get: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest

                }
            }
        )
    }]).factory('OrderCheckout', ['$resource', 'ORDER_SERVER_URL', function ($resource, ORDER_SERVER_URL) {
        return $resource(ORDER_SERVER_URL + "checkout",
            {}, {
                get: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest

                }
            }
        )
    }]).factory('GetOrderHistory', ['$resource', 'ORDER_SERVER_URL', function ($resource, ORDER_SERVER_URL) {
        return $resource(ORDER_SERVER_URL + "getOrderHistory",
            {}, {
                get: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transformRequest

                }
            }
        )
    }])
//get util method
    .factory('NewTimesData', ['$resource', function ($resource, PRODUCT_SERVER_URL) {
        return $resource(PRODUCT_SERVER_URL + 'fitbit/new/timerange/:id/:activity/:startDate/:startTime/:endTime',
            {id: '@id', activity: '@activity', startDate: '@startDate', startTime: '@startTime', endTime: '@endTime'});
    }])
    .factory('goPage', ['$state', function ($state) {
        return $state.go({url: '@url'}, {params: '@params'}, {reload: '@reload'});
    }]);


/**
 * The workhorse; converts an object to x-www-form-urlencoded serialization.
 * @param {Object} obj
 * @return {String}
 */
var param = function (obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        }
        else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        }
        else if (value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    //console.log("query="+query)

    return query.length ? query.substr(0, query.length - 1) : query;
};

// Override $http service's default transformRequest
var transformRequest = [function (data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
}];








angular.module("underscore", []).factory("_", function () {
    return window._
}), angular.module("gbcui_shopApp",
    ["ionic", 'ngCordova', 'gbcui_shopApp.resource', "yabiz_shopApp.views","gbcui_shopApp.common.controllers",
        "gbcui_shopApp.common", "gbcui_shopApp.account",
        "gbcui_shopApp.auth", "gbcui_shopApp.checkout",
        "gbcui_shopApp.content", "gbcui_shopApp.feed", "gbcui_shopApp.sort",
        "gbcui_shopApp.filters", "gbcui_shopApp.getting-started",
        "gbcui_shopApp.liked", "gbcui_shopApp.search", "gbcui_shopApp.shopping-cart",
        "gbcui_shopApp.walkthrough", "underscore", "angularMoment", "ngMap", "ngRangeSlider", "ngMessages"])

    .run(["$ionicPlatform", "amMoment", "$rootScope", function (e, n, t) {
        t.previousView = [], t.$on("$stateChangeSuccess", function (e, n, i, s, o) {
            var a = _.last(t.previousView);
            a && a.fromState === n.name ? t.previousView.pop() : t.previousView.push({fromState: s.name, fromParams: o})
        }), e.ready(function () {
            console.log("$ionicPlatform.ready"), window.cordova && window.cordova.plugins.Keyboard && (cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0), cordova.plugins.Keyboard.disableScroll(!0)), window.StatusBar && StatusBar.styleDefault(), n.changeLocale("en-gb")
        })
    }]).config(["$ionicConfigProvider", function (e) {
        e.tabs.position("bottom"), e.views.swipeBackEnabled(!1), e.form.checkbox("circle"), ionic.Platform.isWebView() || (console.log("jsScrolling"), e.scrolling.jsScrolling(!1))
    }]).config(["$stateProvider", "$urlRouterProvider", "USER_ROLES", function (e, n, role) {
        e.state("intro", {
            url: "/intro",
            "abstract": !0,
            templateUrl: "views/common/intro.html"
        }).state("intro.walkthrough-welcome", {
            url: "/walkthrough-welcome",
            views: {"intro-view@intro": {templateUrl: "views/walkthrough/welcome.html"}}
        }).state("intro.walkthrough-learn", {
            url: "/walkthrough-learn",
            views: {"intro-view@intro": {templateUrl: "views/walkthrough/learn.html", controller: "GettingStartedCtrl"}}
        }).state("intro.auth-login", {
            url: "/auth-login",
            views: {"intro-view@intro": {templateUrl: "views/auth/login.html", controller: "LoginCtrl"}}
        }).state("intro.auth-signup", {
            url: "/auth-signup",
            views: {"intro-view@intro": {templateUrl: "views/auth/signup.html", controller: "SignupCtrl"}}
        }).state("intro.auth-forgot-password", {
            url: "/forgot-password",
            views: {
                "intro-view@intro": {
                    templateUrl: "views/auth/forgot-password.html",
                    controller: "ForgotPasswordCtrl"
                }
            }
        }).state("main", {
            url: "/main",
            "abstract": !0,
            templateUrl: "views/common/main.html"
        }).state("main.app", {
            url: "/app",
            "abstract": !0,
            views: {"main-view@main": {templateUrl: "views/common/app.html", controller: "AppCtrl"}},
            /*resolve: {
             logged_user: ["AuthService", function (e) {
             return e.getLoggedUser()
             }]
             }*/
        }).state("main.app.filters", {
            url: "/filters",
            views: {"main-view@main": {templateUrl: "views/filters/filters.html", controller: "FiltersCtrl"}}
        }).state("main.app.feed", {
            url: "/feed",
            views: {"app-feed@main.app": {templateUrl: "views/feed/feed.html", controller: "FeedCtrl"}}
        }).state("main.app.feed.fashion", {
            url: "/fashion",
            views: {"category-feed@main.app.feed": {templateUrl: "views/feed/fashion.html", controller: "FashionCtrl"}},
            resolve: {
                products: ["FashionService", function (e) {
                    return e.getProducts()
                }]
            }
        }).state("main.app.feed.fashion.content", {
            url: "/content/:productId",
            views: {"main-view@main": {templateUrl: "views/content/fashion.html", controller: "FashionContentCtrl"}},
            resolve: {
                product: ["FashionService", "$stateParams", function (e, n) {
                    return e.getProduct(n.productId)
                }],
            }
        }).state("main.app.feed.food", {
            url: "/food",
            views: {"category-feed@main.app.feed": {templateUrl: "views/feed/food.html", controller: "FoodCtrl"}},
            resolve: {
                products: ["FoodService", function (e) {
                    var products =   e.getProducts();
                    console.log("products===",products)
                    return products;
                }]
            }
        }).state("main.app.feed.food.content", {
            url: "/content/:productId",
            views: {"main-view@main": {templateUrl: "views/content/food.html", controller: "FoodContentCtrl"}},
            resolve: {
                product: ["FoodService", "$stateParams", function (e, n) {
                    return e.getProduct(n.productId)
                }]
            }
        }).state("main.app.feed.travel", {
            url: "/travel",
            views: {"category-feed@main.app.feed": {templateUrl: "views/feed/travel.html", controller: "TravelCtrl"}},
            resolve: {
                products: ["TravelService", function (e) {
                    var products =   e.getProducts();
                    console.log("products===",products)
                    return products;
                }]
            }
        }).state("main.app.feed.travel.content", {
            url: "/content/:productId",
            views: {"main-view@main": {templateUrl: "views/content/travel.html", controller: "TravelContentCtrl"}},
            resolve: {
                product: ["TravelService", "$stateParams", function (e, n) {
                    return e.getProduct(n.productId)
                }]
            }
        }).state("main.app.feed.deals", {
            url: "/deals",
            views: {"category-feed@main.app.feed": {templateUrl: "views/feed/deals.html", controller: "DealsCtrl"}},
            resolve: {
                products: ["DealsService", function (e) {
                    return   e.getProducts()
                }]
            }
        }).state("main.app.feed.deals.content", {
            url: "/content/:productId",
            views: {"main-view@main": {templateUrl: "views/content/deals.html", controller: "DealsContentCtrl"}},
            resolve: {
                product: ["DealsService", "$stateParams", function (e, n) {
                    return e.getProduct(n.productId)
                }]
            }
        }).state("main.app.feed.real-state", {
            url: "/real-state",
            views: {
                "category-feed@main.app.feed": {
                    templateUrl: "views/feed/real-state.html",
                    controller: "RealStateCtrl"
                }
            },
            resolve: {
                products: ["RealStateService", function (e) {
                    return console.log("resolving real state"), e.getProducts()
                }]
            }
        }).state("main.app.feed.real-state.content", {
            url: "/content/:productId",
            views: {
                "main-view@main": {
                    templateUrl: "views/content/real-state.html",
                    controller: "RealStateContentCtrl"
                }
            },
            resolve: {
                product: ["RealStateService", "$stateParams", function (e, n) {
                    return e.getProduct(n.productId)
                }]
            }
        }).state("main.app.search", {
            url: "/search",
            views: {"app-search@main.app": {templateUrl: "views/search/search.html", controller: "SearchCtrl"}},
            resolve: {
                results: ["FoodService", function (e) {
                    return e.getProducts()
                }]
            }
        }).state("main.app.fashionSearch", {
            url: "/fashionSearch",
            views: {
                "app-fashion-search@main.app": {
                    templateUrl: "views/search/fashion_search.html",
                    controller: "FashionSearchCtrl"
                }
            },
            resolve: {
                results: ["FashionService", function (e) {
                    return e.getProducts()
                }]
            }
        }).state("main.app.liked", {
            url: "/liked",
            views: {"app-liked@main.app": {templateUrl: "views/liked/liked.html", controller: "LikedCtrl"}},
            resolve: {
                lists: ["ListService", function (e) {
                    return e.getUserLists()
                }]
            }
        }).state("main.app.liked.list-details", {
            url: "/list-details/:listId",
            views: {"main-view@main": {templateUrl: "views/liked/list-details.html", controller: "ListDetailsCtrl"}},
            resolve: {
                list: ["ListService", "$stateParams", function (e, n) {
                    return e.getList(n.listId)
                }]
            }
        }).state("main.app.liked.new-list", {
            url: "/new-list",
            views: {"main-view@main": {templateUrl: "views/liked/new-list.html", controller: "NewListCtrl"}}
        }).state("main.app.account", {
            url: "/account",
            views: {"app-account@main.app": {templateUrl: "views/account/account.html"}}
        }).state("main.app.account.profile", {
            url: "/profile",
            views: {
                "my-profile@main.app.account": {
                    templateUrl: "views/account/profile.html",
                    controller: "ProfileCtrl"
                }
            },
            resolve: {
                user: ["ProfileService", function (e) {
                    return e.getUserData()
                }]
            }, data: {
                authorizedRoles: [role.loginUser]
            }
        }).state("main.app.account.orders", {
            url: "/orders",
            views: {"my-orders@main.app.account": {templateUrl: "views/account/orders.html", controller: "OrdersCtrl"}},
            resolve: {
                orders: ["OrderService", function (e) {
                    return e.getUserOrders()
                }]

            }
        }).state("main.app.shopping-cart", {
            url: "/shopping-cart",
            views: {"main-view@main": {templateUrl: "views/shopping-cart/cart.html", controller: "ShoppingCartCtrl"}},
            resolve: {
                shoppingCart: ["ShoppingCartService", function (e) {
                    return e.getShoppingCart()
                }]
            }
        }).state("main.app.checkout", {
            url: "/checkout",
            views: {"main-view@main": {templateUrl: "views/checkout/checkout.html", controller: "CheckoutCtrl"}},
            resolve: {
                shoppingCart: ["ShoppingCartService", function (e) {
                    return e.getShoppingCart()
                }]
            }
        }).state("main.app.checkout.address", {
            url: "/address",
            views: {"main-view@main": {templateUrl: "views/checkout/address.html", controller: "CheckoutAddressCtrl"}},
            resolve: {
                user_shipping_addresses: ["CheckoutService", function (e) {
                    return e.getUserShippingAddresses()
                }]
            }
        }).state("main.app.checkout.card", {
            url: "/card",
            views: {"main-view@main": {templateUrl: "views/checkout/card.html", controller: "CheckoutCardCtrl"}},
            resolve: {
                user_credit_cards: ["CheckoutService", function (e) {
                    return e.getUserCreditCards()
                }]
            }
        }).state("main.app.checkout.promo-code", {
            url: "/promo-code",
            views: {
                "main-view@main": {
                    templateUrl: "views/checkout/promo-code.html",
                    controller: "CheckoutPromoCodeCtrl"
                }
            }
        }).state("main.app.checkout.thanks", {
            url: "/thanks",
            views: {"main-view@main": {templateUrl: "views/checkout/thanks.html"}}
        }), n.otherwise("/intro/walkthrough-welcome")
    }]).directive("bg", function () {
        return {
            restrict: "A", require: "^multiBg", scope: {ngSrc: "@"}, link: function (e, n, t, i) {
                n.on("load", function () {
                    i.animateBg()
                })
            }
        }
    }).directive("showHideContainer", function () {
        return {
            scope: {},
            controller: ["$scope", "$element", "$attrs", function (e, n, t) {
                e.show = !1, e.toggleType = function (n) {
                    n.stopPropagation(), n.preventDefault(), e.show = !e.show, e.$broadcast("toggle-type", e.show)
                }
            }],
            templateUrl: "views/common/templates/show-hide-password.html",
            restrict: "A",
            replace: !1,
            transclude: !0
        }
    }).directive("showHideInput", function () {
        return {
            scope: {}, link: function (e, n, t) {
                e.$on("toggle-type", function (e, t) {
                    var i = n[0];
                    i.getAttribute("type");
                    t || i.setAttribute("type", "password"), t && i.setAttribute("type", "text")
                })
            }, require: "^showHideContainer", restrict: "A", replace: !1, transclude: !1
        }
    }).directive("preImg", function () {
        return {
            restrict: "E", transclude: !0, scope: {ratio: "@", helperClass: "@"}, controller: ["$scope", function (e) {
                e.loaded = !1, this.hideSpinner = function () {
                    e.$apply(function () {
                        e.loaded = !0
                    })
                }
            }], templateUrl: "views/common/templates/pre-img.html"
        }
    }).directive("spinnerOnLoad", function () {
        return {
            restrict: "A", require: "^preImg", scope: {ngSrc: "@"}, link: function (e, n, t, i) {
                n.on("load", function () {
                    i.hideSpinner()
                })
            }
        }
    }).directive("socialShare", ["$cordovaSocialSharing", "$ionicPlatform", "$timeout", function (e, n, t) {
        return {
            restrict: "A", scope: {share: "="}, controller: ["$scope", function (e) {
            }], link: function (i, s, o, a) {
                i.disabled = !1;
                var l = i.share;
                i.disable = function () {
                    i.disabled = !0, t(function () {
                        s.attr("disabled", i.disabled)
                    }, 0)
                }, i.enable = function () {
                    i.disabled = !1, t(function () {
                        s.attr("disabled", i.disabled)
                    }, 0)
                }, s.on("click", function (t) {
                    i.disabled ? (t.preventDefault(), t.stopImmediatePropagation()) : (i.disable(), n.ready(function () {
                        try {
                            e.share("Check the following post: " + l.title, null, null, null).then(function (e) {
                                i.enable()
                            }, function (e) {
                                i.enable()
                            })
                        } catch (n) {
                            i.enable()
                        }
                    }))
                })
            }
        }
    }]).directive("dynamicAnchorFix", ["$ionicGesture", "$timeout", "$cordovaInAppBrowser", function (e, n, t) {
        return {
            scope: {}, link: function (e, i, s) {
                n(function () {
                    var e = i.find("a");
                    e.length > 0 && angular.forEach(e, function (e) {
                        var n = angular.element(e);
                        n.bind("click", function (e) {
                            e.preventDefault(), e.stopPropagation();
                            var n = e.currentTarget.href, i = {};
                            t.open(n, "_blank", i).then(function (e) {
                            })["catch"](function (e) {
                                console.log("error: " + e)
                            })
                        })
                    })
                }, 10)
            }, restrict: "A", replace: !1, transclude: !1
        }
    }]), angular.module("yabiz_shopApp.views", []).run(["$templateCache", function (e) {
        e.put("views/common/intro.html",'<ion-view class="" cache-view="false"><ion-nav-view name="intro-view"></ion-nav-view></ion-view>'),
        e.put("views/walkthrough/welcome.html",'<ion-view class="welcome-view" cache-view="false"><ion-content has-bouncing="false"><div class="row images-row"><div class="col images-outer-col"><div class="row row-bottom logo-row"><div class="col"><div class="logo-container"><pre-img ratio="_1_1" helper-class="square-image"><img class="logo-image" ng-src="./img/walkthrough/welcome_logo-Bazaar.png" spinner-on-load></pre-img></div></div></div><div class="row illustration-row"><div class="col"><div class="illustration-container"><pre-img ratio="_20_9" helper-class="square-image"><img class="illustration-image" ng-src="./img/walkthrough/welcome_illustration.png" spinner-on-load></pre-img></div></div></div></div></div><div class="row actions-row"><div class="col"><a class="button button-block get-started-button" ui-sref="main.app.feed.fashion()">立即开始</a></div></div><div class="row actions-row"><div class="col"><a class="button button-block button-clear auth-button" ui-sref="intro.auth-login()">登录</a></div><div class="col"><a class="button button-block button-clear auth-button" ui-sref="intro.auth-signup()">注册</a></div></div></ion-content></ion-view>'),
        e.put("views/walkthrough/learn.html",'<ion-view class="learn-view" cache-view="false"><ion-header-bar class="learn-header"><div class="buttons"><button class="button button-clear skip-button" ng-show="show_skip_button" ng-click="skipIntro()">忽视</button></div></ion-header-bar><ion-content class="learn-content" has-bouncing="false"><div class="row slides-row"><div class="col"><ion-slide-box class="learn-slider" ng-class="{\'hide-pager\':show_call_to_action_button}" show-pager="true" delegate-handle="getting-started-slides" pager-click="pagerClicked(index)" on-slide-changed="slideChanged($index)"><ion-slide><section class="slide-learn learn-sub-view" ng-include="\'views/walkthrough/slide-1.html\'"></section></ion-slide><ion-slide><section class="slide-questions getting-started-sub-view" ng-include="\'views/getting-started/slide-2.html\'"></section></ion-slide><ion-slide><section class="slide-pick-categories getting-started-sub-view" ng-include="\'views/getting-started/slide-3.html\'"></section></ion-slide></ion-slide-box></div></div><div class="row actions-row" ng-show="show_call_to_action_button"><div class="col"><a class="button button-full action-button" ui-sref="intro.auth-signup()">进入</a></div></div></ion-content></ion-view>'),
        e.put("views/auth/login.html",'<ion-view class="login-view auth-view" cache-view="false"><ion-content has-bouncing="false"><div class="row form-heading"><div class="col"><h3 class="form-title">社交账号登录</h3><div class="social-share text-center"><a class="social-share-icon icon-qq" ng-click="authenticateUser(\'qq\')"></a> <a class="social-share-icon icon-facebook" ng-click="authenticateUser(\'facebook\')"></a> <a class="social-share-icon icon-google" ng-click="authenticateUser(\'googleplus\')"></a> <a class="social-share-icon icon-wechat" ng-click="authenticateUser(\'weixin\')"></a></div></div></div><div class="row form-separator"><hr class="separator-line"><span class="separator-mark">或者</span><hr class="separator-line"></div><div class="row form-row"><div class="col"><span class="form-divider">用户登录</span><form name="login_form" class="form-container" novalidate><div class="input-list list list-inset"><label class="item item-input" ng-class="{\'has-error\':login_form.email.$invalid && !login_form.email.$pristine }"><input type="text" placeholder="手机号码或邮箱" name="username" minlength="3" maxlength="20" ng-model="user.username" required></label><div class="error-container" ng-show="login_form.username.$error && !login_form.username.$pristine " ng-messages="login_form.username.$error"><div ng-messages-include="error-list.html"></div></div><label class="item item-input" show-hide-container ng-class="{\'has-error\':login_form.password.$invalid && !login_form.password.$pristine }"><input type="password" placeholder="密码" name="password" ng-model="user.password" required show-hide-input></label><div class="error-container last-error-container" ng-show="login_form.password.$error && !login_form.password.$pristine " ng-messages="login_form.password.$error"><div ng-messages-include="error-list.html"></div></div></div><!--<p ng-show="error" class="message error">{{error}}</p>--> <button type="submit" class="button button-block auth-action-button" ng-click="doLogIn()" ng-disabled="login_form.$invalid">登录</button></form></div></div><div class="row"><div class="col alternative-actions login-actions"><a class="action-link button button-small button-clear" ui-sref="intro.auth-forgot-password()">忘记密码</a></div><div class="col alternative-actions login-actions"><a class="action-link button button-small button-clear" ui-sref="main.app.feed.fashion()">立即使用</a></div><div class="col alternative-actions login-actions"><a class="action-link button button-small button-clear" ui-sref="intro.auth-signup()">注册</a></div></div></ion-content></ion-view>'),
        e.put("views/auth/signup.html",'<ion-view class="signup-view auth-view" cache-view="false"><ion-content has-bouncing="false"><div class="row form-heading"><div class="col"><h3 class="form-title">社交账号登录</h3><div class="social-share text-center"><a class="social-share-icon icon-qq" ng-click="authenticateUser(\'qq\')"></a> <a class="social-share-icon icon-facebook" ng-click="authenticateUser(\'facebook\')"></a> <a class="social-share-icon icon-google" ng-click="authenticateUser(\'googleplus\')"></a> <a class="social-share-icon icon-wechat" ng-click="authenticateUser(\'weixin\')"></a></div></div></div><div class="row form-separator"><hr class="separator-line"><span class="separator-mark">或者</span><hr class="separator-line"></div><div class="row form-row"><div class="col"><form name="signup_form" class="form-container" novalidate><div class="input-list list list-inset"><div class="row multi-inputs"><div class="col" ng-class="{\'has-error\':signup_form.firstname.$invalid && !signup_form.firstname.$pristine }"><label class="item item-input"><input type="text" placeholder="姓" name="firstname" ng-model="user.firstname" required></label><div class="error-container" ng-show="signup_form.firstname.$error && !signup_form.firstname.$pristine " ng-messages="signup_form.firstname.$error"><div ng-messages-include="error-list.html"></div></div></div><div class="col" ng-class="{\'has-error\':signup_form.lastname.$invalid && !signup_form.lastname.$pristine }"><label class="item item-input"><input type="text" placeholder="名" name="lastname" ng-model="user.lastname" required></label><div class="error-container" ng-show="signup_form.lastname.$error && !signup_form.lastname.$pristine " ng-messages="signup_form.lastname.$error"><div ng-messages-include="error-list.html"></div></div></div></div><label class="item item-input" ng-class="{ \'has-error\' : signup_form.email.$invalid && !signup_form.email.$pristine }"><input type="email" placeholder="Email" name="email" ng-model="user.email" required class="ng-valid-email"></label><div class="error-container" ng-show="signup_form.email.$error && !signup_form.email.$pristine " ng-messages="signup_form.email.$error"><div ng-messages-include="error-list.html"></div></div><label class="item item-input" ng-class="{\'has-error\':signup_form.phone.$invalid && !signup_form.phone.$pristine }"><input type="text" placeholder="手机号码" name="phone" ng-model="user.phone" required></label><div class="error-container" ng-show="signup_form.email.$error && !signup_form.email.$pristine " ng-messages="signup_form.email.$error"><div ng-messages-include="error-list.html"></div></div><label class="item item-input" show-hide-container ng-class="{ \'has-error\' : signup_form.password.$invalid && !signup_form.password.$pristine }"><input type="password" placeholder="密码" name="password" ng-model="user.password" required minlength="3" maxlength="20" show-hide-input></label><div class="error-container" ng-show="signup_form.password.$error && !signup_form.password.$pristine" ng-messages="signup_form.password.$error"><div ng-messages-include="error-list.html"></div></div><p ng-show="error" class="message error">{{error}}</p><button type="submit" class="button button-block auth-action-button" ng-click="doSignUp(signup_form,user)" ng-disabled="signup_form.$invalid">注 册</button><p ng-show="{{error}}" class="message error ng-binding ng-hide"></p></div></form><div class="alternative-actions"><a class="action-link button button-small button-clear" ui-sref="intro.auth-login()">登录</a> <a class="action-link button button-small button-clear" ui-sref="main.app.feed.fashion()">立即使用</a></div></div></div></ion-content></ion-view>'),
        e.put("views/auth/forgot-password.html",'<ion-view class="forgot-password-view auth-view" cache-view="false"><ion-content has-bouncing="false"><div class="row images-row"><div class="col"><div class="illustration-container"><pre-img ratio="_27_20" helper-class="square-image"><img class="illustration-image" ng-src="./img/auth/forgot_password_illustration.png" spinner-on-load></pre-img></div></div></div><h2 class="forgot-title">找回密码</h2><div class="row form-row"><div class="col"><form name="forgot_password_form" class="form-container" novalidate><div class="input-list list list-inset"><label class="item item-input"><input type="text" placeholder="email" name="email" ng-model="user.email" required></label></div><p ng-show="error" class="message error">{{error}}</p><button type="submit" class="button button-block auth-action-button" ng-click="recoverPassword()" ng-disabled="forgot_password_form.$invalid">找回</button></form><div class="alternative-actions"><a class="action-link button button-small button-clear" ui-sref="intro.auth-login()">登录</a> <a class="action-link button button-small button-clear" ui-sref="intro.auth-signup()">注册</a></div></div></div></ion-content></ion-view>'),
        e.put("views/common/main.html",'<ion-view class="" cache-view="false"><ion-nav-view name="main-view"></ion-nav-view></ion-view>'),
        e.put("views/common/app.html",'<ion-view class="app-tabbed-view"><ion-pane><ion-tabs class="tabbed-navigation tabs-icon-top"><ion-tab title="商品" icon-off="feed-icon" icon-on="feed-icon" ui-sref="main.app.feed.fashion"><ion-nav-view name="app-feed"></ion-nav-view></ion-tab><ion-tab title="搜索" icon-off="search-icon" icon-on="search-icon" ui-sref="main.app.search"><ion-nav-view name="app-search"></ion-nav-view></ion-tab><ion-tab title="时尚" icon-off="liked-icon" icon-on="liked-icon" ui-sref="main.app.fashionSearch"><ion-nav-view name="app-fashion-search"></ion-nav-view></ion-tab><ion-tab title="关于" icon-off="account-icon" icon-on="account-icon" ui-sref="main.app.account"><ion-nav-view name="app-account"></ion-nav-view></ion-tab></ion-tabs></ion-pane></ion-view>'),
        e.put("views/filters/filters.html",'<ion-view class="filters-view" cache-view="false"><ion-header-bar class="filters-header"><div class="buttons"><button class="button button-clear cancel-button" ng-click="cancelRefine()">取消</button></div><h1 class="title">过滤</h1><div class="buttons"><button class="button button-clear apply-button" ng-click="applyRefine()">应用</button></div></ion-header-bar><ion-content class="filters-content-outer"><div class="filter-tabs button-bar" filter-tabs slider="filter-tabs-slider"><filter-tab tab="1"><span class="tab-title">时尚</span></filter-tab><filter-tab tab="2"><span class="tab-title">列表</span></filter-tab><filter-tab tab="3"><span class="tab-title">范围</span></filter-tab><filter-tab tab="4"><span class="tab-title">其他</span></filter-tab></div><ion-slide-box class="filter-tabs-slider" ng-init="lockSlide()" delegate-handle="filter-tabs-slider" show-pager="false"><ion-slide><section class="filter-tab-section" ng-include="\'views/filters/tab-1.html\'"></section></ion-slide><ion-slide><section class="filter-tab-section" ng-include="\'views/filters/tab-2.html\'"></section></ion-slide><ion-slide><section class="filter-tab-section" ng-include="\'views/filters/tab-3.html\'"></section></ion-slide><ion-slide><section class="filter-tab-section" ng-include="\'views/filters/tab-4.html\'"></section></ion-slide></ion-slide-box></ion-content></ion-view>'),
        e.put("views/feed/feed.html",'<ion-view class="feed-view" cache-view="false"><ion-header-bar class="feed-header"><div class="logo-container"><img class="logo-image" ng-src="./img/logo.png"></div><div class="buttons"><button class="button button-clear cart-button" ui-sref="main.app.shopping-cart()"><span class="badge cart-badge">{{ shoppingCartCount }}</span> <img class="cart-image" ng-src="./img/feed/cart-icon.png"></button></div></ion-header-bar><ion-content class="categories-feeds-content" has-bouncing="false" delegate-handle="feeds-content"><sliding-list><ul center-edges class="sliding-list"><sliding-item state="main.app.feed.fashion"><a nav-transition="none" ui-sref="main.app.feed.fashion()">时尚</a></sliding-item><sliding-item state="main.app.feed.food"><a nav-transition="none" ui-sref="main.app.feed.food()">餐饮</a></sliding-item><sliding-item state="main.app.feed.travel"><a nav-transition="none" ui-sref="main.app.feed.travel()">旅游</a></sliding-item><sliding-item state="main.app.feed.deals"><a nav-transition="none" ui-sref="main.app.feed.deals()">优惠</a></sliding-item><sliding-item state="main.app.feed.real-state"><a nav-transition="none" ui-sref="main.app.feed.real-state()">中介地产</a></sliding-item></ul></sliding-list><ion-nav-view name="category-feed" class="category-feed"></ion-nav-view></ion-content></ion-view>'),
        e.put("views/feed/fashion.html",'<ion-view class="feed-fashion-view feed-sub-view" cache-view="false"><ion-content><section ng-include="\'views/common/fashion-sort-and-filters-bar.html\'"></section><div class="row products-row"><div class="col col-50 fashion-product-container" ng-repeat="product in results = products | orderBy:\'id\'"><div class="list card"><div class="item item-image product-image-wrapper"><a class="product-anchor" ui-sref="main.app.feed.fashion.content({productId: product.productId})"><pre-img ratio="_1_1"><img class="product-image" ng-src="{{serverUrl}}/{{ product.mediumImageUrl }}" spinner-on-load></pre-img></a></div><div class="item item-body product-description-wrapper"><h5 class="product-title"><a class="product-anchor" ui-sref="main.app.feed.fashion.content({productId: product.id})">{{ product.productName }}</a></h5><p class="product-description"><b class="actual-price">￥{{product.priceResult.defaultPrice}}</b> <span class="previous-price" ng-show="product.priceResult.promoPrice != \'0\'">￥{{product.priceResult.promoPrice}}</span></p></div></div></div></div></ion-content></ion-view>'),
        e.put("views/content/fashion.html",'<ion-view class="fashion-content-view" cache-view="false"><ion-header-bar class="fashion-content-header"><div class="buttons"><button class="button button-clear back-button" ng-click="goBack()">后退</button></div><h1 class="title">{{product.name}}</h1><div class="buttons"><button class="button button-clear share-button" ng-click="socialShare(\'send-text\')">分享</button></div></ion-header-bar><ion-content><ion-slide-box class="product-images-slider"><ion-slide><div class="image-container"><pre-img ratio="full"><img class="product-image" ng-src="{{ serverUrl}}/{{product.mediumImageUrl}}" spinner-on-load></pre-img></div></ion-slide><ion-slide ng-repeat="pirture in product.additionalImages.slice(0, 5) track by $index"><div ng-repeat="(key,value) in pirture" class="image-container" ng-if="key" multi-bg="[serverUrl+\'/\'+ value[0].additionalImageDetail]"></div></ion-slide></ion-slide-box><div class="row brief-info-row"><div class="col"><h3 class="product-name">{{product.productName}}</h3><div class="product-tags-container"><span ng-repeat="tag in product.productTags ">{{ tag }}&nbsp;</span></div><h4 class="product-price">￥{{product.priceResult.defaultPrice}}</h4></div></div><div class="row options-row"> <div class="col pick-color-col" ng-repeat="(name,feature) in variantTreeChoose"><button class="button button-block icon-right ion-chevron-right pick-button" ng-click="openFeatureChooser(name,feature)">{{name}} {{ \':\' + choosen_features_names[name] }}</button></div></div><div class="row"><div class="col col-25 purchase-row"><span class="description-line">数量: <b class="product-quantity ng-binding">{{cartItem.quantity}}</b></span></div><div class="col col-25 quantity-input-col"><div class="button-bar input-number ng-pristine ng-untouched ng-valid"><a class="button icon ion-minus-round value-down-button" ng-click="minusOne(cartItem.quantity)"></a> <a class="button icon ion-plus-round value-up-button" ng-click="plusOne(cartItem.quantity)"></a></div></div><div class="col col-50 purchase-row"><button class="button button-block add-to-cart-button" ng-disabled="!showSubmitBtn" ng-click="addToCart(cartItem)">加入购物车</button></div></div><div class="row description-row" data-ng-bind-html="product.wapDesc "></div> </ion-content></ion-view>'),
        e.put("views/feed/food.html",'<ion-view class="feed-food-view feed-sub-view" cache-view="false"><ion-content><section ng-include="\'views/common/sort-and-filters-bar.html\'"></section><div class="products-row"><div class="food-product-container" ng-repeat="product in results = products"><div class="row info-row"><div class="col logo-col"><a class="product-anchor" ui-sref="main.app.feed.food.content({productId: product.productId})"><pre-img ratio="_1_1"><img class="logo-image" ng-src="{{serverUrl}}/{{ product.mediumImageUrl }}" spinner-on-load></pre-img></a></div><div class="col description-col"><div class="row"><div class="col data-col"><h5 class="product-title"><a class="product-anchor" ui-sref="main.app.feed.food.content({productId: product.productId})">{{product.productName}}</a></h5><p class="address-and-price-container"><span class="product-address"><span class="product-price-range">￥{{ product.priceResult.minimumPrice }}-{{ product.priceResult.maximumPrice }}</span></p><p class="product-tags-container"><span class="product-tag" ng-repeat="tag in product.productTags">{{tag}}</span></p></div><div class="col col-20 actions-col"><span class="product-rating rating-{{ product.averageRating | floor }}">{{ product.averageRating }}</span></div></div></div></div><div class="row row-center images-row"><div class="col col-20 image-wrapper" ng-repeat="pirture in product.additionalImages.slice(0, 5) track by $index"><pre-img ratio="_1_1" ng-repeat="(key,value) in pirture"><img class="product-image" ng-if="key" ng-src="{{serverUrl}}/{{value[0].additionalImageDetail}}" spinner-on-load></pre-img><div class="has-more-images" ng-if="$index == 4 && product.additionalImages.length > 5"><span class="images-count">{{ product.additionalImages.length - 5 }}</span></div></div></div></div></div></ion-content></ion-view>'),
        e.put("views/content/food.html",'<ion-view class="food-content-view" cache-view="false"><ion-header-bar class="food-content-header"><div class="buttons"><button class="button button-clear back-button" ng-click="goBack()">回退</button></div><h1 class="title">{{product.productName}}</h1><div class="buttons"><button class="button button-clear share-button">分享</button></div></ion-header-bar><ion-content><ion-slide-box class="product-images-slider" show-pager="false"><ion-slide><div class="image-container" multi-bg="[serverUrl+\'/\'+product.mediumImageUrl]"><div class="product-illustration-container"><img class="product-illustration" ng-src="./img/sample-images/travel/TravelIcon1.png"></div></div></ion-slide><ion-slide ng-repeat="pirture in product.additionalImages.slice(0, 5) track by $index"><div ng-repeat="(key,value) in pirture" class="image-container" ng-if="key" multi-bg="[serverUrl+\'/\'+ value[0].additionalImageDetail]"></div></ion-slide></ion-slide-box><div class="row brief-info-row"><div class="col col-80"><h3 class="product-name">{{product.productName}}</h3><!--<h5 class="product-style">Homemade style</h5>--></div><div class="col col-20"><span class="product-price-range">￥{{ product.priceResult.minimumPrice }}-{{ product.priceResult.maximumPrice }}</span></div></div><div class="row rating-row"><div class="col rating-col"><span class="product-rating rating-{{ product.averageRating | floor }}">{{product.averageRating}}</span> <span class="product-rating rating-2">{{product.averageRating}}2</span></div><div class="col rating-col">口味:<i class="icon ion-ios-star-outline"></i> <span class="other-rating">4.2</span></div><div class="col rating-col">环境:<i class="icon ion-ios-star-outline"></i> <span class="other-rating">4.4</span></div><div class="col rating-col">价格:<i class="icon ion-ios-star-outline"></i> <span class="other-rating">3.8</span></div><div class="col rating-col">服务:<i class="icon ion-ios-star-outline"></i> <span class="other-rating">8</span></div></div><div class="row schedules-and-address-row"><div class="col"><button class="button button-block icon-right ion-chevron-right schedules-button" ng-class="{\'with-value\': product.selected_schedule.name}" ng-click="openSchedules()"><span class="button-title">营业时间</span> <span class="button-data" ng-if="product.selected_schedule.name">{{ product.selected_schedule.name }}</span></button><hr class="buttons-divider"><button class="button button-block icon-right ion-chevron-right addresses-button" ng-class="{\'with-value\': product.address}" ng-click="openAddresses()"><span class="button-title">地址</span> <span class="button-data" ng-if="product.selected_address">{{product.selected_address.street}}</span></button></div></div><div class="row address-map-row"><div class="col"><div class="map-wrapper" data-tap-disabled="true"></div></div></div><div class="row tags-row"><div class="col product-tags-container"><span class="product-tag" ng-repeat="tag in product.productTags">{{tag}}</span></div></div><hr class="product-sections-divider"><h3 class="product-sub-title">用户照片</h3><div class="row row-center images-row"><div class="col col-20 image-wrapper" ng-repeat="picture in product.additionalImages.slice(0, 5) track by $index"><pre-img ratio="_1_1" ng-repeat="(key,value) in picture"><img style="width:100%" class="product-image" ng-if="key" ng-src="{{serverUrl}}/{{value[0].additionalImageDetail}}" spinner-on-load></pre-img><div class="has-more-images" ng-if="$index == 4 && product.additionalImages.length > 5"><span class="images-count">{{ product.additionalImages.length - 5 }}</span></div></div></div><div class="row upload-row"><div class="col"><button class="button button-block upload-photo-button" ng-click="uploadPhoto()">上传照片</button></div></div><hr class="product-sections-divider"><h3 class="product-sub-title">热门菜肴</h3><div class="row popular-dishes-row"><div class="col"><div class="row dish-row" ng-repeat="dish in product.dishes"><div class="col col-75"><h5 class="dish-name">{{ dish.name }}</h5><progress-bar min="0" max="5" ng-model="dish.rating"></progress-bar></div><div class="col col-bottom dishes-rate-col"><i class="icon ion-ios-heart-outline"></i> <span class="dish-rate-value">{{ dish.rating }}</span></div></div></div></div><hr class="product-sections-divider"><h3 class="product-sub-title">用户评论</h3><article class="row review-item" ng-repeat="review in [].constructor(2) track by $index"><div class="col"><div class="row top-row"><div class="col image-col"><pre-img ratio="_1_1"><img class="review-image" ng-src="https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/73.jpg" spinner-on-load></pre-img></div><div class="col description-col"><h3 class="review-author-name">李逍遥</h3><div class="row icons-container"><div class="col icon-group"><i class="icon ion-navicon"></i> <span class="icon-text">2 个评价</span></div><div class="col icon-group"><i class="icon ion-ionic"></i> <span class="icon-text">26 照片</span></div></div></div><div class="col reputation-col"><span class="review-date">{{\'07/07/2016\' | amDateFormat:\'YYYY, MMM Do\'}}</span><div class="rating-outer"><span class="review-rating rating-{{ product.rating | floor }}">{{product.rating}}</span></div></div></div><div class="row middle-row"><div class="col"><p class="review-description">这篇评论是漫长的，但仍然是回忆生动的。我们在LA厄拉为婚礼。我只想到它是一个伟大的餐厅，但从来没有想到它作为一个事件空间。婚礼是在一个星期日，我们有整个使用空间。</p></div></div><div class="row bottom-row"><div class="col review-other-ratings-container"><div class="row"><div class="col rating-col"><i class="icon ion-ios-star-outline"></i> <span class="other-rating">4.2</span></div><div class="col rating-col"><i class="icon ion-ios-star-outline"></i> <span class="other-rating">4.4</span></div><div class="col rating-col"><i class="icon ion-ios-star-outline"></i> <span class="other-rating">3.8</span></div></div></div></div></div></article><div class="row all-reviews-row"><div class="col"><button class="button button-block icon-right ion-chevron-right read-all-reviews-button" ng-click="showAllReviews()">全部评价 (15)</button></div></div><div class="row write-review-row"><div class="col"><button class="button button-block new-review-button" ng-click="newReview()">发表评论</button></div></div><h5 class="incorrect-info-title">信息错误?</h5><span class="incorrect-info-sub-title">提交错误信息!</span></ion-content></ion-view>'),
        e.put("views/feed/travel.html",'<ion-view class="feed-travel-view feed-sub-view" cache-view="false"><ion-content><section ng-include="\'views/common/sort-and-filters-bar.html\'"></section><div class="products-row"><div class="travel-product-container" ng-repeat="product in results = products"><div class="row image-row"><div class="col product-image-container"><div multi-bg="[serverUrl+\'/\'+product.largeImageUrl]" interval="3000"><div class="row row-center content-inside-image"><div class="col"><img class="travel-product-icon" ng-src=""><h2 class="product-name"><a class="product-anchor">{{product.productName}}</a></h2><h4 class="product-tagline">{{product.categoryName}}</h4></div></div></div></div></div><div class="row info-row"><div class="col description-col"><h5 class="product-title"><a class="product-anchor">{{product.productName}} {{product.productName}}</a></h5><p class="product-description">{{product.description}}</p><p class="product-address">{{product.address}} 印度洋周围一群田园般的岛屿</p></div><div class="col col-25"><div class="row"><div class="col col-50 rating-col"><i class="icon ion-android-star-outline"></i> <span class="rating-value">{{product.averageRating}}</span></div><div class="col col-50 reviews-col"><i class="icon ion-chatbubble-working"></i> <span class="reviews-value">8</span></div></div></div></div></div></div></ion-content></ion-view>'),
        e.put("views/content/travel.html",'<ion-view class="content-travel-view" cache-view="false"><ion-header-bar align-title="left" class="bar-positive"><div class="buttons"><button class="button" ng-click="goBack()">Back</button></div><h1 class="title">Travel content</h1></ion-header-bar><ion-content class="padding"><div>{{product.name}}</div></ion-content></ion-view>'),
        e.put("views/feed/deals.html",'<ion-view class="feed-deals-view feed-sub-view" cache-view="false"><ion-content><section ng-include="\'views/common/sort-and-filters-bar.html\'"></section><div class="products-row"><div class="card deals-product-container" ng-repeat="product in results = products"><div class="row row-center top-row"><div class="col col-66 logo-col"><img class="deal-logo" ng-src="{{product.picture}}"></div><div class="col shop-col"><button class="button shop-button">CLAIM</button></div></div><div class="row middle-row"><div class="col col-75"><h5 class="product-title"><a class="product-anchor">{{product.name}}</a></h5><p class="product-description">{{product.description}}</p></div><div class="col bookmark-col"><a class="button button-icon icon ion-pricetag bookmark-button"></a></div></div><div class="row bottom-row"><div class="col col-75"><span class="deal-code">{{product.code}}</span></div><div class="col time-col"><div class="time-left-container"><span class="deal-time-left" ng-class="{\'days-left-1\': ((product.expiration_date | amDifference : null : \'hours\') <= 10) && ((product.expiration_date | amDifference : null : \'hours\') > 0), \'days-left-0\': (product.expiration_date | amDifference : null : \'hours\') < 0}" am-time-ago="product.expiration_date"></span> <i class="icon ion-android-time"></i></div></div></div></div></div></ion-content></ion-view>'),
        e.put("views/content/deals.html",'<ion-view class="content-deals-view" cache-view="false"><ion-nav-title><span>Deals content</span></ion-nav-title><ion-content class="padding"></ion-content></ion-view>'),
        e.put("views/feed/real-state.html",'<ion-view class="feed-real-state-view feed-sub-view" cache-view="false"><ion-content><section ng-include="\'views/common/sort-and-filters-bar.html\'"></section><div class="products-row list" ng-repeat="category in results = products"><div class="item item-divider">{{ category.categoryName }}</div><div class="real-state-product-container" ng-repeat="product in category.products"><div class="row image-row"><div class="col product-image-container"><div multi-bg="[serverUrl+\'/\'+product.largeImageUrl]" interval="3000"></div></div></div><div class="row description-row"><div class="col"><h2 class="product-price"><a class="product-anchor">￥ {{product.priceResult.defaultPrice}}</a></h2><p class="product-address">{{product.description}}</p></div><div class="col col-33 amenities-col"><i class="theme-icon icon-bed"></i> <span>{{product.bedrooms}}1</span> <i class="theme-icon icon-toilet"></i> <span>{{product.bathrooms}}2</span></div></div></div></div></ion-content></ion-view>'),
        e.put("views/content/real-state.html",'<ion-view class="content-real-state-view" cache-view="false"><ion-header-bar align-title="left" class="bar-positive"><div class="buttons"><button class="button" ng-click="goBack()">Back</button></div><h1 class="title">Real State content</h1></ion-header-bar><ion-content class="padding"><div>{{product.price}}</div></ion-content></ion-view>'),
        e.put("views/search/search.html",'<ion-view class="search-view" cache-view="false"><ion-header-bar class="search-header"><div class="row item-input-inset search-row"><div class="col col-75"><label class="item-input-wrapper search-label"><i class="icon ion-ios-search placeholder-icon"></i> <input type="search" placeholder="Search" name="search_query" ng-model="search.query"></label></div><div class="col"><button class="button button-clear cancel-button" ng-click="cancelSearch()">取消</button></div></div></ion-header-bar><ion-content><!-- <div ng-if="results.length == 0">      <h2>No results</h2>    </div> --><div><section ng-include="views/common/sort-and-filters-bar.html"></section><div class="search-results-container"><div class="products-row"><div class="food-product-container" ng-repeat="product in results = (products | searchField : \'product.productName\' | filter:search.query)"><div class="row info-row"><div class="col logo-col"><a class="product-anchor" ui-sref="main.app.feed.food.content({productId: product.id})"><pre-img ratio="_1_1"><img class="logo-image" ng-src="{{serverUrl}}/{{ product.mediumImageUrl }}" spinner-on-load></pre-img></a></div><div class="col description-col"><div class="row"><div class="col data-col"><h5 class="product-title"><a class="product-anchor">{{product.productName}}</a><!--<a class="product-anchor" ui-sref="main.app.feed.food.content({productId: product.productId})">{{product.productName}}</a>  --></h5><p class="address-and-price-container"><span class="product-address">{{product.description}}</span> <span class="product-price-range">￥{{ product.priceResult.minimumPrice }}-{{ product.priceResult.maximumPrice }}</span></p><p class="product-tags-container"><span class="product-tag" ng-repeat="tag in product.productTags">{{tag}}</span></p></div><div class="col col-20 actions-col"><span class="product-rating rating-{{ product.averageRating | floor }}">{{product.averageRating}}</span></div></div></div></div><div class="row row-center images-row"><div class="col col-20 image-wrapper" ng-repeat="picture in product.additionalImages.slice(0, 5) track by $index"><pre-img ratio="_1_1" ng-repeat="(key,value) in picture"><img class="product-image" ng-if="key" ng-src="{{serverUrl}}/{{value[0].additionalImageDetail}}" spinner-on-load></pre-img><div class="has-more-images" ng-if="$index == 4 && product.additionalImages.length > 5"><span class="images-count">{{ product.additionalImages.length - 5 }}</span></div></div></div></div></div></div></div></ion-content></ion-view>'),
        e.put("views/search/fashion_search.html",'<ion-view class="feed-fashion-view" cache-view="false"><ion-header-bar class="search-header"><div class="row item-input-inset search-row"><div class="col col-75"><label class="item-input-wrapper search-label"><i class="icon ion-ios-search placeholder-icon"></i> <input type="search" placeholder="Search" name="search_query" ng-model="search.query"></label></div><div class="col"><button class="button button-clear cancel-button" ng-click="cancelSearch()">取消</button></div></div></ion-header-bar><ion-content><!-- <div ng-if="results.length == 0">      <h2>No results</h2>    </div> --><div class="row products-row"><div class="col col-50 fashion-product-container" ng-repeat="product in results = products | searchField : \'product.productName\' | filter:search.query| orderBy:\'id\'"><div class="list card"><div class="item item-image product-image-wrapper"><a class="product-anchor" ui-sref="main.app.feed.fashion.content({productId: product.productId})"><pre-img ratio="_1_1"><img class="product-image" ng-src="{{serverUrl}}/{{ product.mediumImageUrl }}" spinner-on-load></pre-img></a></div><div class="item item-body product-description-wrapper"><h5 class="product-title"><a class="product-anchor" ui-sref="main.app.feed.fashion.content({productId: product.id})">{{ product.productName }}</a></h5><p class="product-description"><b class="actual-price">￥{{product.priceResult.defaultPrice}}</b> <span class="previous-price" ng-show="product.priceResult.promoPrice != \'0\'">￥{{product.priceResult.promoPrice}}</span></p></div></div></div></div></ion-content></ion-view>'),
        e.put("views/liked/liked.html",'<ion-view class="liked-view" cache-view="false"><ion-header-bar align-title="left" class="bar-positive"><h1 class="title">Liked!</h1></ion-header-bar><ion-content class="padding"><button class="button button-block button-positive" ui-sref="main.app.liked.new-list()">Start a new list</button><div class="item item-divider">APRIL</div><div class="card" ng-repeat="list in lists"><div class="item item-text-wrap"><p>Name: {{list.name}}</p><p>Category: {{list.category}}</p><p>Tags: {{list.tags}}</p><p>Creation Date: {{list.creation_date}}</p>Products: <span ng-repeat="product in list.products">{{product.id}}</span><div><a ui-sref="main.app.liked.list-details({listId: list.id})">Go to list details page</a></div></div></div></ion-content></ion-view>'),
        e.put("views/liked/list-details.html",'<ion-view class="liked-view" cache-view="false"><ion-header-bar align-title="left" class="bar-positive"><div class="buttons"><button class="button" ng-click="goBack()">Back</button></div><h1 class="title">List Details</h1></ion-header-bar><ion-content class="padding"><img ng-src="http://lorempixel.com/200/100"><h2>List Details</h2><div class="card"><div class="item item-text-wrap"><div>List Name: {{list.name}}</div><div>Created: {{list.creation_date}}</div><a ui-sref="main.app.feed.fashion.content()">Go to fashion content page</a></div></div></ion-content></ion-view>'),
        e.put("views/liked/new-list.html",'<ion-view class="liked-view" cache-view="false"><ion-header-bar align-title="left" class="bar-positive"><div class="buttons"><button class="button" ng-click="cancel()">Cancel</button></div><h1 class="title">New List</h1><div class="buttons"><button class="button" ng-click="create()">Create</button></div></ion-header-bar><ion-content class="padding"><div class="list list-inset"><label class="item item-input"><input type="text" placeholder="Name"></label><label class="item item-input"><input type="text" placeholder="Tags"></label><label class="item item-input item-select"><div class="input-label">Category</div><select><option>Blue</option><option selected="selected">Green</option><option>Red</option></select></label></div></ion-content></ion-view>'),
        e.put("views/account/account.html",'<ion-view class="account-view" cache-view="false"><ion-header-bar class="account-header"><h1 class="title">我的</h1></ion-header-bar><ion-pane><ion-tabs class="account-tabs tabs-top tabs"><ion-tab title="个人中心" ui-sref="main.app.account.profile"><ion-nav-view name="my-profile"></ion-nav-view></ion-tab><ion-tab title="订单信息" ui-sref="main.app.account.orders"><ion-nav-view name="my-orders"></ion-nav-view></ion-tab></ion-tabs></ion-pane></ion-view>'),
        e.put("views/account/profile.html",'<ion-view class="account-profile-view account-sub-view" cache-view="false"><ion-content><div class="row user-info-row"><div class="col col-25"><pre-img ratio="_1_1"><img class="profile-image" ng-src="{{serverUrl}}/content/control/stream?contentId={{user.logoImgId}}" spinner-on-load></pre-img></div><div class="col col-75 col-center user-info-col"><h3 class="user-welcome">欢迎 {{user.name}}!</h3><p class="user-email">{{user.email}}</p></div></div><div class="user-data-row"><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">姓名</span> <input type="text" placeholder="姓名" ng-model="user.name" ng-disabled="true"></label></div><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">电子邮箱</span> <input type="email" placeholder="电子邮件" ng-model="user.email" ng-disabled="true"></label></div><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">密码</span> <input type="password" placeholder="密码" ng-model="user.password" ng-disabled="true"></label></div></div><h3 class="account-sub-title">默认收货地址</h3><div class="address-chooser" ng-click="openAddressesPopover($event)"><button class="button button-block icon-right addresses-popover-button" ng-class="{\'ion-chevron-up\': addresses_popover.isShown(), \'ion-chevron-down\' : !addresses_popover.isShown()}"><!--{{data.selected_address.paAddress1 || \'选择地址\'}}--><div ng-if="data.selected_address" ng-repeat="a in user_shipping_addresses | filter: data.selected_address">{{ a.paAddress1}}</div></button></div><h3 class="account-sub-title">默认支付方式</h3><div class="card-chooser" ng-click="openCardsPopover($event)"><button class="button button-block icon-right cards-popover-button" ng-class="{\'ion-chevron-up\': addresses_popover.isShown(), \'ion-chevron-down\' : !addresses_popover.isShown()}">{{data.selected_card.number || \'Select Credit Card\'}}</button></div><div class="list account-divider"><div class="item item-divider"></div></div><h3 class="account-sub-title">通知设置</h3><div class="row notifications-row"><div class="col"><ul class="list notifications-list"><li class="item item-toggle"><span class="notifications-text">促销</span><label class="toggle"><input type="checkbox" ng-model="notifications.promotions"><div class="track"><div class="handle"></div></div></label></li><li class="item item-toggle"><span class="notifications-text">收货状态</span><label class="toggle"><input type="checkbox" ng-model="notifications.shipment_updates"><div class="track"><div class="handle"></div></div></label></li></ul></div></div><div class="list account-divider"><div class="item item-divider"></div></div><div class="row invite-and-rate-row"><div class="col"><button class="button button-block invite-friends-button">邀请朋友</button> <button class="button button-block button-clear rate-app-button"><i class="icon ion-android-star"></i> <span>Rate this app!</span></button></div></div><div class="row logout-terms-row"><div class="col"><div class="row terms-row"><div class="col col-35"><a class="button button-clear button-small legal-stuff-button">政策&隐私</a></div><div class="col col-40"><a class="button button-clear button-small legal-stuff-button">团队</a></div><div class="col col-25"><a class="button button-clear button-small legal-stuff-button">问&答</a></div></div><a class="button button-clear logout-button" ng-click="logout()">退出</a></div></div></ion-content></ion-view>'),
        e.put("views/account/orders.html",'<ion-view class="account-orders-view account-sub-view" cache-view="false" view-title="My Orders"><ion-content><div class="orders-row"><div class="card order-item" ng-repeat="order in orders.payOrders"><div class="item item-divider order-header"><span class="header-title">{{order.orderId}} - {{order.orderDate | amDateFormat:\'YYYY/MM/DD\'}}</span></div><div class="item item-text-wrap order-content"><div class="row order-product" ng-repeat="item in order.orderItems track by $index"><div class="col col-20 product-image-col"><div class="product-image-container" multi-bg="[serverUrl+item.mediumImageUrl]"></div></div><div class="col col-center name-col"><span class="product-name">{{item.description}}</span></div><div class="col col-center"><span class="product-price">{{item.totalAmount|currency:"￥"}}</span></div></div></div><div class="item item-divider order-footer shipped"><span class="status-title">待支付</span></div></div><div class="card order-item" ng-repeat="order in orders.shipOrders"><div class="item item-divider order-header"><span class="header-title">{{order.orderId}} - {{order.orderDate | amDateFormat:\'YYYY/MM/DD\'}}</span></div><div class="item item-text-wrap order-content"><div class="row order-product" ng-repeat="item in order.orderItems track by $index"><div class="col col-20 product-image-col"><div class="product-image-container" multi-bg="[serverUrl+item.mediumImageUrl]"></div></div><div class="col col-center name-col"><span class="product-name">{{item.description}}</span></div><div class="col col-center"><span class="product-price">{{item.totalAmount|currency:"￥"}}</span></div></div></div><div class="item item-divider order-footer shipped"><span class="status-title">待收货</span></div></div><div class="card order-item" ng-repeat="order in orders.reviewOrders"><div class="item item-divider order-header"><span class="header-title">{{order.orderId}} - {{order.orderDate | amDateFormat:\'YYYY/MM/DD\'}}</span></div><div class="item item-text-wrap order-content"><div class="row order-product" ng-repeat="item in order.orderItems track by $index"><div class="col col-20 product-image-col"><div class="product-image-container" multi-bg="[serverUrl+item.mediumImageUrl]"></div></div><div class="col col-center name-col"><span class="product-name">{{item.description}}</span></div><div class="col col-center"><span class="product-price">{{item.totalAmount|currency:"￥"}}</span></div></div></div><div class="item item-divider order-footer delivered"><span class="status-title">待评价</span></div></div><div class="card order-item" ng-repeat="order in orders.cancelOrders"><div class="item item-divider order-header"><span class="header-title">{{order.orderId}} - {{order.orderDate | amDateFormat:\'YYYY/MM/DD\'}}</span></div><div class="item item-text-wrap order-content"><div class="row order-product" ng-repeat="item in order.orderItems track by $index"><div class="col col-20 product-image-col"><div class="product-image-container" multi-bg="[serverUrl+item.mediumImageUrl]"></div></div><div class="col col-center name-col"><span class="product-name">{{item.description}}</span></div><div class="col col-center"><span class="product-price">{{item.totalAmount|currency:"￥"}}</span></div></div></div><div class="item item-divider order-footer canceled"><span class="status-title">订单取消</span></div></div><div class="card order-item" ng-repeat="order in orders.finishOrders"><div class="item item-divider order-header"><span class="header-title">{{order.orderId}} - {{order.orderDate | amDateFormat:\'YYYY/MM/DD\'}}</span></div><div class="item item-text-wrap order-content"><div class="row order-product" ng-repeat="item in order.orderItems track by $index"><div class="col col-20 product-image-col"><div class="product-image-container" multi-bg="[serverUrl+item.mediumImageUrl]"></div></div><div class="col col-center name-col"><span class="product-name">{{item.description}}</span></div><div class="col col-center"><span class="product-price">{{item.totalAmount|currency:"￥"}}</span></div></div></div><div class="item item-divider order-footer" class="finished"><span class="status-title">订单完成</span></div></div></div></ion-content></ion-view>'),
        e.put("views/shopping-cart/cart.html",'<ion-view class="shopping-cart-view" cache-view="false"><ion-header-bar class="shopping-cart-header"><div class="buttons"><button class="button button-clear close-button" ng-click="close()">关闭</button></div><h1 class="title">购物车</h1><div class="buttons"><button class="button button-clear checkout-button" ui-sref="main.app.checkout()" ng-show="shoppingCart.shoppingCartItems.length > 0">结算</button></div></ion-header-bar><ion-content class="shopping-cart-content" has-bouncing="false"><div class="row row-center empty-cart-row" ng-if="!shoppingCart"><div class="col"><h3 class="no-products-title">空空入也</h3><div class="illustration-container"><pre-img ratio="_34_25"><img class="illustration-image" ng-src="./img/shopping-cart/cart-empty.png" spinner-on-load></pre-img></div></div></div><div ng-if="shoppingCart"><ul class="list shopping-bill"><li class="item"><div class="row"><div class="col"><span class="bill-item-title">总价</span></div><div class="col"><span class="bill-item-value">{{ shoppingCart.shoppingCart.displayGrandTotal | currency: \'RMB \' }}</span></div></div></li><li class="item"><div class="row"><div class="col"><span class="bill-item-title">销售税</span></div><div class="col"><span class="bill-item-value">{{ shoppingCart.shoppingCart.orderTaxTotal | currency: \'RMB \' }}</span></div></div></li><li class="item bill-total"><div class="row"><div class="col"><span class="bill-item-title">小计</span></div><div class="col"><span class="bill-item-value">{{ shoppingCart.shoppingCart.orderSubTotal | currency: \'RMB \' }}</span></div></div></li></ul><div class="item item-divider shopping-cart-divider">购物车 {{ shoppingCart.shoppingCartItems.length }} 个商品</div><div class="products-in-cart-row"><div class="card product-in-cart" ng-repeat="cartItem in shoppingCart.shoppingCartItems"><div class="item item-divider product-header"><div class="row"><div class="col col-center"><span class="product-name">{{cartItem.name}}</span></div><div class="col col-center"><button class="button button-icon icon ion-close-round remove-button" ng-click="removeFromCart($index)"></button></div></div></div><div class="item item-text-wrap product-content"><div class="row"><div class="col col-33 product-image-col"><div class="product-image-container" multi-bg="[serverUrl + cartItem.mediumImageUrl]"></div></div><div class="col col-center product-description-col"><span class="description-line">Style: <b>{{cartItem.style}}</b></span> <span class="description-line">Color: <b>{{cartItem.color}}</b></span> <span class="description-line">Size: <b>{{cartItem.size}}</b></span><div class="row"><div class="col col-50"><span class="description-line">数量: <b class="product-quantity">{{cartItem.quantity}}</b></span></div><div class="col quantity-input-col"><div class="button-bar input-number ng-pristine ng-untouched ng-valid"><a class="button icon ion-minus-round value-down-button" ng-click="minusOne(cartItem,$index)"></a> <a class="button icon ion-plus-round value-up-button" ng-click="plusOne(cartItem,$index)"></a></div><!--<number-input ng-model="cartItem.quantity"></number-input>--></div></div></div></div></div><div class="item item-divider product-footer"><div class="row"><div class="col"><span class="shipping-text">发货</span> <span class="shipping-text">预计2到3天到货</span></div><div class="col col-center"><span class="order-total">{{cartItem.itemSubTotal | currency: \'RMB \'}}</span></div></div></div></div></div></div></ion-content></ion-view>'),
        e.put("views/checkout/checkout.html",'<ion-view class="checkout-view" cache-view="false"><ion-header-bar class="checkout-header"><div class="buttons"><button class="button button-clear cancel-button" ng-click="cancel()">取消</button></div><h1 class="title">结算</h1></ion-header-bar><ion-content has-bouncing="false" class="checkout-content"><div class="row order-brief-row"><div class="col col-67"><div class="row illustration-row"><div class="col illustration-col"><img class="order-brief-illustration" ng-src="./img/checkout/checkout_illustration.png"></div><div class="col"><span class="order-brief-callout">{{shoppingCart.shoppingCartItems.length}}件商品准备中！</span></div></div></div><div class="col col-33 col-center order-total-col"><div class="order-total-wrapper"><span class="brief-total-title">小计:</span> <span class="brief-total">{{ shoppingCart.shoppingCart.displaySubTotal | currency: \'RMB \' }}</span></div></div></div><div class="row address-row"><div class="col"><div class="address-chooser"><a class="button button-block icon-right ion-chevron-right choose-addresses-button" ng-class="{\'aa\': addresses_popover.isShown(), \'bb\' : !addresses_popover.isShown()}" ui-sref="main.app.checkout.address()">{{ getSelectedAddress || \'Shipping Address\'}}</a></div><input type="hidden" ng-model="order.shipping_contact_mech_id" name="shipping_contact_mech_id"> <input type="hidden" ng-model="order.shipToCustomerPartyId" name="shipToCustomerPartyId"></div></div><div class="row promo-code-row"><div class="col"><label class="item item-input promo-item"><span class="input-label">促销代码</span> <input type="text"></label></div></div><div class="card list filter-group alt-filter-group"><div class="item item-divider">送货方式</div><ion-list class="show-filters filter-options-container" ng-repeat="shipment in carries"><ion-radio name="shipping_method" ng-model="order.shipping_method" ng-click="calculateAmount(shipment.estimate);" ng-value="shipment.shipmentMethodTypeId+\'@\'+shipment.partyId">{{shipment.description}}:&nbsp;-&nbsp;{{shipment.estimate | currency : \'￥\'}}</ion-radio></ion-list></div><div class="card list filter-group alt-filter-group"><div class="item item-divider">支付方式</div><ion-list class="show-filters filter-options-container" ng-repeat="payment in payments" ng-show="payment.paymentMethodTypeId===\'EXT_ALIPAY\' || payment.paymentMethodTypeId===\'EXT_COD\'"><ion-radio name="checkOutPaymentId" ng-model="order.checkOutPaymentId" ng-value="payment.paymentMethodTypeId">{{ (paymentNames | filter: {id:payment.paymentMethodTypeId})[0].name }}</ion-radio></ion-list></div><h3 class="checkout-sub-title">我的订单</h3><ul class="list checkout-products"><li class="item checkout-product" ng-repeat="cartItem in shoppingCart.shoppingCartItems"><div class="row"><div class="col col-20 product-image-col"><div class="product-image-container" multi-bg="[serverUrl + cartItem.mediumImageUrl]"></div></div><div class="col col-50 col-center"><span class="product-name">{{cartItem.description}}</span></div><div class="col col-center"><span class="product-price">{{cartItem.itemSubTotal|currency: \'RMB \'}}</span></div></div></li></ul><ul class="list checkout-bill"><li class="item"><div class="row"><div class="col"><span class="bill-item-title">费用</span></div><div class="col"><span class="bill-item-value">{{ shoppingCart.shoppingCart.displaySubTotal | currency: \'RMB \'}}</span></div></div></li><li class="item"><div class="row"><div class="col"><span class="bill-item-title">销售税</span></div><div class="col"><span class="bill-item-value">{{ shoppingCart.shoppingCart.orderTaxTotal | currency: \'RMB \' }}</span></div></div></li><li class="item"><div class="row"><div class="col"><span class="bill-item-title">快递费</span></div><div class="col"><span class="bill-item-value">{{ shoppingCart.shoppingCart.orderShippingTotal | currency: \'RMB \' }}</span></div></div></li><li class="item bill-total"><div class="row"><div class="col"><span class="bill-item-title">小计</span></div><div class="col"><span class="bill-item-value">{{ shoppingCart.shoppingCart.displayGrandTotal | currency: \'RMB \'}}</span></div></div></li></ul></ion-content><ion-footer-bar class="checkout-footer"><a class="button button-full place-order-button" ng-click="processOrder(order)">点击结算</a></ion-footer-bar></ion-view>'),
        e.put("views/checkout/address.html",'<ion-view class="checkout-address-view" cache-view="false"><ion-header-bar class="checkout-address-header"><div class="buttons"><button class="button button-clear cancel-button" ng-click="cancel()">取消</button></div><h1 class="title">收货地址</h1></ion-header-bar><ion-content class="checkout-address-content" has-bouncing="false"><div class="row everything-else-row"><div class="col"><div ng-if="user_shipping_addresses.length == 0"><div class="new-address-button-outer"><button class="button button-block new-address-button" ng-click="showNewAddressPopup()">新增地址</button></div></div><div ng-if="user_shipping_addresses.length > 0"><h3 class="shipping-address-title">选择收货地址</h3><div class="address-chooser" ng-click="openAddressesPopover($event)"><button class="button button-block icon-right addresses-popover-button" ng-class="{\'ion-chevron-up\': addresses_popover.isShown(), \'ion-chevron-down\' : !addresses_popover.isShown()}">{{data.selected_address.paAddress1 || \'选择地址\'}}</button></div></div><div class="address-details-container" ng-show="data.selected_address.street"><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">姓名</span><p class="input-data">{{data.selected_address.full_name}}</p></label></div><div class="row"><label class="col col-50 item item-input item-stacked-label"><span class="input-label">地址</span><p class="input-data">{{data.selected_address.street}}</p></label><label class="col col-50 item item-input item-stacked-label"><span class="input-label">邮编</span><p class="input-data">{{data.selected_address.apt_suite}}</p></label></div><div class="row"><label class="col col-50 item item-input item-stacked-label"><span class="input-label">城市</span><p class="input-data">{{data.selected_address.city}}</p></label><label class="col col-25 item item-input item-stacked-label"><span class="input-label">省/州</span><p class="input-data">{{data.selected_address.state}}</p></label><label class="col col-25 item item-input item-stacked-label"><span class="input-label">邮编</span><p class="input-data">{{data.selected_address.postal_code}}</p></label></div><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">手机号码</span><p class="input-data">{{data.selected_address.phone}}</p></label></div></div></div></div><div class="row actions-row"><div class="col"><a class="button button-full action-button" ng-click="saveSelectedAddress(data.selected_address)">保存&继续</a></div></div></ion-content></ion-view>'),
        e.put("views/checkout/card.html",'<ion-view class="checkout-card-view" cache-view="false"><ion-header-bar class="checkout-card-header"><div class="buttons"><button class="button button-clear cancel-button" ng-click="cancel()">Cancel</button></div><h1 class="title">Credit Card</h1></ion-header-bar><ion-content class="checkout-card-content" has-bouncing="false"><div class="row everything-else-row"><div class="col"><div ng-if="user_credit_cards.length == 0"><div class="new-card-button-outer"><button class="button button-block new-card-button" ng-click="showNewCardPopup()">New Credit Card</button></div></div><div ng-if="user_credit_cards.length > 0"><h3 class="credit-card-title">Select Credit Card</h3><div class="card-chooser" ng-click="openCardsPopover($event)"><button class="button button-block icon-right cards-popover-button" ng-class="{\'ion-chevron-up\': cards_popover.isShown(), \'ion-chevron-down\' : !cards_popover.isShown()}">{{data.selected_card.number || \'Select Credit Card\'}}</button></div></div><div class="illustration-container"><pre-img ratio="_37_26"><img class="illustration-image" ng-src="./img/checkout/card_illustration.png" spinner-on-load></pre-img></div></div></div><div class="row actions-row"><div class="col"><a class="button button-full action-button" ng-click="saveSelectedCreditCard(data.selected_card)">Save Card & Continue</a></div></div></ion-content></ion-view>'),
        e.put("views/checkout/promo-code.html",'<ion-view class="checkout-promo-view" cache-view="false"><ion-header-bar align-title="left" class="bar-positive"><div class="buttons"><button class="button" ng-click="cancel()">Cancel</button></div><h1 class="title">Promo code</h1></ion-header-bar><ion-content class="padding"><h2>Promo code here</h2></ion-content></ion-view>'),
        e.put("views/checkout/thanks.html",'<ion-view class="checkout-thanks-view" cache-view="false"><ion-header-bar class="checkout-thanks-header"><h1 class="title">Checkout</h1></ion-header-bar><ion-content has-bouncing="false" class="checkout-thanks-content"><div class="row row-center thanks-row"><div class="col"><h3 class="thanks-title">Your order is being prepared for shipping!</h3><div class="illustration-container"><pre-img ratio="_41_22"><img class="illustration-image" ng-src="./img/checkout/checkout_thanks_illustration.png" spinner-on-load></pre-img></div><div class="ok-button-outer"><a class="button button-block ok-button" ui-sref="main.app.feed.fashion">Great!</a></div></div></div></ion-content></ion-view>'),
        e.put("views/common/templates/show-hide-password.html",'<div class="show-hide-input" ng-transclude></div><a class="toggle-view-anchor" on-touch="toggleType($event)"><span class="ion-eye-disabled" ng-show="show"></span> <span class="ion-eye" ng-show="!show"></span></a>'),
        e.put("views/common/templates/pre-img.html",'<div class="pre-img {{ratio}} {{ helperClass }}" ng-class="{ \'finish-loading\': loaded }"><ion-spinner ng-show="!loaded" class="spinner-on-load"></ion-spinner><ng-transclude></ng-transclude></div>'),
        e.put("views/checkout/partials/edit-card-popup.html",'<div class="card-details-container"><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">信用卡</span> <input class="input-data" type="text" ng-model="card.number" placeholder="Required"></label></div><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">卡号</span> <input class="input-data" type="text" ng-model="card.full_name" placeholder="Required"></label></div><div class="row"><label class="col col-50 item item-input item-stacked-label"><span class="input-label">Expiration</span> <input class="input-data" type="text" ng-model="card.expiration" placeholder="mm/yy"></label><label class="col col-50 item item-input item-stacked-label"><span class="input-label">CCV</span> <input class="input-data" type="text" ng-model="card.ccv" placeholder="Required"></label></div></div>'),
        e.put("views/checkout/partials/edit-shipping-address-popup.html",'<div class="address-details-container"><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">姓名</span> <input class="input-data" type="text" ng-model="address.paAttnName" placeholder="Required"></label></div><div class="row"><label class="col col-50 item item-input item-stacked-label"><span class="input-label">省&州</span><div class="card-chooser" ng-click="openProvincePopover($event)"><button class="button button-block icon-right cards-popover-button" ng-class="{\'ion-chevron-up\': province_popover.isShown(), \'ion-chevron-down\' : !province_popover.isShown()}"><p ng-repeat="u in chnGeoList  | filter: address.paStateProvinceGeoId ">{{ u.name || \'选择省(直辖市)\'}}</p></button></div></label><label class="col col-50 item item-input item-stacked-label"><span class="input-label">城市</span><!--<input class="input-data" type="text" ng-model="address.paCity" placeholder="Houston">--><div class="card-chooser" ng-click="openCityPopover($event)"><button class="button button-block icon-right cards-popover-button" ng-class="{\'ion-chevron-up\': city_popover.isShown(), \'ion-chevron-down\' : !city_popover.isShown()}"><p ng-repeat="u in cityGeoList  | filter: address.paCity ">{{ u.name || \'选择城市\'}}</p></button></div></label></div><div class="row"><label class="col col-50 item item-input item-stacked-label"><span class="input-label">区/县</span><!--<input class="input-data" type="text" ng-model="address.paCity" placeholder="Houston">--><div class="card-chooser" ng-click="openCountyPopover($event)"><button class="button button-block icon-right cards-popover-button" ng-class="{\'ion-chevron-up\': county_popover.isShown(), \'ion-chevron-down\' : !county_popover.isShown()}"><p ng-repeat="u in countyGeoList  | filter: address.paCountyGeoId ">{{ u.name || \'选择区县\'}}</p></button></div></label><label class="col col-50 item item-input item-stacked-label"><span class="input-label">邮政编码</span> <input class="input-data" type="text" ng-model="address.paPostalCode" placeholder="11000"></label></div><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">地址行</span> <input class="input-data" type="text" ng-model="address.paAddress1" placeholder="Street"></label></div><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">手机</span> <input class="input-data" type="text" ng-model="address.paMobilePhone" placeholder="+123 55 66 77"></label></div></div>'),
        e.put("views/checkout/partials/new-shipping-address-popup.html",'<div class="address-details-container"><div ng-show="error" class="row"><div class="has-errors">{{error}}</div></div><div class="row"><label class="col col-50 item item-input item-stacked-label"><span class="input-label">姓名</span> <input class="input-data" type="text" ng-model="address.paAttnName" placeholder="必填"></label></div><div class="row"><label class="col col-50 item item-input item-stacked-label"><span class="input-label">省&州</span><!--<input class="input-data" type="text" ng-model="address.paStateProvinceGeoId" placeholder="AK">--><div class="card-chooser" ng-click="openProvincePopover($event)"><button class="button button-block icon-right cards-popover-button" ng-class="{\'ion-chevron-up\': province_popover.isShown(), \'ion-chevron-down\' : !province_popover.isShown()}"><p ng-repeat="u in chnGeoList  | filter: address.paStateProvinceGeoId " ng-if="address.paStateProvinceGeoId">{{ u.name || \'选择\'}}</p></button></div></label><label class="col col-50 item item-input item-stacked-label"><span class="input-label">城市</span><div class="card-chooser" ng-click="openCityPopover($event)"><button class="button button-block icon-right cards-popover-button" ng-class="{\'ion-chevron-up\': city_popover.isShown(), \'ion-chevron-down\' : !city_popover.isShown()}"><!--{{ address.paCity|| \'选择\'}}--><p ng-repeat="u in cityGeoList  | filter: address.paCity " ng-if="address.paCity">{{ u.name || \'选择\'}}</p></button></div></label></div><div class="row"><label class="col col-50 item item-input item-stacked-label"><span class="input-label">区县</span><!--<input class="input-data" type="text" ng-model="address.paCity" placeholder="Houston">--><div class="card-chooser" ng-click="openCountyPopover($event)"><button class="button button-block icon-right cards-popover-button" ng-class="{\'ion-chevron-up\': county_popover.isShown(), \'ion-chevron-down\' : !county_popover.isShown()}"><!--{{ address.paCity|| \'选择\'}}--><p ng-repeat="u in countyGeoList  | filter: address.paCountyGeoId " ng-if="address.paCountyGeoId">{{ u.name || \'选择\'}}</p></button></div></label><label class="col col-50 item item-input item-stacked-label"><span class="input-label">邮政编码</span> <input class="input-data" type="text" ng-model="address.paPostalCode" placeholder="必填"></label></div><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">地址行</span> <input class="input-data" type="text" ng-model="address.paAddress1" placeholder="Street"></label><!--<label class="col col-50 item item-input item-stacked-label"> <span class="input-label">Apt/Suite</span> <input class="input-data" type="text" ng-model="address.apt_suite" placeholder="Optional"> </label>--></div><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">手机</span> <input class="input-data" type="text" ng-model="address.paMobilePhone" placeholder="+123 55 66 77"></label></div></div>'),
            e.put("views/checkout/partials/new-card-popup.html",'<div class="card-details-container"><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">银联卡</span> <input class="input-data" type="text" placeholder="Required"></label></div><div class="row"><label class="col item item-input item-stacked-label"><span class="input-label">卡号</span> <input class="input-data" type="text" placeholder="Required"></label></div><div class="row"><label class="col col-50 item item-input item-stacked-label"><span class="input-label">Expiration</span> <input class="input-data" type="text" placeholder="mm/yy"></label><label class="col col-50 item item-input item-stacked-label"><span class="input-label">CCV</span> <input class="input-data" type="text" placeholder="Required"></label></div></div>'),

        e.put("views/common/templates/multi-bg.html",'<div class="multi-bg-outer" ng-class="{\'finish-loading\': loaded }"><img bg class="multi-bg {{ helperClass }}" ng-src="{{ bg_img }}"> <span class="bg-overlay"></span><ion-spinner ng-show="!loaded" class="spinner-on-load"></ion-spinner><!-- <span ng-show="!loaded" class="spinner-on-load ion-load-c"></span> --><ng-transclude></ng-transclude></div>'),
        e.put("views/content/fashion/color-chooser.html",'<ion-list class="color-options-list"><ion-radio ng-repeat="color in colorList" ng-model="data_chosen_color" ng-change="featureColorChange(color)" ng-value="\'{{ color.colorId }}\'">{{ color.colorName }}</ion-radio>'),
        e.put("views/content/fashion/size-chooser.html",'<ion-list class="size-options-list"> <ion-radio ng-repeat="size in sizeList" name="chosen_size" ng-model="chosen_size" ng-change="featureSizeChange(size)" ng-value="\'{{ size.sizeId }}\'">{{ size.sizeName }}</ion-radio></ion-list>'),
        e.put("views/content/fashion/feature-chooser.html",'<ion-list class="size-options-list"><ion-radio ng-repeat="feature in features" name="chosen_feature_{{name}}" ng-model="chosen_feature" ng-change="featureChange(feature)" ng-value="\'{{ feature.productFeatureId }}\'">{{ feature.description }}</ion-radio></ion-list>'),
        e.put("views/content/food/schedules.html",'<div class="row schedules-title-row"><div class="col col-80"><h4 class="title-name">营业时间</h4></div><div class="col col-20"><i class="icon ion-android-time title-icon"></i></div></div><div class="list schedules-list"><div class="item">星期一 <span class="item-note">上午 12:00 到 下午 10:00</span></div><div class="item">星期二 <span class="item-note">上午 12:00 到 下午 10:00</span></div><div class="item">星期三 <span class="item-note">上午 12:00 到 下午 10:00</span></div><div class="item">星期四 <span class="item-note">上午 12:00 到 下午 12:00 am</span></div><div class="item">星期五 <span class="item-note">上午 12:00 到 下午 12:00 am</span></div><div class="item">星期六 <span class="item-note">上午 12:00 到 下午 12:00 am</span></div><div class="item">星期日 <span class="item-note close-note">停止营业</span></div></div><hr class="schedules-divider"><div class="row schedules-title-row"><div class="col col-70"><h4 class="title-name">本店使用</h4></div><div class="col col-30"><i class="icon ion-card title-icon">银联卡</i></div></div>'),
        e.put("views/content/food/addresses.html",'<div class="list addresses-list"><div class="address-item row row-center" ng-repeat="address in addresses"><label class="col item item-radio"><input type="radio" name="pick_address" ng-model="selected_address" ng-value="address" ng-change="selectAddress(address)"><div class="radio-content"><div class="item-content disable-pointer-events"><span class="address-name">{{address.street}}</span></div><i class="radio-icon disable-pointer-events icon ion-checkmark"></i></div></label></div></div>'),
        e.put("views/content/food/progress-bar.template.html",'<div class="progress-bar"><div class="progress-value" style="width:{{ (model*100)/max }}%"></div></div>'),
        e.put("views/feed/templates/sliding-list.html",'<div class="pre-transparency {{ active_class | cleanStateClass }}"></div><ion-scroll class="sliding-list-scroll" delegate-handle="sliding-list-scroll" scrollbar-x="false" has-bouncing="false" direction="x"><div class="sliding-list-bg {{ active_class | cleanStateClass }}" ng-transclude></div></ion-scroll><div class="post-transparency {{ active_class | cleanStateClass }}"></div>'),
        e.put("views/feed/templates/sliding-item.html",'<li class="sliding-item {{this.state | cleanStateClass}}" ng-click="select(this)" ng-class="{ active: this.selected }" ng-transclude></li>'),
        e.put("views/filters/tab.template.html",'<a class="button" ng-class="{ \'active\': selected }" ng-transclude></a>'),
        e.put("views/filters/tag-checkbox.template.html",'<label class="item item-checkbox"><div class="checkbox checkbox-input-hidden disable-pointer-events"><input type="checkbox" ng-model="model"><h3 class="checkbox-title">{{ title }}</h3></div><div class="item-content disable-pointer-events" ng-transclude></div></label>'),
        e.put("views/filters/tag-radio.template.html",'<label class="item item-radio"><input type="radio" name="{{name || \'radio-group\'}}" ng-model="model" ng-value="value"><div class="radio-content"><div class="item-content disable-pointer-events" ng-transclude></div></div></label>'),
        e.put("views/filters/color-radio.template.html",'<label class="item item-radio"><input type="radio" name="{{name || \'radio-group\'}}" ng-model="model" ng-value="value"><div class="radio-content"><div class="item-content disable-pointer-events" style="border-color:{{value}}; background-color:{{value}}" ng-transclude></div></div></label>'),
        e.put("views/filters/number-input.template.html",'<div class="button-bar input-number"><a class="button icon ion-minus-round value-down-button" ng-click="minusOne()"></a> <a class="button icon ion-plus-round value-up-button" ng-click="plusOne()"></a></div>'),
        e.put("views/getting-started/custom-checkbox.template.html",'<label class="item item-checkbox"><div class="checkbox checkbox-input-hidden disable-pointer-events"><input type="checkbox" ng-model="model"> <i class="checkbox-icon"></i><h3 class="checkbox-title">{{ title }}</h3></div><div class="item-content disable-pointer-events" ng-transclude></div></label>'),
        e.put("views/sort/sort.html",'<ion-list class="sort-options-list"><ion-radio ng-model="sort_order" ng-value="\'Distance\'">Distance</ion-radio><ion-radio ng-model="sort_order" ng-value="\'Price\'">Price</ion-radio><ion-radio ng-model="sort_order" ng-value="\'Rating\'">Rating</ion-radio><ion-radio ng-model="sort_order" ng-value="\'Alphabetical\'">Alphabetical</ion-radio></ion-list>'),
        e.put("views/sort/fashionSort.html",'<ion-list class="sort-options-list"><ion-radio ng-model="sort_order" ng-value="\'\'">综合排序</ion-radio><ion-radio ng-model="sort_order" ng-value="\'SortProductField:totalTimesViewed\'">最具人气</ion-radio><ion-radio ng-model="sort_order" ng-value="\'SortProductField:totalQuantityOrdered\'">销量</ion-radio><ion-radio ng-model="sort_order" ng-value="\'SortProductField:averageCustomerRating\'">评价</ion-radio></ion-list>')
}]).controller("SignupCtrl", ["$scope", "$state", "$ionicLoading", "$timeout", "$ionicModal", "$ionicPopup", "AuthService", "OAUTH_SERVER_URL", "$http", "PersonRegister", function (e, n, t, i, s, p, AuthService, oauthServerUrl, $http,PersonRegister) {
    e.doSignUp = function (signup_form, user) {
        t.show({template: "正在创建账户..."});
        console.log(user);
        if (signup_form.$valid) {
            PersonRegister.get(user, function (data) {
                console.log(data.resultData);
                if (data.resultData && data.resultData.partyId) {
                    n.go('intro.auth-login');
                } else {
                    e.error = data.resultData.errorMessage;
                }

            }, function (error) {
                e.error = error.toString();
                t.hide();
            });
            i(function () {
                    t.hide();
                },
                800);
        }
    };
    e.authenticateUser = function (provider) {
        AuthService.authenticateUser(provider, e.user);
    };

    s.fromTemplateUrl("views/legal/privacy-policy.html", {
        scope: e,
        animation: "slide-in-up"
    }).then(function (n) {
        e.privacy_policy_modal = n
    }), s.fromTemplateUrl("views/legal/terms-of-service.html", {
        scope: e,
        animation: "slide-in-up"
    }).then(function (n) {
        e.terms_of_service_modal = n
    }), e.showTerms = function () {
        e.terms_of_service_modal.show()
    }, e.showPrivacyPolicy = function () {
        e.privacy_policy_modal.show()
    }
}]).controller("ForgotPasswordCtrl", ["$scope", "$state", "$ionicLoading", "$timeout", function (e, n, t, i) {
    e.user = {}, e.user.email = "", e.recoverPassword = function () {
        console.log("recover password"), t.show({template: "Recovering password..."}), i(function () {
            n.go("main.app.feed.fashion"), t.hide()
        }, 800)
    }
}]);


'use strict';
angular.module('gbcui_shopApp.account', [
    'gbcui_shopApp.account.directives',
    'gbcui_shopApp.account.services',
    'gbcui_shopApp.account.controllers'
]);


angular.module("gbcui_shopApp.account.controllers", []).controller("ProfileCtrl", ["$scope", "user", "$ionicPopover", "$ionicPopup", "$ionicActionSheet",
    "$state", "AuthService", "SERVER_URL", "GetAssociatedStateList", "PersonAddressDel", "PersonAddressUpdate", "PersonAddressAdd", "SetDefaultPersonProfile",
    function (e, n, t, i, s, o, auth, su, gs, pad, pau, paa, sdpp) {
        var credit_cards = [{
            "full_name": "王二麻子",
            "number": "**** **** **** 4295",
            "type": "银联",
            "ccv": 556,
            "expiration": "11/18/2016"
        }];
        e.serverUrl = su;
        e.user = n,
            e.user_credit_cards = credit_cards,
            e.user_shipping_addresses = n.contactMech,
            e.data = {},
            e.data.selected_card = credit_cards[0],
            console.log('default shipp address:', n.defaultShipAddr.partyAndContactMech)
        e.data.selected_address = n.defaultShipAddr.partyAndContactMech,
            e.user.name = n.firstName + " " + n.lastName,
            e.user.password = "pepe123456789",
            e.show_new_address_button = 1,
            e.show_new_card_button = !1,
            e.notifications = {},
            e.notifications.promotions = !1,
            e.notifications.shipment_updates = !0,
            console.log("ProfileCtrl:e.user=", e);
        gs.get({countryGeoId: 'CHN', listOrderBy: 'geoId'}, function (data) {
            console.log(data)
            if (data.resultData || data.resultData.stateList) {
                e.chnGeoList = data.resultData.stateList
            }

        });


        //新增收货地址



        t.fromTemplateUrl("views/checkout/partials/address-chooser-popover.html", {scope: e}).then(function (n) {
            e.addresses_popover = n
        });
        t.fromTemplateUrl("views/checkout/partials/card-chooser-popover.html", {scope: e}).then(function (n) {
            e.cards_popover = n
        });

        e.openAddressesPopover = function (n) {
            e.addresses_popover.show(n)
        }
        e.selectShippingAddress = function (n) {
            //设置默认收货地址
            sdpp.set({defaultShipAddr: n.contactMechId}, function (resp) {
                console.log('set default ship address success:', n);
                e.data.selected_address = n;
            }, function (err) {
                console.log('set defalut ship address error', err);
            });
            e.addresses_popover.hide()
        }, e.openCardsPopover = function (n) {
            e.cards_popover.show(n)
        }, e.selectCreditCard = function (n) {
            e.cards_popover.hide()
        }, e.logout = function () {
            s.show({
                titleText: "确定退出?",
                destructiveText: "退出",
                cancelText: "取消",
                cancel: function () {
                    return !0
                },
                destructiveButtonClicked: function () {
                    auth.logout();
                    o.go("intro.auth-login")
                }
            })
        }, e.showEditCardPopup = function (n) {
            e.card = n;
            var t = i.show({
                cssClass: "popup-outer edit-card-view",
                templateUrl: "views/checkout/partials/edit-card-popup.html",
                title: "**** " + n.number.slice(-4),
                scope: e,
                buttons: [{text: "关闭"}, {
                    text: "删除", type: "delete-button", onTap: function (e) {
                    }
                }, {
                    text: "编辑", onTap: function (e) {
                    }
                }]
            });
            t.then(function (e) {
                e && console.log(e)
            })
        };


        e.openProvincePopover = function (n) {
            e.province_popover.show(n);
        };
        e.selectProvince = function (n) {
            gs.get({countryGeoId: n.id, listOrderBy: 'geoId'}, function (data) {
                console.log(data)
                if (data.resultData || data.resultData.stateList) {
                    e.cityGeoList = data.resultData.stateList;
                    e.city_length = data.resultData.stateList.length;
                }

            });
            e.countyGeoList = '';
            e.province_popover.hide();
        };
        e.openCityPopover = function (n) {
            e.city_popover.show(n);
        };
        e.selectCity = function (n) {
            gs.get({countryGeoId: n.id, listOrderBy: 'geoId'}, function (data) {
                console.log(data)
                if (data.resultData || data.resultData.stateList) {
                    e.countyGeoList = data.resultData.stateList;
                    e.county_length = data.resultData.stateList.length;
                }

            });
            e.city_popover.hide();
        };
        e.openCountyPopover = function (n) {
            e.county_popover.show(n)
        };
        e.selectCounty = function (n) {
            e.county_popover.hide();
        };

        e.showEditAddressPopup = function (n) {
            t.fromTemplateUrl("views/checkout/partials/city-chooser-popover.html", {scope: e}).then(function (n) {
                e.city_popover = n;
            });
            t.fromTemplateUrl("views/checkout/partials/province-chooser-popover.html", {scope: e}).then(function (n) {
                e.province_popover = n;
            });
            t.fromTemplateUrl("views/checkout/partials/county-chooser-popover.html", {scope: e}).then(function (n) {
                e.county_popover = n;
            });
            e.address = n;
            gs.get({countryGeoId: n.paStateProvinceGeoId, listOrderBy: 'geoId'}, function (data) {
                console.log(data)
                if (data.resultData || data.resultData.stateList) {
                    e.cityGeoList = data.resultData.stateList;
                    e.province_length = data.resultData.stateList.length;
                }

            });
            gs.get({countryGeoId: n.paCity, listOrderBy: 'geoId'}, function (data) {
                console.log(data)
                if (data.resultData || data.resultData.stateList) {
                    e.countyGeoList = data.resultData.stateList;
                    e.county_length = data.resultData.stateList.length;
                }

            });
            i.show({
                cssClass: "popup-outer edit-shipping-address-view",
                templateUrl: "views/checkout/partials/edit-shipping-address-popup.html",
                title: n.street,
                scope: e,
                buttons: [{
                    text: "关闭", opTap: function (r) {
                        console.log('close=', e.address);
                        e.province_popover.remove();
                        e.city_popover.remove();
                        e.county_popover.remove();
                        return 'closed'
                    }
                }, {
                    text: "删除", type: "delete-button", onTap: function (r) {
                        console.log('delete=', e.address)
                        e.province_popover.remove();
                        e.city_popover.remove();
                        e.county_popover.remove();
                        //删除地址
                        pad.get({contactMechId: e.address.contactMechId}, function (resp) {
                            console.log('delete address success:', resp);
                            //更新地址列表
                            e.addresses_popover.remove();
                            angular.forEach(e.user_shipping_addresses, function (data, index) {
                                if (data.contactMechId === e.address.contactMechId) {
                                    e.user_shipping_addresses.splice(index, 1);

                                }
                            });
                            if(e.user_shipping_addresses) {
                                e.data.selected_address = e.user_shipping_addresses[0];
                            }
                            t.fromTemplateUrl("views/checkout/partials/address-chooser-popover.html", {scope: e}).then(function (n) {
                                e.addresses_popover = n;
                            });
                            //profile address


                        }, function (err) {
                            console.log('delete address success:', err);
                        });
                        e.addresses_popover.remove();
                        return 'deleted'
                    }
                }, {
                    text: "编辑", onTap: function (r) {
                        console.log('edit=', e.address);
                        e.province_popover.remove();
                        e.city_popover.remove();
                        e.county_popover.remove();
                        //编辑地址
                        var editAddress =
                        {
                            address1: e.address.paAddress1,
                            attnName: e.address.paAttnName,
                            city: e.address.paCity,
                            countyGeoId: e.address.paCountyGeoId,
                            mobilePhone: e.address.paMobilePhone,
                            postalCode: e.address.paPostalCode,
                            stateProvinceGeoId: e.address.paStateProvinceGeoId,
                            contactMechId: e.address.contactMechId
                        };
                        console.log('editAddress', editAddress)
                        pau.get(editAddress, function (resp) {
                            console.log('update address success:', resp);
                        }, function (err) {
                            console.log('delete address err:', err);
                        });
                        return 'updated'
                    }
                }]
            }).then(function (popup) {
                console.log(popup)
                //popup && console.log(popup)
            })
        };
        e.showNewAddressPopup = function () {
            e.error = '';
            e.address = {};
            t.fromTemplateUrl("views/checkout/partials/city-chooser-popover.html", {scope: e}).then(function (n) {
                e.city_popover = n;
            });
            t.fromTemplateUrl("views/checkout/partials/province-chooser-popover.html", {scope: e}).then(function (n) {
                e.province_popover = n;
            });

            t.fromTemplateUrl("views/checkout/partials/county-chooser-popover.html", {scope: e}).then(function (n) {
                e.county_popover = n;
            });
            var n = i.show({
                cssClass: "popup-outer new-shipping-address-view",
                templateUrl: "views/checkout/partials/new-shipping-address-popup.html",
                title: "新地址",
                scope: e,
                buttons: [{text: "关闭"}, {
                    text: "新建", onTap: function (tap) {
                        console.log(e.address)
                        if (e.address && e.address.paAttnName && e.address.paAddress1 &&e.address.paCountyGeoId && e.address.paCity && e.address.paMobilePhone && e.address.paPostalCode && e.address.paStateProvinceGeoId) {
                            var newAddress =
                            {
                                address1: e.address.paAddress1,
                                attnName: e.address.paAttnName,
                                city: e.address.paCity,
                                countyGeoId: e.address.paCountyGeoId,
                                mobilePhone: e.address.paMobilePhone,
                                postalCode: e.address.paPostalCode,
                                stateProvinceGeoId: e.address.paStateProvinceGeoId,
                                contactMechId: ''

                            };
                            paa.save(newAddress, function (resp) {
                                console.log('add address success:', resp);
                                //更新地址列表

                                e.user_shipping_addresses.push(e.address);
                                e.addresses_popover.remove();
                                t.fromTemplateUrl("views/checkout/partials/address-chooser-popover.html", {scope: e}).then(function (n) {
                                    e.addresses_popover = n;
                                });


                                return 'added'
                            }, function (err) {
                                console.log('add address err:', err);
                                return err;
                            })
                        } else {
                            e.error = '请完善地址信息!'
                            tap.preventDefault();
                        }
                    }
                }]
            });
            n.then(function (e) {
                e && console.log(e)
            })
        };
    }]).controller("OrdersCtrl", ["$scope", "orders", "OrderService", "SERVER_URL", function (e, n, t, su) {
    e.serverUrl = su;
    e.orders = n
}]);

angular.module("gbcui_shopApp.account.directives", []).directive("testDirective", ["$timeout", function (e) {
    return {
        restrict: "A", scope: {}, controller: ["$scope", function (e) {
        }], link: function (e, n, t, i) {
        }
    }
}]);

angular.module("gbcui_shopApp.account.services", []).service("OrderService", ["$http", "$q", "GetOrderHistory", function (e, n, o) {
    this.getUserOrders = function () {
        var t = n.defer(), i = this;
        return o.get(function (e) {
            console.log(e.resultData);
            t.resolve(e.resultData)
        }, function (err) {
            t.resolve(err)
        }), t.promise
    }
}]).service("ProfileService", ["$http", "$q", "PersonBaseQuery", "PersonAddressDefault", "PersonAddressQuery", "PersonContent", function (e, n, p, pad, paq, pc) {
    this.getUserData = function () {
        var t = n.defer();
        return p.get(function (data) {
            if (data.resultData) {
                var person = data.resultData.person
                pad.get(function (pdata) {
                        if (pdata && pdata.resultData) {
                            person.defaultShipAddr = pdata.resultData;
                        }
                        paq.get(function (g) {
                            if (g && g.resultData) {
                                person.contactMech = g.resultData.contactMech;
                            }
                            t.resolve(person)
                        }, function (err) {
                            console.log(err)
                            t.defer(err)
                        })
                    }
                );
                pc.get({partyContentTypeId: 'LGOIMGURL'}, function (response) {
                    console.log(response);
                    if (response && response.resultData && response.resultData.partyContents) {
                        var partyContent = response.resultData.partyContents[0];
                        console.log('partyContent=', response.resultData)
                        if (partyContent) {
                            person.logoImgId = partyContent.content.contentId;
                        }

                    }
                }, function (error) {
                    console.log(error)
                });

                console.log("ProfileService.getUserData=", person);

            }
        })
            /* return e.get("logged_user_db.json").success(function (e) {
             t.resolve(e.user)
             })*/
            , t.promise
    }
}]).controller("OrdersCtrl", ["$scope", "orders", "OrderService", "SERVER_URL", function (e, n, t, su) {
    var orderStatus = [
        {ORDER_CANCELED: 'canceled'},
        {ORDER_CANCELED: 'canceled'},
        {ORDER_CANCELED: 'canceled'},
        {ORDER_CANCELED: 'canceled'},
    ]
    e.serverUrl = su;
    e.orders = n
}]);
'use strict';
angular.module('gbcui_shopApp.auth', [
    'gbcui_shopApp.auth.controllers',
    'gbcui_shopApp.auth.directives',
    'gbcui_shopApp.auth.services'
]);
angular.module("gbcui_shopApp.auth.directives", []).directive("testDirective", ["$timeout", function (e) {
    return {
        restrict: "A", scope: {}, controller: ["$scope", function (e) {
        }], link: function (e, n, t, i) {
        }
    }
}]);

angular.module("gbcui_shopApp.auth.controllers", []).controller("LoginCtrl", ["$scope", "$state", "$ionicLoading", "$timeout", "AUTH_EVENTS", "$ionicPopup", "AuthService", "$q", function (e, n, t, i, s, p, AuthService) {
        e.user = {username:'csy',password:'changsy'}, e.user.email = "", e.user.password = "",
        e.authenticateUser = function (provider) {
            AuthService.authenticateUser(provider, e.user);
        };
        e.doLogIn = function () {
            console.log(e.user);
            t.show({template: "正在登录..."}),
                AuthService.login(e.user.username, e.user.password).$promise.then(function (data) {
                    console.log(data);
                    if (data && data.token) {
                        // Make a request and receive your auth token from your server
                        if (data.token) {
                            AuthService.storeUserCredentials(data.token);
                            n.go("main.app.feed.fashion");
                            i(function () {
                                t.hide();
                            }, 500)
                        }
                    }
                }, function (error) {
                    console.log(error)
                    t.hide();
                })

        }, e.doFacebookLogIn = function () {
        console.log("doing FACEBOOK log in"), t.show({template: "Loging in..."}), i(function () {
            n.go("main.app.feed.fashion"), t.hide()
        }, 800)
    }

    e.$on(s.unauthorized, function (event) {
        i(function () {
            var alertPopup = p.alert({
                title: '抱歉......',
                template: '登录不成功，请重新登录!'
            });
        }, 80)
    });

    e.$on(s.pageNotFound, function (event) {

        var alertPopup = p.alert({
            title: '抱歉......',
            template: '您的网络似乎有点问题!'
        });
    });
    e.$on(s.forbidden, function (event) {

        var alertPopup = p.alert({
            title: '抱歉......',
            template: '您的请求被拒绝!'
        });
    });
}]);
angular.module("gbcui_shopApp.auth.services", []).service("AuthService", ["$http", "$q", 'USER_ROLES', 'UserLogin', 'localStorageService', "OAUTH_BASE_URL", "OAUTH_SERVER_URL",
    "$rootScope", "$cordovaInAppBrowser", "$ionicLoading","$timeout",
    function ($http, $q, USER_ROLES, UserLogin, localStorageService, oauthUrl, oauthServerUrl, $rootScope, $cordovaInAppBrowser, t,i) {

        var LOCAL_TOKEN_KEY = 'appToken';
        var isAuthenticated = false;
        var role = ''; //anonymousUser,loginUser

        function loadUserCredentials() {
            var token = localStorageService.get(LOCAL_TOKEN_KEY);
            if (token) {
                useCredentials(token);
            } else {
                storeAnonymousCredentials();
            }
        }

        function storeUserCredentials(token) {
            localStorageService.set(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            isAuthenticated = true;
            if (token != 'anonymousUser' && token.indexOf('.') !== -1) {
                role = USER_ROLES.loginUser
            } else {
                role = USER_ROLES.anonymousUser
            }
        }

        function storeAnonymousCredentials() {
            isAuthenticated = true;
            role = USER_ROLES.anonymousUser;
        }

        function destroyUserCredentials() {
            isAuthenticated = true;
            role = USER_ROLES.anonymousUser;
            localStorageService.clearAll();
        }

        var login = function (name, pw, $q) {
            return UserLogin.get({username: name, password: pw});
        };

        var logout = function () {
            destroyUserCredentials();
        };

        var isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
        };

        loadUserCredentials();


        // Signing a user in
        var oauthlogin = function (userData, provider) {
            var self = this;
            var deferred = $q.defer();
            var success = function (response, status, headers, config) {
                console.log("oauthlogin:resolve")
                console.log(response)
                //oauth登录成功
                deferred.resolve(response);
            }

            var error = function (error, status, headers, config) {
                deferred.reject(error);
            }

            // if the provider is a social provider we use inAppbrowser to launch a new window
            // which will redirect the user to the provider's login page
            if (provider === 'instagram' || provider === 'twitter' || provider === 'facebook' || provider === 'qq' || provider === 'googleplus') {
                var options = {
                    location: 'no',
                    toolbar: 'yes',
                    clearsessioncache: 'yes',
                    clearcache: 'yes'
                };
                $cordovaInAppBrowser.open(oauthUrl + '/oauth.login/' + provider, "_blank", options).then(function () {
                    console.log("InAppBrowser opened " + oauthUrl + '/oauth.login/' + provider);
                }, function (error) {
                    console.log("Error: " + error);
                });
                $rootScope.$on('$cordovaInAppBrowser:loadstart', function (e, event) {
                        var _url = event.url.toString();
                        console.log("_url=");
                        console.log(_url)
                        // we check if the callback page was reached
                        if (_url.slice(0, (oauthServerUrl + "/oauth.callback/" + provider).length) === (oauthServerUrl + "/oauth.callback/" + provider)) {

                            var queryString = _url.split('#')[0].split('?')[1];
                            var paramParts = queryString.split('&');
                            var params = {};
                            for (var i = 0; i < paramParts.length; i++) {
                                var part = paramParts[i].split('=');
                                params[part[0]] = part[1];
                            }
                            console.log("params");
                            console.log(params)

                            // we close the window and call this function with the url and the json output
                            _browserOnClose({url: _url, response: params});
                            $cordovaInAppBrowser.close();
                        }
                    }
                );


                $rootScope.$on('$cordovaInAppBrowser:exit', function (event) {
                    deferred.reject("The sign in flow was canceled");
                });
                // function called when the browser is closed
                var _browserOnClose = function (output) {
                    success(output)
                }

            }
            else {
                //default login
                $http.post(oauthUrl + '/login', {user: userData}).success(success).error(error);
            }

            return deferred.promise;
        };

// function to sign a user out
        var oauthlogout = function () {
            var self = this;
            var deferred = $q.defer();

            var success = function (response, status, headers, config) {
                self.resetCookie();
                deferred.resolve(response.payload);
            }

            var error = function (error, status, headers, config) {
                if (error.status === 400) {
                    self.resetCookie();
                }
                deferred.reject(error);
            }

            $http.get(Constants.API.baseUrl + '/logout').success(success).error(error);

            return deferred.promise;
        };

// ping the api/me url to get the currennt logged user
        var oauthping = function () {
            var self = this;
            var deferred = $q.defer();

            var success = function (response, status, headers, config) {
                deferred.resolve(response.payload.user);
            }

            var error = function (error, status, headers, config) {
                // on error then set current user to default value.
                self.resetCookie();
                deferred.reject(error);
            }

            $http.get(Constants.API.baseUrl + '/me').success(success).error(error);

            return deferred.promise;
        };

// function to reset data saved till now
        var oauthresetCookie = function () {
            var self = this;

            $cordovaLocalStorage.removeItem('sessionToken');
            $http.defaults.headers.common['X-Access-Token'] = "";
            self.updateUser({
                profileBg: "",
                avatar: "",
                objectId: "",
                username: "",
                name: "",
                bio: "",
                location: "",
                website: ""
            }, {remove: true})
        };


        var authenticateUser = function (provider,user) {
            var error = function (error) {
                t.hide();
                var errorPopup = p.show({
                    templateUrl: 'templates/modal/error.html',
                    title: 'Error',
                    scope: $scope,
                    buttons: [
                        {text: 'Ok'}
                    ]
                });
                errorPopup.then(function (res) {

                });
                i(function () {
                    errorPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            };

            var success = function (response) {
                console.log(response)
                // if the authentication is successful go to profile view
                t.show({template: "正在创建账户..."})
                $http({
                    method: "post",
                    url: oauthServerUrl + "/oauth.callbackresult/" + provider,
                    params: response.response
                }).then(function (data) {
                    console.log("==============callback begin==========================")
                    console.log(data)
                    console.log(data.data.userLoginId);
                    console.log(data.data.password)
                    console.log("==============callback end==========================")
                    login(data.data.userLoginId, data.data.password).$promise.then(function (data) {
                        console.log(data);
                        if (data && data.token) {
                            // Make a request and receive your auth token from your server
                            if (data.token) {
                                storeUserCredentials(data.token);
                                i(function () {
                                    n.go("main.app.feed.fashion");
                                    t.hide();
                                }, 500)
                            }
                        }
                    }, function (error) {
                        console.log(error)
                        t.hide();
                    })
                }, function (error) {
                    console.log(error)
                });
            };


            if (provider === 'facebook' || provider === 'twitter' || provider === 'instagram' || provider === 'qq' || provider === 'googleplus') {
                t.show({template: "登录中..."})
                // use AuthService to login
                oauthlogin(user, provider).then(success, error);
                //emove after a few seconds
                i(function () {
                    t.hide();
                }, 3000);
            } else if (provider === 'weixin') {
                t.show({template: "登录中..."})
                share(1, 'auth', {});
            }
        };

        return {
            login: login,
            logout: logout,
            isAuthorized: isAuthorized,
            isAuthenticated: function () {
                return isAuthenticated;
            },
            role: function () {
                return role;
            },
            storeUserCredentials: function (token) {
                storeUserCredentials(token)
            },
            oauthlogin: oauthlogin,
            oauthlogout: oauthlogout,
            oauthping: oauthping,
            oauthresetCookie: oauthresetCookie,
            authenticateUser:authenticateUser

        };
    }]);
'use strict';
angular.module('gbcui_shopApp.checkout', [
    'gbcui_shopApp.checkout.directives',
    'gbcui_shopApp.checkout.controllers',
    'gbcui_shopApp.checkout.services'
]);

angular.module("gbcui_shopApp.checkout.controllers", []).controller("CheckoutCtrl", ["$scope", "$state", "$rootScope", "CheckoutService", "shoppingCart", "SERVER_URL",
    "GetCartShipments", "GetStorePaymentOptions","OrderCheckout","$ionicPopup","$ionicHistory","$timeout","$q",
    function (e, n, t, s, shoppingCart, su, GetCartShipments, GetStorePaymentOptions,OrderCheckout,$ionicPopup,$ionicHistory,$timeout,$q) {
        e.shoppingCart = shoppingCart;
        e.serverUrl = su;
        var o = 0.07;
        //配送方式
        GetCartShipments.get(function (response) {
            if (response.responseMessage !== 'fail') {
                var carries = response.resultData.carrierShipmentMethodList;
                console.log('GetCartShipments:', carries);
                e.carries = carries;
            }

        }, function (error) {
        });
        e.paymentNames = [
            {id: 'EXT_CODE', name: '货到付款'}, {id: 'EXT_ALIPAY', name: '支付宝'}, {id: 'EXT_WEIXIN', name: '微信'}
        ]
        //支付方式
        GetStorePaymentOptions.get().$promise.then(function (response) {
            e.payments = response.resultData.productStorePaymentSettingList;
            console.log('GetStorePaymentOptions:', response.resultData);
        }, function (error) {
            $q.reject(error)
        });
        e.cancel = function () {
            var e = _.last(t.previousView);
            if (e.fromState) {
                n.go(e.fromState, e.fromParams)
            } else {
                n.go('main.app.shopping-cart')
            }

        };
        e.order = {};
        s.getUserSelectedAddress().then(function (resp) {
            if (resp.partyAndContactMech) {
                console.log(resp)
                e.getSelectedAddress = resp.partyAndContactMech.paAddress1;
                e.order.shipping_contact_mech_id = resp.partyAndContactMech.contactMechId;
                e.order.shipToCustomerPartyId = resp.partyAndContactMech.partyId
            }
        })
        ;
        e.getSelectedCard = function () {
            return s.getUserSelectedCard().number
        };


        //选择配送方式重新计算
        e.calculateAmount = function (data) {
            console.log(e.shoppingCart);
            //if (data != 0) {
                e.shoppingCart.shoppingCart.displayGrandTotal -= e.shoppingCart.shoppingCart.orderShippingTotal;
                e.shoppingCart.shoppingCart.displayGrandTotal += data;
                e.shoppingCart.shoppingCart.orderShippingTotal = data;
            //}
        };

        e.processOrder = function(data){
            if (!data.shipToCustomerPartyId) {
                $ionicPopup.alert({
                    title: '下订单!',
                    template: '请选择收货人'
                });
                return;
            }
            if (!data.shipping_contact_mech_id) {
                $ionicPopup.alert({
                    title: '下订单!',
                    template: '请选择收货地址'
                });
                return;
            }
            if (!data.shipping_method) {
                $ionicPopup.alert({
                    title: '下订单!',
                    template: '请选择配送方式'
                });
                return;
            }

            if (!data.checkOutPaymentId) {
                $ionicPopup.alert({
                    title: '下订单!',
                    template: '请选择支付方式'
                });
                return;
            }
            console.log(data)
            data.is_gift = 'false';
            data.may_split = 'true';
            OrderCheckout.get(data,function (response) {

                if(response.resultData) {
                    var payment = response.resultData.payment;
                    if (payment === 'cod') {
                        $ionicPopup.alert({
                            title: '下单成功'
                        });
                        $ionicHistory.nextViewOptions({
                            historyRoot: true,
                            disableAnimate: true,
                            expire: 300
                        });
                        // if no transition in 300ms, reset nextViewOptions
                        // the expire should take care of it, but will be cancelled in some
                        // cases. This directive is an exception to the rules of history.js
                        $timeout(function () {
                            $ionicHistory.nextViewOptions({
                                historyRoot: false,
                                disableAnimate: false
                            });
                        }, 300);
                        n.go('main.app.feed.fashion')
                    } else if (payment === 'alipay') {
                        console.log('OrderCheckout:',response.resultData)
                        pingpp.createPayment(response.resultData.charge, function (result, err) {
                            console.log(result)
                            if (result == 'success') {
                                console.log(result);
                                var alertPopup = $ionicPopup.alert({
                                    title: '支付成功',
                                    template: '您已经成功支付!'
                                });
                                alertPopup.then(function (res) {
                                    n.go('main.app.feed.fashion')
                                });

                            } else if (result == 'fail') {
                                var alertPopup = $ionicPopup.alert({
                                    title: '支付失败',
                                    template: '您支付不成功!错误信息:' + err
                                });
                                alertPopup.then(function (res) {
                                    $state.go('app.index')
                                });

                            }
                        });
                        /*window.alipay.pay({
                         tradeNo: tradeNo,
                         subject: "测试标题",
                         body: "我是测试内容",
                         price: 0.02,
                         notifyUrl: "http://your.server.notify.url"
                         }, function(successResults){alert(results)}, function(errorResults){alert(results)});*/

                    }
                }

            }, function (error) {
                console.log(error);
                $q.reject(error)
            })
        };
    }]).controller("CheckoutAddressCtrl", ["$scope", "$state", "$rootScope", "$ionicPopover", "user_shipping_addresses", "$ionicLoading", "$ionicPopup", "CheckoutService"
    , "GetAssociatedStateList", "PersonAddressDel", "PersonAddressUpdate", "PersonAddressAdd", "SetDefaultPersonProfile",
    function (e, n, t, i, s, o, a, l, gs, pad, pau, paa, sdpp) {
        e.user_shipping_addresses = s,
            e.show_new_address_button = !0,
            e.data = {},
            i.fromTemplateUrl("views/checkout/partials/address-chooser-popover.html", {scope: e}).then(function (n) {
                e.addresses_popover = n
            }), e.cancel = function () {
            var e = _.last(t.previousView);
            if (e.fromState) {
                n.go(e.fromState, e.fromParams)
            } else {
                n.go('main.app.checkout')
            }
        };
        gs.get({countryGeoId: 'CHN', listOrderBy: 'geoId'}, function (data) {
            console.log(data)
            if (data.resultData || data.resultData.stateList) {
                e.chnGeoList = data.resultData.stateList
            }
        });
        l.getUserSelectedAddress().then(function (resp) {
            if (resp.partyAndContactMech) {
                console.log(resp)
                e.data.selected_address = resp.partyAndContactMech
            }
        });

        e.openProvincePopover = function (n) {
            e.province_popover.show(n);
        };
        e.selectProvince = function (n) {
            gs.get({countryGeoId: n.id, listOrderBy: 'geoId'}, function (data) {
                console.log(data)
                if (data.resultData || data.resultData.stateList) {
                    e.cityGeoList = data.resultData.stateList;
                    e.city_length = data.resultData.stateList.length;
                }
            });
            e.countyGeoList = '';
            e.province_popover.hide();
        };
        e.openCityPopover = function (n) {
            e.city_popover.show(n);
        };
        e.selectCity = function (n) {
            gs.get({countryGeoId: n.id, listOrderBy: 'geoId'}, function (data) {
                console.log(data)
                if (data.resultData || data.resultData.stateList) {
                    e.countyGeoList = data.resultData.stateList;
                    e.county_length = data.resultData.stateList.length;
                }

            });
            e.city_popover.hide();
        };

        e.openCountyPopover = function (n) {
            e.county_popover.show(n)
        };
        e.selectCounty = function (n) {
            e.county_popover.hide();
        };
        e.selectShippingAddress = function (d) {
            //设置默认收货地址
            sdpp.set({defaultShipAddr: d.contactMechId}, function (resp) {
                console.log('set default ship address success:', resp);
                e.data.selected_address = d;
            }, function (err) {
                console.log('set defalut ship address error', err);
            });
            e.addresses_popover.hide();
            //跳转到check
            //n.go('main.app.checkout');
        }, e.saveSelectedAddress = function (n) {
            e.cancel()
        }, e.openAddressesPopover = function (n) {
            console.log("opening addresses popover"),
                e.addresses_popover.show(n)
        }, e.deleteShippingAddress = function (e) {
        }, e.addShippingAddress = function (e) {
        }, e.editShippingAddress = function (e) {
        };

         //新增收货地址
            e.showNewAddressPopup = function () {
                e.error = '';
                e.address = {};
                i.fromTemplateUrl("views/checkout/partials/city-chooser-popover.html", {scope: e}).then(function (n) {
                    e.city_popover = n;
                });
                i.fromTemplateUrl("views/checkout/partials/province-chooser-popover.html", {scope: e}).then(function (n) {
                    e.province_popover = n;
                });
                i.fromTemplateUrl("views/checkout/partials/county-chooser-popover.html", {scope: e}).then(function (n) {
                    e.county_popover = n;
                });
                var n = a.show({
                    cssClass: "popup-outer new-shipping-address-view",
                    templateUrl: "views/checkout/partials/new-shipping-address-popup.html",
                    title: "新地址",
                    scope: e,
                    buttons: [{text: "关闭"}, {
                        text: "新建", onTap: function (tap) {
                            console.log(e.address)
                            if (e.address && e.address.paAttnName && e.address.paAddress1 &&e.address.paCountyGeoId && e.address.paCity && e.address.paMobilePhone && e.address.paPostalCode && e.address.paStateProvinceGeoId) {
                                var newAddress =
                                {
                                    address1: e.address.paAddress1,
                                    attnName: e.address.paAttnName,
                                    city: e.address.paCity,
                                    countyGeoId: e.address.paCountyGeoId,
                                    mobilePhone: e.address.paMobilePhone,
                                    postalCode: e.address.paPostalCode,
                                    stateProvinceGeoId: e.address.paStateProvinceGeoId,
                                    contactMechId: ''

                                };
                                paa.save(newAddress, function (resp) {
                                    console.log('add address success:', resp);
                                    //更新地址列表
                                    e.user_shipping_addresses.push(e.address);
                                    return 'added'
                                }, function (err) {
                                    console.log('add address err:', err);
                                    return err;
                                })
                            } else {
                                e.error = '请完善地址信息!'
                                tap.preventDefault();
                            }
                        }
                    }]
                });
                n.then(function (e) {
                    e && console.log(e)
                })
            };
        e.showEditAddressPopup = function (n) {
            i.fromTemplateUrl("views/checkout/partials/city-chooser-popover.html", {scope: e}).then(function (n) {
                e.city_popover = n;
            });
            i.fromTemplateUrl("views/checkout/partials/province-chooser-popover.html", {scope: e}).then(function (n) {
                e.province_popover = n;
            });
            i.fromTemplateUrl("views/checkout/partials/county-chooser-popover.html", {scope: e}).then(function (n) {
                e.county_popover = n;
            });

            e.address = n;
            gs.get({countryGeoId: n.paStateProvinceGeoId, listOrderBy: 'geoId'}, function (data) {
                console.log(data)
                if (data.resultData || data.resultData.stateList) {
                    e.cityGeoList = data.resultData.stateList;
                    e.province_length = data.resultData.stateList.length;
                }

            });
            gs.get({countryGeoId: n.paCity, listOrderBy: 'geoId'}, function (data) {
                console.log(data)
                if (data.resultData || data.resultData.stateList) {
                    e.countyGeoList = data.resultData.stateList;
                    e.county_length = data.resultData.stateList.length;
                }

            });
            a.show({
                cssClass: "popup-outer edit-shipping-address-view",
                templateUrl: "views/checkout/partials/edit-shipping-address-popup.html",
                title: n.street,
                scope: e,
                buttons: [{
                    text: "关闭", opTap: function (r) {
                        console.log('close=', e.address);
                        e.province_popover.remove();
                        e.city_popover.remove();
                        e.county_popover.remove();
                        return 'closed'
                    }
                }, {
                    text: "删除", type: "delete-button", onTap: function (r) {
                        console.log('delete=', e.address)
                        e.province_popover.remove();
                        e.city_popover.remove();
                        e.county_popover.remove();

                        //删除地址
                        pad.get({contactMechId: e.address.contactMechId}, function (resp) {
                            console.log('delete address success:', resp);
                            //更新地址列表
                            e.addresses_popover.remove();
                            angular.forEach(e.user_shipping_addresses, function (data, index) {
                                if (data.contactMechId === e.address.contactMechId) {
                                    e.user_shipping_addresses.splice(index, 1);

                                }
                            });
                            if(e.user_shipping_addresses) {
                                e.data.selected_address = e.user_shipping_addresses[0];
                            }
                            i.fromTemplateUrl("views/checkout/partials/address-chooser-popover.html", {scope: e}).then(function (n) {
                                e.addresses_popover = n;
                            });
                            //profile address
                            e.data.selected_address = '';

                        }, function (err) {
                            console.log('delete address success:', err);
                        });


                        e.addresses_popover.remove();
                        return 'deleted'
                    }
                }, {
                    text: "编辑", onTap: function (r) {
                        console.log('edit=', e.address);
                        e.province_popover.remove();
                        e.city_popover.remove();
                        e.county_popover.remove();
                        //编辑地址
                        var editAddress =
                        {
                            address1: e.address.paAddress1,
                            attnName: e.address.paAttnName,
                            city: e.address.paCity,
                            countyGeoId: e.address.paCountyGeoId,
                            mobilePhone: e.address.paMobilePhone,
                            postalCode: e.address.paPostalCode,
                            stateProvinceGeoId: e.address.paStateProvinceGeoId,
                            contactMechId: e.address.contactMechId
                        };
                        console.log('editAddress', editAddress)
                        pau.get(editAddress, function (resp) {
                            console.log('update address success:', resp);
                        }, function (err) {
                            console.log('delete address err:', err);
                        });
                        return 'updated'
                    }
                }]
            }).then(function (popup) {
                console.log(popup)
                popup && console.log(popup)
            })
        }
    }]).controller("CheckoutCardCtrl", ["$scope", "$state", "$rootScope", "$ionicPopover", "user_credit_cards", "$ionicLoading", "$ionicPopup", "CheckoutService", function (e, n, t, i, s, o, a, l) {
    i.fromTemplateUrl("views/checkout/partials/card-chooser-popover.html", {scope: e}).then(function (n) {
        e.cards_popover = n
    }), e.cancel = function () {
        var e = _.last(t.previousView);
        n.go(e.fromState, e.fromParams)
    }, e.user_credit_cards = s, e.data = {}, e.data.selected_card = {}, e.show_new_card_button = !0, e.selectCreditCard = function (n) {
        e.cards_popover.hide()
    }, e.saveSelectedCreditCard = function (n) {
        l.saveUserSelectedCard(n), e.cancel()
    }, e.openCardsPopover = function (n) {
        console.log("opening cards popover"), e.cards_popover.show(n)
    }, e.deleteCreditCard = function (e) {
    }, e.addCreditCard = function (e) {
    }, e.editCreditCard = function (e) {
    }, e.showNewCardPopup = function () {
        var n = a.show({
            cssClass: "popup-outer new-card-view",
            templateUrl: "views/checkout/partials/new-card-popup.html",
            title: "New Card",
            scope: e,
            buttons: [{text: "Close"}, {
                text: "Add", onTap: function (e) {
                }
            }]
        });
        n.then(function (e) {
            e && console.log("hacer algo cuando apreta ADD con los datos llenos")
        })
    }, e.showEditCardPopup = function (n) {
        e.card = n;
        var t = a.show({
            cssClass: "popup-outer edit-card-view",
            templateUrl: "views/checkout/partials/edit-card-popup.html",
            title: "**** " + n.number.slice(-4),
            scope: e,
            buttons: [{text: "Close"}, {
                text: "Delete", type: "delete-button", onTap: function (e) {
                }
            }, {
                text: "Edit", onTap: function (e) {
                }
            }]
        });
        t.then(function (e) {
            e && console.log("hacer algo cuando apreta ADD con los datos llenos")
        })
    }
}]).controller("CheckoutPromoCodeCtrl", ["$scope", function (e) {
}]);

angular.module("gbcui_shopApp.checkout.directives", []);
angular.module("gbcui_shopApp.checkout.services", []).service("CheckoutService", ["$http", "$q", "PersonAddressDefault", "PersonAddressQuery", function (e, n, pad, paq) {
    this.getUserCreditCards = function () {
        var t = n.defer();
        return e.get("logged_user_db.json").success(function (e) {
            t.resolve(e.user.credit_cards)
        }), t.promise
    }, this.getUserShippingAddresses = function () {
        var t = n.defer();
        return paq.get(function (g) {
            if (g && g.resultData) {
                t.resolve(g.resultData.contactMech);
            }
        }, function (err) {
            console.log(err)
            n.reject(err)
        }), t.promise
    }, this.getUserSelectedAddress = function () {
        var defer = n.defer()
        return pad.get(function (pdata) {
                if (pdata && pdata.resultData) {
                    defer.resolve(pdata.resultData);
                }
            }
        ), defer.promise
    }
}]);
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
'use strict';
angular.module('gbcui_shopApp.sort', [
    'gbcui_shopApp.sort.controllers','gbcui_shopApp.fashion.sort.controllers'
]);
angular.module("gbcui_shopApp.sort.controllers", []).controller("SortCtrl", ["$scope", "$ionicPopup", "$state", "$filter", function (e, n, t, i) {
    var s = {}, o = i("cleanStateClass")(t.current.name);
    e.sort_order = "Price", e.openSort = function () {
        s = n.show({
            cssClass: "popup-outer sort-view " + o,
            templateUrl: "views/sort/sort.html",
            scope: angular.extend(e, {sort_order: e.sort_order}),
            title: "Sort by:",
            buttons: [{text: "Close", type: "close-popup"}]
        })
    }
}]);

angular.module("gbcui_shopApp.fashion.sort.controllers", []).controller("FashionSortCtrl", ["$scope", "$ionicPopup", "$state", "$filter","ProductSearch",function (e, n, t, i,ProductSearch) {
    var s = {}, o = i("cleanStateClass")(t.current.name);
    e.sort_order = "",
        e.openSort = function () {
        s = n.show({
            cssClass: "popup-outer sort-view " + o,
            templateUrl: "views/sort/fashionSort.html",
            scope: angular.extend(e, {sort_order: e.sort_order}),
            title: "排序:",
            buttons: [{text: "关闭", type: "close-popup",onTap:function(o){
                    var orderType = this.scope.sort_order;
                e.sort_order = orderType;
                return ProductSearch.query({SEARCH_CATEGORY_ID: '10000',sortOrder:orderType,sortAscending:'N'}, function (data) {
                    console.log(data.resultData.productIds);
                    var products = [];
                    if(data.resultData && data.resultData.productIds) {
                        angular.forEach(data.resultData.productIds, function (productId, index) {
                            angular.forEach(e.products, function (data) {
                                if (data.productId === productId) {
                                    data.id = index;
                                    products.push(data);
                                }
                            })
                        })
                    }
                    e.products = products;
                });
            }}]
        })
    }
}])
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
(function(){
var
  version = "2.0.7",
  hasOwn = {}.hasOwnProperty,
  PingppSDK = function(){},
  cfg = {
    PINGPP_NOTIFY_URL: 'https://api.pingxx.com/notify/charges/',
    UPACP_WAP_URL: 'https://gateway.95516.com/gateway/api/frontTransReq.do',
    ALIPAY_WAP_URL: 'https://mapi.alipay.com/gateway.do',
    UPMP_WAP_URL: 'uppay://uppayservice/?style=token&paydata=',
    JDPAY_WAP_URL: 'https://m.jdpay.com/wepay/web/pay',
    YEEPAY_WAP_URL: 'https://ok.yeepay.com/paymobile/api/pay/request',
    YEEPAY_WAP_TEST_URL: 'http://mobiletest.yeepay.com/paymobile/api/pay/request',
    PINGPP_MOCK_URL: 'http://sissi.pingxx.com/mock.php'
  },
  channels = {
    alipay_wap: 'alipay_wap',
    upmp_wap: 'upmp_wap',
    upacp_wap: 'upacp_wap',
    bfb_wap: 'bfb_wap',
    wx_pub: 'wx_pub',
    yeepay_wap: 'yeepay_wap',
    jdpay_wap: 'jdpay_wap'
  };

PingppSDK.prototype = {

  version: version,

  _resultCallback: undefined,

  _jsApiParameters: {},

  _debug: false,

  _signature: undefined,

  createPayment: function(charge_json, callback, signature, debug) {
    if (typeof callback == "function") {
      this._resultCallback = callback;
    }
    if (typeof signature != "undefined") {
      this._signature = signature;
    }
    if (typeof debug == "boolean") {
      this._debug = debug;
    }
    var charge;
    if(typeof charge_json == "string"){
      try{
        charge = JSON.parse(charge_json);
      }catch(err){
        this._innerCallback("fail", this._error("json_decode_fail"));
        return;
      }
    }else{
      charge = charge_json;
    }
    if(typeof charge == "undefined"){
      this._innerCallback("fail", this._error("json_decode_fail"));
      return;
    }
    if(!hasOwn.call(charge, 'id')){
      this._innerCallback("fail", this._error("invalid_charge", "no_charge_id"));
      return;
    }
    if(!hasOwn.call(charge, 'channel')){
      this._innerCallback("fail", this._error("invalid_charge", "no_channel"));
      return;
    }
    var channel = charge['channel'];
    if(!hasOwn.call(charge, 'credential')){
      this._innerCallback("fail", this._error("invalid_charge", "no_credential"));
      return;
    }
    if (!charge['credential']) {
      this._innerCallback("fail", this._error("invalid_credential", "credential_is_undefined"));
      return;
    }
    if (!hasOwn.call(channels, channel)) {
      this._innerCallback("fail", this._error("invalid_charge", "no_such_channel:" + channel));
      return;
    }
    if (!hasOwn.call(charge['credential'], channel)) {
      this._innerCallback("fail", this._error("invalid_credential", "no_valid_channel_credential"));
      return;
    }
    if(!hasOwn.call(charge, 'livemode')){
      this._innerCallback("fail", this._error("invalid_charge", "no_livemode"));
      return;
    }
    if (charge['livemode'] == false) {
      this._testModeNotify(charge);
      return;
    }
    var credential = charge['credential'][channel];
    if (channel == channels.upmp_wap) {  // 调起银联支付控件，客户端需要安装银联支付控件才能调起
      location.href = cfg.UPMP_WAP_URL + credential['paydata'];
    } else if (channel == channels.upacp_wap) {
      form_submit(cfg.UPACP_WAP_URL, 'post', credential);
    } else if (channel == channels.alipay_wap) {  // 调起支付宝手机网页支付
        console.log('window.alipay:',window.alipay);
      credential['_input_charset'] = 'utf-8';
      if (typeof window.alipay != "undefined") {
        var query = stringify_data(credential, channel, true);
        console.log('alipay pay parameters:',query);
        var self = this;
        window.alipay.h5Pay(query,function(res){
          self._innerCallback("success");
        },function(err){
          self._innerCallback("fail", this._error("alipay_result_fail", err));
        });
      } else {
        form_submit(cfg.ALIPAY_WAP_URL, 'get', credential);
      }
    } else if (channel == channels.bfb_wap) {
      if (!hasOwn.call(credential, 'url')) {
        this._innerCallback("fail", this._error("invalid_credential", "missing_field:url"));
        return;
      }
      location.href = credential['url'] + '?' + stringify_data(credential, channel);
    } else if (channel == channels.yeepay_wap) {
      var fields = ["merchantaccount", "encryptkey", "data"];
      for (var k = 0; k < fields.length; k++) {
        if(!hasOwn.call(credential, fields[k])){
          this._innerCallback("fail", this._error("invalid_credential", "missing_field_"+fields[k]));
          return;
        }
      }
      if (hasOwn.call(credential, "mode") && credential["mode"] == "test") {
        location.href = cfg.YEEPAY_WAP_TEST_URL + '?' + stringify_data(credential, channel, true);
      } else {
        location.href = cfg.YEEPAY_WAP_URL + '?' + stringify_data(credential, channel, true);
      }
    } else if (channel == channels.wx_pub) {
      var fields = ["appId", "timeStamp", "nonceStr", "package", "signType", "paySign"];
      for (var k = 0; k < fields.length; k++) {
        if (!hasOwn.call(credential, fields[k])) {
          this._innerCallback("fail", this._error("invalid_credential", "missing_field_"+fields[k]));
          return;
        }
      }
      this._jsApiParameters = credential;
      this._callpay();
    } else if (channel == channels.jdpay_wap) {
      form_submit(cfg.JDPAY_WAP_URL, 'post', credential);
    }
  },

  _jsApiCall: function(){
    var self = this;
    if(self._jsApiParameters != {}){
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        self._jsApiParameters,
        function(res){
          if(res.err_msg == 'get_brand_wcpay_request:ok'){
            self._innerCallback("success");
          }else if(res.err_msg == 'get_brand_wcpay_request:cancel'){
            self._innerCallback("cancel");
          }else{
            self._innerCallback("fail", self._error("wx_result_fail", res.err_msg));
          }
        }
      );
    }
  },

  _callpay: function(){
    var self = this;
    if (typeof wx != "undefined" && typeof self._signature != "undefined") {
      var wxConfigFailed = false;
      wx.config({
        debug: self._debug,
        appId: self._jsApiParameters["appId"],
        timestamp: self._jsApiParameters["timeStamp"],
        nonceStr: self._jsApiParameters["nonceStr"],
        signature: self._signature,
        jsApiList: ['chooseWXPay']
      });
      wx.ready(function(){
        if (wxConfigFailed) {
          return;
        }
        wx.chooseWXPay({
          timestamp: self._jsApiParameters["timeStamp"],
          nonceStr: self._jsApiParameters["nonceStr"],
          "package": self._jsApiParameters["package"],
          signType: self._jsApiParameters["signType"],
          paySign: self._jsApiParameters["paySign"],
          success: function(res) {
            if (res.errMsg == "chooseWXPay:ok") {
              self._innerCallback("success");
            } else {
              self._innerCallback("fail", self._error("wx_result_fail", res.errMsg));
            }
          },
          cancel: function(res) {
            self._innerCallback("cancel");
          },
          fail: function(res) {
            self._innerCallback("fail", self._error("wx_result_fail", res.errMsg));
          }
        });
      });
      wx.error(function(res){
        wxConfigFailed = true;
        self._innerCallback("fail", self._error("wx_config_error", res.errMsg));
      });
    } else if (typeof WeixinJSBridge == "undefined") {
      function eventCallback(){
        self._jsApiCall();
      }
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', eventCallback, false);
      } else if(document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', eventCallback);
        document.attachEvent('onWeixinJSBridgeReady', eventCallback);
      }
    }else{
      this._jsApiCall();
    }
  },

  _error: function(msg, extra) {
    msg = (typeof msg == "undefined") ? "" : msg;
    extra = (typeof extra == "undefined") ? "" : extra;
    return {
      msg:msg,
      extra:extra
    };
  },

  _innerCallback: function(result, err) {
    if (typeof this._resultCallback == "function") {
      if (typeof err == "undefined") {
        err = this._error();
      }
      this._resultCallback(result, err);
    }
  },

  _testModeNotify: function(charge) {
    var self = this;
    if (charge['channel'] == channels.wx_pub) {
      var dopay = confirm("模拟付款？");
      if (dopay) {
        var request = new XMLHttpRequest();
        request.open('GET', cfg.PINGPP_NOTIFY_URL+charge['id']+'?livemode=false', true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400 && request.responseText == "success"){
            self._innerCallback("success");
          } else {
            var extra = 'http_code:'+request.status+';response:'+request.responseText;
            self._innerCallback("fail", self._error("testmode_notify_fail", extra));
          }
        };
        request.onerror = function() {
          self._innerCallback("fail", self._error("network_err"));
        };
        request.send();
      } else {
        self._innerCallback("cancel");
      }
    } else {
      var params = {
        'ch_id': charge['id'],
        'scheme': 'http',
        'channel': charge['channel']
      };
      if (hasOwn.call(charge, 'order_no')) {
        params['order_no'] = charge['order_no'];
      } else if (hasOwn.call(charge, 'orderNo')) {
        params['order_no'] = charge['orderNo'];
      }
      if (hasOwn.call(charge, 'time_expire')) {
        params['time_expire'] = charge['time_expire'];
      } else if (hasOwn.call(charge, 'timeExpire')) {
        params['time_expire'] = charge['timeExpire'];
      }
      if (hasOwn.call(charge, 'extra')) {
        params['extra'] = encodeURIComponent(JSON.stringify(charge['extra']));
      }
      location.href = cfg.PINGPP_MOCK_URL+'?'+stringify_data(params);
    }
  }
};

function form_submit(url, method, params) {
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", url);

  for (var key in params) {
    if (hasOwn.call(params, key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

function stringify_data(data, channel, urlencode) {
  if (typeof urlencode == "undefined") {
    urlencode = false;
  }
  var output = [];
  for (var i in data) {
    if (channel == "bfb_wap" && i == "url") {
      continue;
    }
    if (channel == "yeepay_wap" && i == "mode") {
      continue;
    }
    output.push(i + '=' + (urlencode ? encodeURIComponent(data[i]) : data[i]));
  }
  return output.join('&');
}

PingppSDK.prototype.payment = PingppSDK.prototype.createPayment;
window.pingpp = new PingppSDK();
// aliases
window.PINGPP_PAY_SDK = window.PINGPP_WX_PUB = window.pingpp;
})();

(function (window, document) {
    window.share = function (scene, id,msg) {
        if (typeof Wechat === "undefined") {
            alert("Wechat plugin is not installed.");
            return false;
        }

        var params = {
            scene: scene
        };
        params.message = {
            title: "",
            description: "",
            mediaTagName: "",
            messageExt: "",
            messageAction: "<action>dotalist</action>",
            media: {}
        };
        angular.extend(params.message,msg);
        if (id == 'send-text') {
            //params.text = "人文的东西并不是体现在你看得到的方面，它更多的体现在你看不到的那些方面，它会影响每一个功能，这才是最本质的。但是，对这点可能很多人没有思考过，以为人文的东西就是我们搞一个很小清新的图片什么的。”综合来看，人文的东西其实是贯穿整个产品的脉络，或者说是它的灵魂所在。";
             console.log("share;",params)
        } else {
            switch (id) {
                case 'check-installed':
                Wechat.isInstalled(function (installed) {
                    alert("Wechat installed: " + (installed ? "Yes" : "No"));
                });
                return true;

                case 'send-photo-local':
                params.message.media.type = Wechat.Type.IMAGE;
                //params.message.media.image = "www/img/res1.jpg";
                break;

                case 'send-photo-remote':
                params.message.media.type = Wechat.Type.IMAGE;
                //params.message.media.image = "https://cordova.apache.org/images/cordova_256.png";
                break;

                case 'send-link-thumb-local':
                //params.message.title = "专访张小龙：产品之上的世界观";
                //params.message.description = "微信的平台化发展方向是否真的会让这个原本简洁的产品变得臃肿？在国际化发展方向上，微信面临的问题真的是文化差异壁垒吗？腾讯高级副总裁、微信产品负责人张小龙给出了自己的回复。";
                //params.message.thumb = "www/img/res2.png";
                params.message.media.type = Wechat.Type.LINK;
                //params.message.media.webpageUrl = "http://tech.qq.com/";
                break;

                case 'send-link-thumb-remote':
                //params.message.title = "专访张小龙：产品之上的世界观";
                //params.message.description = "微信的平台化发展方向是否真的会让这个原本简洁的产品变得臃肿？在国际化发展方向上，微信面临的问题真的是文化差异壁垒吗？腾讯高级副总裁、微信产品负责人张小龙给出了自己的回复。";
                //params.message.thumb = "https://cordova.apache.org/images/cordova_256.png";
                params.message.media.type = Wechat.Type.LINK;
                //params.message.media.webpageUrl = "http://tech.qq.com/";
                break;

                case 'send-music':
                //params.message.title = "一无所有";
                //params.message.description = "崔健";
                //params.message.thumb = "www/img/res3.jpg";
                params.message.media.type = Wechat.Type.MUSIC;
                //params.message.media.musicUrl = "http://y.qq.com/i/song.html#p=7B22736F6E675F4E616D65223A22E4B880E697A0E68980E69C89222C22736F6E675F5761704C69766555524C223A22687474703A2F2F74736D7573696334382E74632E71712E636F6D2F586B30305156342F4141414130414141414E5430577532394D7A59344D7A63774D4C6735586A4C517747335A50676F47443864704151526643473444442F4E653765776B617A733D2F31303130333334372E6D34613F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D30222C22736F6E675F5769666955524C223A22687474703A2F2F73747265616D31342E71716D757369632E71712E636F6D2F33303130333334372E6D7033222C226E657454797065223A2277696669222C22736F6E675F416C62756D223A22E4B880E697A0E68980E69C89222C22736F6E675F4944223A3130333334372C22736F6E675F54797065223A312C22736F6E675F53696E676572223A22E5B494E581A5222C22736F6E675F576170446F776E4C6F616455524C223A22687474703A2F2F74736D757369633132382E74632E71712E636F6D2F586C464E4D313574414141416A41414141477A4C36445039536A457A525467304E7A38774E446E752B6473483833344843756B5041576B6D48316C4A434E626F4D34394E4E7A754450444A647A7A45304F513D3D2F33303130333334372E6D70333F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D3026616D703B73747265616D5F706F733D35227D";
                //params.message.media.musicDataUrl = "http://stream20.qqmusic.qq.com/32464723.mp3";
                break;

                case 'send-video':
                //params.message.title = "乔布斯访谈";
                //params.message.description = "饿着肚皮，傻逼着。";
                //params.message.thumb = "www/img/res7.png";
                params.message.media.type = Wechat.Type.VIDEO;
                //params.message.media.videoUrl = "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html";
                break;

                case 'send-app':
                //params.message.title = "App消息";
                //params.message.description = "这种消息只有App自己才能理解，由App指定打开方式！";
                //params.message.thumb = "www/img/res2.jpg";
                params.message.media.type = Wechat.Type.APP;
                //params.message.media.extInfo = "<xml>extend info</xml>";
                //params.message.media.url = "http://weixin.qq.com";
                break;

                case 'send-nongif':
                //params.message.thumb = "www/img/res5thumb.png";
                params.message.media.type = Wechat.Type.EMOTION;
                //params.message.media.emotion = "www/img/res5.jpg";
                break;

                case 'send-gif':
                //params.message.thumb = "www/img/res6thumb.png";
                //params.message.media.type = Wechat.Type.EMOTION;
                //params.message.media.emotion = "www/img/res6.gif";
                break;

                case 'send-file':
                //params.message.title = "iphone4.pdf";
                //params.message.description = "Pro CoreData";
                //params.message.thumb = "www/img/res2.jpg";
                params.message.media.type = Wechat.Type.FILE;
                //params.message.media.file = "www/resources/iphone4.pdf";
                break;
                case 'auth':
                Wechat.auth("snsapi_userinfo", function (response) {
                    // you may use response.code to get the access token.
                    alert(JSON.stringify(response));
                }, function (reason) {
                    alert("Failed: " + reason);
                });
                return true;

                default:
                alert(id + " can not be recognized!");
                return false;
            }
        }

        Wechat.share(params, function () {
            alert("Success");
        }, function (reason) {
            alert("Failed: " + reason);
        });
        return true;
    };

})(window, document);

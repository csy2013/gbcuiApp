angular.module("underscore", []).factory("_", function () {
    return window._
}), angular.module("gbcui_shopApp",
    ["ionic", 'ngCordova', 'gbcui_shopApp.resource', "gbcui_shopApp.common.controllers",
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
                    return console.log("resolving food"), e.getProducts()
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
                    return console.log("resolving travel"), e.getProducts()
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
                    return console.log("resolving deals"), e.getProducts()
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
    }]).controller("SignupCtrl", ["$scope", "$state", "$ionicLoading", "$timeout", "$ionicModal", "$ionicPopup", "AuthService", "OAUTH_SERVER_URL", "$http", "PersonRegister", function (e, n, t, i, s, pop, AuthService, oauthServerUrl, $http,p) {
        e.doSignUp = function (signup_form, user) {
            t.show({template: "正在创建账户..."});
            console.log(user);
            if (signup_form.$valid) {

                p.get(user, function (data) {
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
    }]).run([ "$rootScope", "$state","AuthService","AUTH_EVENTS", function ($rootScope, $state, AuthService, AUTH_EVENTS) {
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
            if ('data' in next && 'authorizedRoles' in next.data) {
                var authorizedRoles = next.data.authorizedRoles;
                if (!AuthService.isAuthorized(authorizedRoles)) {
                    $state.go("intro.auth-login");
                    //$rootScope.$broadcast(AUTH_EVENTS.unauthorized);
                    event.preventDefault();
                }
            }
            console.log("!AuthService.isAuthenticated:" + !AuthService.isAuthenticated())
            if (!AuthService.isAuthenticated()) {
                if (next.name !== 'login') {
                    event.preventDefault();
                    //$state.go($state.current, {}, {reload: true});
                    $rootScope.$broadcast(AUTH_EVENTS.unauthorized);
                }
            }
        })
    }]);


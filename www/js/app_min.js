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


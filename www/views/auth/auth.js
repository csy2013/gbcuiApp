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
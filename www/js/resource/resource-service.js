angular.module('gbcui_shopApp.resource.services')
    // .constant('SERVER_URL', 'http://gbcui.com')
    // .constant('PRODUCT_SERVER_URL', 'http://gbcui.com/mobile-token/api/product.')
    // .constant('ORDER_SERVER_URL', 'http://gbcui.com/mobile-token/api/order.')
    // .constant('ACCOUNT_SERVER_URL', 'http://gbcui.com/mobile-token/api/account.')
    // .constant('COMMON_SERVER_URL', 'http://gbcui.com/mobile-token/api/common.')
    // .constant('CONTENT_SERVER_URL', 'http://gbcui.com/mobile-token/api/content.')
    // .constant('HUMANRES_SERVER_URL', 'http://gbcui.com/mobile-token/api/humanres.')
    // .constant('MARKET_SERVER_URL', 'http://gbcui.com/mobile-token/api/market.')
    // .constant('PARTY_SERVER_URL', 'http://gbcui.com/mobile-token/api/party.')
    // .constant('AUTH_SERVER_URL', 'http://gbcui.com/mobile-token/auth')
    // .constant('OAUTH_BASE_URL','http://gbcui.com/mobile-token/api')
    // .constant('OAUTH_SERVER_URL','http://gbcui.com/mobile-token/api')

.constant('SERVER_URL', 'http://localhost:8080')
.constant('PRODUCT_SERVER_URL', 'http://localhost:8080/mobile-token/api/product.')
.constant('ORDER_SERVER_URL', 'http://localhost:8080/mobile-token/api/order.')
.constant('ACCOUNT_SERVER_URL', 'http://localhost:8080/mobile-token/api/account.')
.constant('COMMON_SERVER_URL', 'http://localhost:8080/mobile-token/api/common.')
.constant('CONTENT_SERVER_URL', 'http://localhost:8080/mobile-token/api/content.')
.constant('HUMANRES_SERVER_URL', 'http://localhost:8080/mobile-token/api/humanres.')
.constant('MARKET_SERVER_URL', 'http://localhost:8080/mobile-token/api/market.')
.constant('PARTY_SERVER_URL', 'http://localhost:8080/mobile-token/api/party.')
.constant('AUTH_SERVER_URL', 'http://localhost:8080/mobile-token/auth')
.constant('OAUTH_BASE_URL','http://localhost:8080/mobile-token/api')
.constant('OAUTH_SERVER_URL','http://localhost:8080/mobile-token/api')


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








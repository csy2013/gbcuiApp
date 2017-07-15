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
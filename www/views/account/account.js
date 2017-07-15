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
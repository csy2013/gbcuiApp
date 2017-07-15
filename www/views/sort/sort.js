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
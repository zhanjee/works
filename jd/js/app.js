/**
 * Created by hxsd on 2017/3/3.
 */
// 创建主模块，并添加对路由模块的依赖
var myapp = angular.module("myapp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
        // 处理默认首页
            .when("/", {templateUrl: "pages/productList.html", controller: "productsCtrl"})
            .when("/productList", {templateUrl: "pages/productList.html", controller: "productsCtrl"})
            .when("/detail", {templateUrl: "pages/detail.html", controller: "detailCtrl"})
            .when("/detail?:name", {templateUrl: "pages/detail.html", controller: "detailCtrl"})
            .when("/shopCart", {templateUrl: "pages/shopCart.html", controller: "cartCtrl"})
            // 如果请求的路由不存在
            .otherwise({templateUrl: "pages/productList.html", controller: "productsCtrl"});
    })
    // 创建一个代表购物车的service
    .factory("cartService", function () {
        // 容器：相当于购物车的购物筐
        var cart = [];

        return {
            // 添加商品到购物车:商品对象{name:"方便面",price:8.00}
            // 需要判断购物车的数组中，之前是否已经加入过该商品
            // 如果之前已经加入过，则只需要修改购买数量
            add: function (product) {
                // 遍历数组，判断数组中是否有product
                // item:{product:product,number:3}
                for (var i = 0; i < cart.length; i++) {
                    var item = cart[i];
                    if (product.name == item.product.name) {
                        // 说明之前添加过，这里只修改购买数量
                        item.number++;
                        return;
                    }
                }

                // 如果能执行到这里，说明在购物车中没有找到该商品-新商品
                cart.push({product: product, number: 1});
            },
            // 从购物车中删除商品的方法
            remove: function (name) {
                // 遍历数组，判断数组中是否有product
                // item:{product:product,number:3}
                for (var i = 0; i < cart.length; i++) {
                    var item = cart[i];
                    if (name == item.product.name) {
                        // 说明找到了要删除的商品，从数组中删除它
                        cart.splice(i, 1);
                        return;
                    }
                }
            },
            // 查询购物车中所有商品的方法
            findAll: function () {
                return cart;
            },
            // 清空购物车
            clear: function () {
                cart.length = 0;
            }
        };
    })
    // step2: 向主模块注册一个控制器
    // 依赖注入: $http service，以及购物车service
    // 商品列表显示子页面的控制器
    .controller("productsCtrl", function ($scope, $http, cartService) {
        var url = "products.json";
        $http.get(url).success(function (data) {
            $scope.products = data;
        });

        // 购买商品按钮事件
        $scope.add = function (product) {
            // 将商品对象加入到购物车中
            cartService.add(product);
        };
    })
    // 商品详情子页面的控制器
    .controller("detailCtrl", function ($scope,$routeParams,cartService) {
        var name = $routeParams["name"] || "劳力士";
        var productList = {
            劳力士:{"name":"劳力士","price":199900,"quantity":2,"date":"2016-05-03","imgsrc":"5764e72dN66dd41a8.jpg"},
            浪琴:{"name":"浪琴","price":399900,"quantity":1,"date":"2016-05-03","imgsrc":"5764e72dN66dd41a8.jpg"},
            卡西欧:{"name":"卡西欧","price":499900,"quantity":1,"date":"2016-05-03","imgsrc":"5763c0aeN6021c46d.jpg"},
            天梭:{"name":"天梭","price":99900,"quantity":3,"date":"2016-05-03","imgsrc":"5764e72dN66dd41a8.jpg"},
            欧米茄:{"name":"欧米茄","price":299900,"quantity":2,"date":"2016-05-03","imgsrc":"581c3818N8e338d4d.jpg"}
        };

        // 根据传递的参数(商品名称)获取对应的商品信息
        $scope.product = productList[name];

        // 购买商品按钮事件
        $scope.add = function () {
            // 将商品对象加入到购物车中
            cartService.add($scope.product);
        };
    })
    // 依赖注入单例的购物车对象
    // 购物车子页面的控制器
    .controller("cartCtrl", function ($scope, cartService) {
        // 拿到购物筐中的所有商品
        $scope.cart = cartService.findAll();

        // 删除购物车中商品的方法
        $scope.remove = function (name) {
            cartService.remove(name);
        };

        // 统计购买总数量
        $scope.count = function () {
            var total = 0;
            angular.forEach($scope.cart, function (item,index) {
                total += item.number;
            });
            return total;
        };

        // 计算购买总金额
        $scope.money = function () {
            var total = 0;
            angular.forEach($scope.cart, function (item,index) {
                total += item.number * item.product.price;
            });
            return total;
        };
    });
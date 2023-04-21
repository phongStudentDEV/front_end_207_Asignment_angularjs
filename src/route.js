var app = angular.module("myModule", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/trangchu", {
      templateUrl: "./pages/trangchu.html",
      controller: assignmentController,
    })
    .when("/gioithieu", {
      templateUrl: "./pages/gioithieu.html",
    })
    .when("/sanpham", {
      templateUrl: "./pages/sanpham.html",
      controller: assignmentController,
    })
    .when("/sanpham-applewatch", {
      templateUrl: "./pages/sanpham-applewatch.html",
      controller: assignmentController,
    })
    .when("/sukien", {
      templateUrl: "./pages/sukien.html",
    })
    .when("/dangnhap", {
      templateUrl: "./pages/dangnhap.html",
      controller: assignmentController,
    })
    .when("/dangky", {
      templateUrl: "./pages/dangky.html",
      controller: assignmentController,
    })
    .when("/trangcuatoi", {
      templateUrl: "./pages/trangcuatoi.html",
      controller: assignmentController,
    })
    .when("/quenmatkhau", {
      templateUrl: "./pages/quenmatkhau.html",
    })
    .when("/quanlysanpham", {
      templateUrl: "./pages/quanlysanpham.html",
      controller: assignmentController,
    })
    .when("/quanlytheloai", {
      templateUrl: "./pages/quanlytheloai.html",
      controller: assignmentController,
    })
    .when("/dangxuat", {
      templateUrl: "./pages/dangxuat.html",
      controller: assignmentController,
    })
    .when("/gioHang", {
      templateUrl: "./pages/giohang.html",
      controller: assignmentController,
    })
    .when("/iphon12", {
      templateUrl: "./pages/iphone12.html",
      controller: assignmentController,
    })
    .when("/iphon13", {
      templateUrl: "./pages/iphone13.html",
      controller: assignmentController,
    })
    .when("/iphon14", {
      templateUrl: "./pages/iphone14.html",
      controller: assignmentController,
    })
    .otherwise({
      redirectTo: "/trangchu",
    });
});

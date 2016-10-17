var app = angular.module("TraderApp", ["ngRoute", "ngMaterial", "TraderApp.Auth"]);

// Routing Config
app.config(function ($routeProvider) {
    $routeProvider
        .otherwise("/", {
            templateUrl: "./templates/home.html",
            controller: "HomeCtrl"
        })
        .when("/", {
            templateUrl: "./templates/home.html",
            controller: "HomeCtrl"
        })
        .when("/profile", {
            templateUrl: "./templates/profile.html",
            controller: "ProfileCtrl"
        })
        .when("/login", {
            templateUrl: "./templates/login.html",
            controller: "LoginCtrl"
        })
//        .when("/logout", {
//            templateUrl: "./templates/logout.html",
//            controller: "LogoutCtrl"
//        })
        .when("/signup", {
            templateUrl: "./templates/signup.html",
            controller: "SignupCtrl"
        });
});

// Angular Material color config
app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('blue');
});

app.controller("MainController", ["$scope", "$mdSidenav", function ($scope, $mdSidenav) {
    $scope.toggleNav = function () {
        $mdSidenav('leftNav').toggle();
    };
}]);
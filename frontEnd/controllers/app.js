var app = angular.module("TraderApp", ["ngRoute", "ngMaterial"]);

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
        .when("/signin", {
            templateUrl: "./templates/signin.html",
            controller: "SignInCtrl"
        })
        .when("/signout", {
            templateUrl: "./templates/signout.html",
            controller: "SignOutCtrl"
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
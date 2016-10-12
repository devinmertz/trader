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
        $mdSidenav('rightNav').toggle();
    };
}]);
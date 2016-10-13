var app = angular.module("TraderApp.Auth", ['ngRoute']); //change

app.service("TokenService", function () {
    var userToken = 'token';
    this.saveToken = function (token) {
        localStorage[userToken] = token;
    };
    this.getToken = function (token) {
        return localStorage[userToken];
    };
    this.removeToken = function () {
        localStorage.removeItem(userToken);
    };
});

app.service("UserService", function ($http, $location, TokenService) {
    this.loggedInUser = {};

    this.signup = function (userObj) {
        return $http.post('/auth/signup', userObj).then(function (response) {
            if (response.data._id && response.data.username === userObj.username) {
                console.log("Successfully signed up!");
            }
        });
    };
    this.login = function (userObj) {
        return $http.post('/auth/login', userObj).then(function (response) {
            if (response.data.token) {
                this.loggedInUser = response.data.user;
                TokenService.saveToken(response.data.token);
                $location.path('/profile'); //change
            } else {
                alert("Log in failed.");
            }
        });
    };
    this.logout = function () {
        TokenService.removeToken();
        this.loggedInUser = {};
    };
});

app.factory("AuthInterceptor", function ($location, $q, TokenService) {
    return {
        request: function (config) {
            var token = TokenService.getToken();
            if (token) {
                config.headers = config.headers || {};
                config.headers.authorization = "Bearer " + token;
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {
                TokenService.removeToken();
                $location.path("/login");
            }
            $q.reject(response);
        }
    };
});

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
}]);
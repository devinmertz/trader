angular.module("TraderApp")
    .service("ProfileService", ["$http", "UserService", function ($http, UserService) {
        this.loggedInUser = UserService.loggedInUser;
        var _this = this;
        var baseUrl = "http://localhost:8080/";

        // PUT an item update for a user
        this.putItem = function (index, itemObj) {
            return $http.put(baseUrl + "/api/user", itemObj).then(function (response) {
                _this.loggedInUser.tradeItems.splice(index, 1, response.data);
                return response.data;
            });
        };

    }]);
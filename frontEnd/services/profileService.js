angular.module("TraderApp")
    .service("ProfileService", ["$http", "UserService", function ($http, UserService) {
        this.loggedInUser = UserService.loggedInUser;
        var _this = this;
        var baseUrl = "http://localhost:8080";

        // POST a new trade item for the logged in user
        this.postItem = function (itemObj) {
            return $http.post(baseUrl + "/api/user/items", itemObj).then(function (response) {
				_this.loggedInUser = UserService.loggedInUser;
				
                _this.loggedInUser.tradeItems.push(response.data);
                return response.data;
            });
        };

        // POST an item update for a user
        this.postItemOffer = function (itemObj, offer) {
			
            return $http.post(baseUrl + "/api/item/message/" + itemObj._id, offer).then(function (response) {
                //UserService.loggedInUser.tradeItems.splice(index, 1, response.data);
                return response.data;
            });
        };
		
		// PUT an item update
		this.putItem = function(itemObj){
			return $http.put(baseUrl + "/api/item/" + itemObj._id, itemObj).then(function(response){
				return response.data;
			});
		}

        // DELETE an item post for a user
        this.deleteItem = function (index) {
			console.log(index);
			console.log(this.loggedInUser);
			console.log(UserService.loggedInUser.tradeItems);
            var itemId = UserService.loggedInUser.tradeItems[index]._id;
            return $http.delete(baseUrl + "/api/user/items/" + itemId).then(function (response) {
                UserService.loggedInUser.tradeItems.splice(index, 1);
                return response.data;
            });
        };
 
    }]); 
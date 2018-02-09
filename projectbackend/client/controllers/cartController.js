angular.module('app', ['ngAnimate', 'ui.bootstrap']);

myApp.controller('CartController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log("Load controller cart...");

	$scope.getCarts = function(){
		var cartProductItems = [];
		$http.get('/api/carts').success(function(response){			
			for (var i = 0; i < response.length; i++) {
				var carts = {};			
				carts.contact = {};
				carts.cart = [];
				carts.userId = response[i].userId;
				carts._id = response[i]._id;
				carts.user = [];
				function GetUserById(){
					var userDetail = {};
					$http.get('/api/register/'+ response[i].userId).success(function(response){
						userDetail.name = response;
					});
					carts.user.push(userDetail);
				};
				GetUserById();
				carts.status = response[i].status;
				carts.contact.address = response[i].contact.address;
				carts.contact.phone = response[i].contact.phone;
				carts.create_date = response[i].create_date;
				for (var j = 0; j < response[i].cart.length; j++) {
					function GetBookById(){
						var detailsCart = {};
						detailsCart.quanlity = response[i].cart[j].quanlity;
						$http.get('/api/books/'+ response[i].cart[j].productId).success(function(response){
							detailsCart.product = response;
						});				
						carts.cart.push(detailsCart);
					}
					GetBookById();					
				};
				cartProductItems.push(carts);
			};
			
		});
		console.log(cartProductItems);
		$scope.cartProductItems = cartProductItems;
	};

	$scope.updateCart = function(id, status){
		var statusCart = {};
		statusCart.send = status;
		$http.put('/api/carts/'+id, statusCart).success(function(response){
			console.log(response);
			$scope.getCarts();
		});
	};


	$scope.removeCart = function(id){
		bootbox.confirm({
	    message: "Chắc chắn xóa dữ liệu này?",
	    buttons: {
	        confirm: {
	            label: 'Yes',
	            className: 'btn-success'
	        },
	        cancel: {
	            label: 'No',
	            className: 'btn-danger'
	        }
	    },
	    callback: function (result) {
	        if (result) {
		        $http.delete('/api/carts/'+id).success(function(response){
					window.location.reload();
				});
	        }
	    }
		});
	};

}]);








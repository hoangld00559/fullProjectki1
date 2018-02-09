angular.module('app', ['ngAnimate', 'ui.bootstrap']);

myApp.controller('CartController', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope){
	console.log("Load controller cart...");
	$rootScope.loadCart = function(){
		var customerCart = JSON.parse(localStorage.getItem("addCart"));
		if (customerCart !== null) {
			backCart = [];			
			for (var i = 0; i < customerCart.length; i++) {
				function functionName(){
					var backCartItem = new Object();
					backCartItem.quanlity = customerCart[i].quanlity;
					$http.get('/api/books/'+ customerCart[i].data).success(function(res){				
						backCartItem.databack = res; 			
					});				
					backCart.push(backCartItem);	
				}
				functionName();
			}
			console.log(backCart);			
			$scope.backCart = backCart;
		}
	};
	
	$scope.addCart = function(a){
		var customerCart = JSON.parse(localStorage.getItem("addCart"));
		var userId = localStorage.getItem("userId");
		var cart = {};
		cart.userId = userId;
		cart.cart = {};
		cart.cart.productId = customerCart[a].data;
		cart.cart.quanlity = customerCart[a].quanlity;
		cart.contact = {};
		cart.contact.phone = $scope.phone;
		cart.contact.address = $scope.address;	
		console.log(cart);	
		$http.post('/api/carts/', cart).success(function(response){
			console.log(response);
			var dialog = bootbox.dialog({
			    title: 'Đang gửi thông tin đơn hàng',
			    message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
			});
			dialog.init(function(){
			    setTimeout(function(){
			        dialog.find('.bootbox-body').html('Đã gửi xong thông tin, chúng tôi sẽ liên lạc với bạn, hãy giữ liên lạc nhé!');
			    }, 3000);
			});
		});
		
		setTimeout(function(){
			$scope.deleteCart(a);
			window.location.reload();
			window.location.href= "/#/carts/details";
		}, 4000);
	};

	$scope.addAllCart = function(){
		var customerCart = JSON.parse(localStorage.getItem("addCart"));
		var userId = localStorage.getItem("userId");
		var cart = {};
		cart.userId = userId;
		cart.cart = [];
		cart.contact = {};
		cart.contact.phone = $scope.phone;
		cart.contact.address = $scope.address;
		for (var i = 0; i < customerCart.length; i++) {
			cartItem = new Object;
			cartItem.productId = customerCart[i].data;
			cartItem.quanlity = customerCart[i].quanlity;
			cart.cart.push(cartItem);
		}
		console.log(cart);
		if (customerCart === null || customerCart.length == 0) {
			bootbox.alert("Chưa có sản phẩm nào, mua ngay!", function(){ 
				window.location.href = "#/products";
			});
		} else {
			$http.post('/api/carts/', cart).success(function(response){
			console.log(response);
			});
			var dialog = bootbox.dialog({
			    title: 'Đang gửi thông tin đơn hàng',
			    message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
			});
			dialog.init(function(){
			    setTimeout(function(){
			        dialog.find('.bootbox-body').html('Đã gửi xong thông tin, chúng tôi sẽ liên lạc với bạn, hãy giữ liên lạc nhé!');
			    }, 3000);
			});

			localStorage.removeItem("addCart");
			setTimeout(function(){
				window.location.reload();
				window.location.href= "/#/carts/details";
			}, 4000);
			$rootScope.loadCart();
		}		
	};

	$rootScope.deleteCart = function(a){
		var customerCart = JSON.parse(localStorage.getItem("addCart"));
		customerCart.splice(a, 1);
		localStorage.removeItem("addCart");
		localStorage.setItem("addCart", JSON.stringify(customerCart));
		$rootScope.loadCart();
	};

	$scope.getCarts = function(){
		var userId = localStorage.getItem("userId");
		$scope.search = userId;
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


	$scope.removeCart = function(id){
		$http.delete('/api/carts/'+id).success(function(response){
			window.location.reload();
		});
	};

	$scope.updateCart = function(id, status){
		var statusCart = {};
		statusCart.send = status;
		$http.put('/api/carts/'+id, statusCart).success(function(response){
			console.log(response);
			$scope.getCarts();
		});
	};
	
	$scope.viewCartButton = function(){
		var userId = localStorage.getItem("userId");
		if (userId !== null) {
			$rootScope.loadCart();
			angular.element(PPsbmincart).show();
		}else {
			bootbox.confirm("Bạn cần đăng nhập để mua hàng!", function(result){ 
				if(result){
					window.location.href='#/logins';
				} 
			});			
		}
	};

	$scope.sbmincartcloser = function(){
		angular.element(PPsbmincart).hide();
	}

}]);


myApp.controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      
    },
    {
      title: 'Dynamic Group Header - 2',
      
    },
    {
      title: 'Dynamic Group Header - 3',
      
    }
  ];
  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
});


myApp.controller('RatingDemoCtrl', function ($scope) {
  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
});
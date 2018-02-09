angular.module('app', ['ngAnimate']);

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', '$rootScope', function($scope, $http, $location, $routeParams, $rootScope){
	console.log('BooksController loaded...');


	$scope.getBooks = function(){	
		$http.get('api/books').success(function(response){
			$scope.books = response;		
		});
		$scope.pageSize = 12;
		$scope.currentPage =1
	};

	$scope.getBook = function(){
		var id = $routeParams.id;
		$http.get('/api/books/'+id).success(function(response){
			$scope.book = response;
		});
	};

	$scope.addBook = function(){
		console.log($scope.book);
		$http.post('/api/books/', $scope.book).success(function(response){
			window.location.href='#/books';
		});
	};

	$scope.updateBook = function(){
		var id = $routeParams.id;
		$http.put('/api/books/'+id, $scope.book).success(function(response){
			window.location.href='#/books';
		});
	};

	$scope.removeBook = function(id){
		$http.delete('/api/books/'+id).success(function(response){
			window.location.href='#/books';
		});
	};	

	$scope.contactSubmit = function(){
		var dialog = bootbox.dialog({
		    title: 'Cảm ơn bạn đã gửi yêu cầu!',
		    message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
		});
		dialog.init(function(){
		    setTimeout(function(){
		        dialog.find('.bootbox-body').html('Đã gửi thông tin thành công!');
		        window.location.reload();
		    }, 3000);
		});
	}

	$scope.cartclick = function(data){
		var userId = window.localStorage.getItem("userId");
		var Cartdata = JSON.parse(window.localStorage.getItem("addCart"));
		console.log(Cartdata);
		if(userId !== null) {
			var dataCart = [];			
			if(Cartdata !== null) {				
				for (var i = 0; i < Cartdata.length; i++) {	
					var objectCart = new Object();
					if(Cartdata[i].data === data){						
						objectCart.data = Cartdata[i].data;
						objectCart.quanlity = Cartdata[i].quanlity + 1;
						dataCart.push(objectCart);
					} else {						
						objectCart.data = Cartdata[i].data;
						objectCart.quanlity = Cartdata[i].quanlity;
						dataCart.push(objectCart); 
					}
				}
				var objectCart = new Object();
				objectCart.data = data;
				objectCart.quanlity = 1;
				dataCart.push(objectCart);
				for (var i = 0; i < Cartdata.length; i++) {
					if(Cartdata[i].data === data){
						dataCart.pop();						
					}
				}				
				console.log(dataCart);
				window.localStorage.removeItem("addCart");			
				window.localStorage.setItem("addCart", JSON.stringify(dataCart));
				$rootScope.loadCart();
				angular.element(PPsbmincart).show();		
			} else {
				objectCart = new Object();
				objectCart.data = data;
				objectCart.quanlity = 1;
				dataCart.push(objectCart);
				window.localStorage.setItem("addCart", JSON.stringify(dataCart));
				$rootScope.loadCart();
				angular.element(PPsbmincart).show();
			}			
			
		}else {
			bootbox.confirm("Bạn cần đăng nhập để mua hàng!", function(result){ 
				if(result){
					window.location.href='#/logins';
				} 
			});
		}		
	};
}]);




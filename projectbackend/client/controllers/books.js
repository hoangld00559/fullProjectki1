angular.module('app', ['ngAnimate']);

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams, $rootScope){
	console.log('BooksController loaded...');



	$scope.getBooks = function(){	
		$http.get('api/books').success(function(response){
			$scope.books = response;		
		});
		$scope.pageSize = 12;
		$scope.currentPage =1
	}

	$scope.getBook = function(){
		var id = $routeParams.id;
		$http.get('/api/books/'+id).success(function(response){
			$scope.book = response;
		});
	}

	$scope.addBook = function(){
		console.log($scope.book);
		$http.post('/api/books/', $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}

	$scope.updateBook = function(){
		var id = $routeParams.id;
		$http.put('/api/books/'+id, $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}

	$scope.removeBook = function(id){
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
			        $http.delete('/api/books/'+id).success(function(response){
					window.location.reload();
				});
	        }
	    }
		});		
	}	

}]);




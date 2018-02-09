var myApp = angular.module('myApp');

myApp.controller('AuthorsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('AuthorsController loaded...');
	$scope.getAuthors = function(){
		$http.get('/api/brands').success(function(response){
			$scope.authors = response;
		});
	}
	$scope.getAuthor = function(){
		var id = $routeParams.id;
		$http.get('/api/brands/'+id).success(function(response){
			$scope.author = response;
		});
	}

	$scope.addAuthor = function(){
		console.log($scope.author);
		$http.post('/api/brands/', $scope.author).success(function(response){
			window.location.href='#/brands';
		});
	}

	$scope.updateAuthor = function(){
		var id = $routeParams.id;
		$http.put('/api/brands/'+id, $scope.author).success(function(response){
			window.location.href='#/brands';
		});
	}

	$scope.removeAuthor = function(id){
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
			        $http.delete('/api/brands/'+id).success(function(response){
						window.location.reload();
					});
	        	}
	    	}
		});
	}

}]);



var myApp = angular.module('myApp');

myApp.controller('AuthorsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('AuthorsController loaded...');
	$scope.getAuthors = function(){
		setTimeout(function(){
	        $http.get('/api/brands').success(function(response){
				$scope.authors = response;
			});
	    }, 0);
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
		$http.delete('/api/brands/'+id).success(function(response){
			window.location.href='#/brands';
		});
	}

}]);



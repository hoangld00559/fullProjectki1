var myApp = angular.module('myApp');


myApp.controller('UserController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('UserController loaded...');
	$scope.getUsers = function(){
		$http.get('/api/registers').success(function(response){
			$scope.users = response;
			console.log(response);
		});
	}
	$scope.removeUser = function(userId){
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
			        $http.delete('/api/registers/'+userId).success(function(response){
						window.location.reload();
					});
	        	}
	    	}
		});
	}
}]);





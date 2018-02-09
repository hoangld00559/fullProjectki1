myApp.controller('registerController', function($scope, $location, $http){
	var cc = this;
	cc.user = {};
	$scope.createUser = function(){
		console.log($scope.user);
		$http({'method': 'POST','url':'/api/registers/','data':$scope.user}).success(function(res){
			console.log(res);

			bootbox.confirm({
			    message: "Đăng kí thành công, hãy đăng nhập !",
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
			        if (result === true) {
			        	window.location.href='#/logins';
			        }else {
			        	window.location.href='#/';
			        }
			    }
			})
			
		}).error(function(err){
			bootbox.alert({
    			message: "This is an alert with an additional class!",
    			className: 'bb-alternate-modal'
			});
		});		
	}

	$scope.resetForm = function (formModel) {
        angular.copy({}, formModel);
    }
});


myApp.controller('authenticationController', function ($scope, $rootScope, $http) {
    var userId = localStorage.getItem("userId");
    var usernameId = localStorage.getItem("usernameId");

    if (userId !== null) {
        $rootScope.isLoggedIn = true;
        $rootScope.loggedInUsername = usernameId;
    }
    else {
        $scope.isLoggedIn = false;
    }


    $scope.handleLogout = function () {
    	bootbox.confirm("Bạn có chắc muốn thoát khỏi hệ thống?", function(result){
    		if (result === true) {
    			localStorage.removeItem("usernameId");
	            localStorage.removeItem("userId");
	            localStorage.removeItem("addCart");
	            $scope.isLoggedIn = false;
	            window.location.reload();
    		}
    		
    	});
     };
  	
  	
});


myApp.controller('loginController', function($scope, $rootScope, $http){
	$scope.handleLogin = function(){
		$http({
	        method : "POST",
	        url : '/api/logins/',
	        data: $scope.user
	    }).then(function mySuccess(res) {
	    	if(res.status === 200){
	    			alert("Đăng nhập thành công.");					
					window.localStorage.setItem("userId", res.data._id);
					window.localStorage.setItem("usernameId", res.data.username);					
					window.location.href='#/books';
					console.log(res);
					window.location.reload();
				} else {
					console.log(res);
				};            
        }, function myError(res) {
	        console.log(res);
	        alert(res.data);
	        window.location.reload();
	    });
	};
});



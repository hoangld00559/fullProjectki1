var myApp = angular.module('myApp');

myApp.controller('navController', ['$scope', '$location', '$http', function($scope, $location, $rootScope, $http, $routeParams){
	console.log('navController loaded...');
  	$scope.isActive = function(destination){
    return destination === $location.path();
  	};
}]);


myApp.controller('CarouselDemoCtrl', function ($scope) {
	  $scope.myInterval = 4000;
	  $scope.noWrapSlides = false;
	  $scope.active = 0;
	  var slides = $scope.slides = [];
	  var currIndex = 0;

	  $scope.addSlide = function() {
	    var newWidth = 600 + slides.length + 1;
	    slides.push({
	      image: '//unsplash.it/' + newWidth + '/300',
	      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
	      id: currIndex++
	    });
	  };
	  for (var i = 0; i < 4; i++) {
	    $scope.addSlide();
	  }
});


myApp.controller('newsletterController', function ($scope){
	$scope.contactIndex = function(){
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
});



myApp.controller('searhController', function($scope, $rootScope, $location){
	$scope.searchNavbar = function(){
		window.location.href = "#/products";
		$rootScope.order = "title";
		$rootScope.search = $scope.searchText;
	}
});




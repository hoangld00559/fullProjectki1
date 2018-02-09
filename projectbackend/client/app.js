var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'BooksController',
		templateUrl: 'views/books.html'
	})	
	.when('/books/add',{
		controller:'BooksController',
		templateUrl: 'views/add_book.html'
	})
	.when('/books', {
		controller:'BooksController',
		templateUrl: 'views/books.html'
	})
	.when('/books/edit/:id',{
		controller:'BooksController',
		templateUrl: 'views/edit_book.html'
	})
	.when('/brands/add', {
		controller: 'AuthorsController',
		templateUrl: 'views/add_author.html'
	})
	.when('/brands', {
		controller: 'AuthorsController',
		templateUrl: 'views/brand.html'
	})
	.when('/brands/edit/:id', {
		controller: 'AuthorsController',
		templateUrl: 'views/edit_author.html'
	})
	.when('/carts/details', {
		controller: 'CartController',
		templateUrl: 'views/cart_detail.html'
	})
	.when('/users', {
		controller: 'UserController',
		templateUrl: 'views/user_detail.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});
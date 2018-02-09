var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'BooksController',
		templateUrl: 'views/books.html'
	})
	.when('/books', {
		controller:'BooksController',
		templateUrl: 'views/books.html'
	})
	.when('/books/details/:id',{
		controller:'BooksController',
		templateUrl: 'views/book_details.html'
	})
	.when('/books/add',{
		controller:'BooksController',
		templateUrl: 'views/add_book.html'
	})
	.when('/books/edit/:id',{
		controller:'BooksController',
		templateUrl: 'views/edit_book.html'
	})
	.when('/products', {
		controller:'BooksController',
		templateUrl: 'views/product.html'
	})
	.when('/products/:id', {
		controller: 'BooksController',
		templateUrl: 'views/genre.html'
	})
	.when('/registers', {
		controller:'registerController',
		templateUrl: 'views/register.html'
	})
	.when('/logins', {
		controller:'loginController',
		templateUrl: 'views/login.html'
	})
	.when('/abouts', {
		controller: 'BooksController',
		templateUrl: 'views/about.html'
	})
	.when('/contacts', {
		controller: 'BooksController',
		templateUrl: 'views/contact.html'
	})
	.when('/brands/add', {
		controller: 'AuthorsController',
		templateUrl: 'views/add_author.html'
	})
	.when('/brands', {
		controller: 'AuthorsController',
		templateUrl: 'views/brand.html'
	})
	.when('/brands/details/:id', {
		controller: 'AuthorsController',
		templateUrl: 'views/author_details.html'
	})
	.when('/brands/edit/:id', {
		controller: 'AuthorsController',
		templateUrl: 'views/edit_author.html'
	})
	.when('/carts', {
		controller: 'CartController',
		templateUrl: 'views/cart.html'
	})
	.when('/faqs', {
		controller: 'BooksController',
		templateUrl: 'views/faq.html'
	})
	.when('/carts/details', {
		controller: 'CartController',
		templateUrl: 'views/cart_detail.html'
	})
	.when('/payments', {
		controller: 'BooksController',
		templateUrl: 'views/payments.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});




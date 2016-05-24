angular.module('flapperNews', ['ui.router'])
var app = angular.module('flapperNews', []);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('home',{
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			});
			.state('posts', {
				url:'/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostCtrl'
			});
		$urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o; 
}]);

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
	$scope.posts = posts.posts;	
	$scope.addPost = function(){
		if (!$scope.title || $scope.title === '') {return;}
		$scope.posts.push({
			title: $scope.title, 
			link: $scope.link,
			upvotes: 0,
			comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 0},
				{author: 'Bob', body: 'Great idea!', upvotes: 2}
			]
		});
		$scope.title='';
		$scope.link='';
	};
	$scope.incrementUpvotes = function(post){
		post.upvotes +=1;
	};
	$scope.decrementUpvotes = function(post){
		post.upvotes -=1;
	}
}]);

app.controller('PostCtrl', [
'$scope',
'stateParams',
'posts',
function($scope, stateParams, posts){

}]);
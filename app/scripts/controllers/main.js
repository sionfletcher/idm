'use strict';
app.controller('MainController', function($scope, $state, $mdSidenav, Task, User) {
	$scope.toggleSidebar = function() {
		$mdSidenav('left').toggle();
	};

	$scope.logout = function() {
		User.logout().then(function() {
			$state.go('home');
		});
	};

	$scope.pages = [{title: 'Home', state: 'home'},
					{title: 'Tasks', state: '.tasks'},
					{title: 'Information', state: '.information'},
					{title: 'Useful Links', state: '.links'}];

	if(User.current()) {
		Task.completed(User.current().get('cohort')).then(function(tasks) {
			$scope.completeTasks = tasks;
		}, function(error) {
			console.error(error);
		});
	}
});

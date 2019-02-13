'use strict';
app.controller('LoginController', function($scope, $state, $mdToast, User) {
	$scope.logIn = function() {
		User.login($scope.user.email, $scope.user.password).then(function() {
			$state.go('home.tasks');
			$mdToast.show({
		        template: '<md-toast class="md-toast"><h1>Success!</h1></md-toast>',
		        hideDelay: 1000,
		        position: 'bottom right'
		    });
		}, function(error) {
			$scope.form.$setValidity('invalidLoginParamaters', false, {message: error.message});
			$mdToast.show({
		        template: '<md-toast class="md-toast md-warn"><h1>Failed!</h1></md-toast>',
		        hideDelay: 6000,
		        position: 'bottom right'
		    });
		});
	};
});
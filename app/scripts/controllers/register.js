'use strict';
app.controller('RegisterController', function($scope, $state, $mdToast, User) {
	$scope.register = function() {
		User.register($scope.user.email, $scope.user.password).then(function() {
			$mdToast.show({
		        template: '<md-toast class="md-toast"><h1>Success!</h1></md-toast>',
		        hideDelay: 1000,
		        position: 'bottom right'
		    });
		    $state.go('home.tasks');
		}, function(error) {
			console.error(error);
			$mdToast.show({
		        template: '<md-toast class="md-toast md-warn"><h1>Failed!</h1></md-toast>',
		        hideDelay: 6000,
		        position: 'bottom right'
		    });
		});
	};
});
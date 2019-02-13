'use strict';
app.controller('CardController', function($scope, $mdToast, $stateParams, Card) {

	$scope.RFID = $stateParams.id;

	$scope.registerCard = function() {
		var card = new Card();
		card.set('RFID', $scope.RFID);
		card.set('email', $scope.email);
		card.save(null, {
			success: function() {
				$mdToast.show({
			        template: '<md-toast class="md-toast"><h1>Success!</h1></md-toast>',
			        hideDelay: 1000,
			        position: 'bottom right'
			    });
			},
			error: function(object, error) {
				$mdToast.show({
			        template: '<md-toast class="md-toast md-warn">'+error.message+'</md-toast>',
			        hideDelay: 1000,
			        position: 'bottom right'
			    });
			}
		});
	};
});
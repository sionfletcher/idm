'use strict';
app.directive('changePassword', function($mdDialog){
	return {
		restrict: 'E',
		scope: {
			student: '='
		},
		template: '<md-button ng-click="changePassword()">Change Password</md-button>',
		link: function(scope) {
			scope.changePassword = function() {
				$mdDialog.show({
					scope: scope,
					preserveScope: true,
					templateUrl: 'views/admin/change-password.html',
					controller: function($scope, $mdToast) {
						$scope.changePassword = function() {
							Parse.Cloud.run('ChangePassword', {email: scope.student.email, password: scope.password}, {
								success: function(response) {
									$mdDialog.hide();
									$mdToast.show({
								        template: '<md-toast class="md-toast">Success!</md-toast>',
								        hideDelay: 1000,
								        position: 'bottom right'
								    });
								},
								error: function(error) {
									$mdToast.show({
								        template: '<md-toast class="md-toast md-warn">'+error.message+'</md-toast>',
								        hideDelay: 6000,
								        position: 'bottom right'
								    });
								}
							});
						}
					}
				});
			}
		}
	};
});
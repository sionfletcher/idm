'use strict';
app.directive('editTask', function($state, $mdDialog, Task) {
	return {
		restrict: 'E',
		scope: {
			task: '=',
			cohort: '=',
			label: '@'
		},
		template: '<md-button ng-click="editTask($event)">{{label}}</md-button>',
		link: function(scope) {
			scope.editTask = function(event) {
				$mdDialog.show({
					scope: scope,
					controller: function($scope) {
						scope.save = function() {
							scope.task.save().then(function() {
								$mdDialog.hide();
							});
						}
					},
					preserveScope: true,
					templateUrl: 'views/admin/edit-task.html',
					parent: angular.element(document.body),
					targetEvent: event,
					clickOutsideToClose:true
				});
			};
		}
	};
});
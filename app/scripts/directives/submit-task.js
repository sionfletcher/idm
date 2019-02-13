'use strict';
app.directive('submitTask', function($mdDialog, $rootScope, Submission) {
	return {
		restrict: 'E',
		scope: {
			task: '=',
			submitted: '&',
			resubmit: '='
		},
		templateUrl: 'views/submit-task.html',
		link: function(scope) {
			scope.sessionUser = $rootScope.sessionUser;
			scope.submitTask = function(event) {
				$mdDialog.show({
					scope: scope,
					locals: {
						task: scope.task
					},
					controller: function($scope) {
						$scope.submitting = false;
						$scope.submit = function() {
							$scope.submitting = true;
							var submission = new Submission();
							submission.set('user', Parse.User.current());
							submission.set('task', this.task);
							submission.set('url', $scope.data.url);
							submission.save(null, {
								success: function(submission) {
									$mdDialog.hide(submission);
								},
								error: function(error) {
									console.error(error);
								}
							});
						};
					},
					preserveScope: true,
					templateUrl: 'views/submit-task-dialog.html',
					parent: angular.element(document.body),
					targetEvent: event,
					clickOutsideToClose:true
				}).then(function(submission) {
					scope.submitted({submission: submission});
				});
			};

			scope.preview = function() {
				if(scope.data) {
					if(scope.data.url) {
						window.open(scope.data.url,'Is this your work?','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600');
					}
				}
			};

			scope.$watch('data.url', function(newValue) {
				if(newValue) {
					scope.preview();
				}
			});
		}
	};
});
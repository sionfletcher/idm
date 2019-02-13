'use strict';
app.directive('highlightSubmission', function($mdToast) {
	return {
		restrict: 'E',
		scope: {
			submission: '='
		},
		templateUrl: 'views/admin/highlight-submission.html',
		link: function(scope) {
			scope.highlightChanged = function() {
				scope.submission.save(null, {
					success: function() {
						$mdToast.show({
					        template: '<md-toast class="md-toast">Success!</md-toast>',
					        hideDelay: 200,
					        position: 'bottom right'
					    });
					},
					error: function(error) {
						$mdToast.show({
					        template: '<md-toast class="md-toast md-warn">'+error.message+'</md-toast>',
					        hideDelay: 5000,
					        position: 'bottom right'
					    });
					}
				});
			};
		}
	};
});
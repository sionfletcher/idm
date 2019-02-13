'use strict';
app.directive('submissionStatus', function() {
	return {
		restrict: 'E',
		scope: {
			task: '=',
			submissions: '='
		},
		templateUrl: 'views/submission-status.html',
		link: function(scope) {
			scope.$watch('submissions', function(newValue) {
				if(newValue === undefined) {
					var now = new Date().getTime();
					var deadline = new Date(scope.task.deadline);
					deadline.setDate(deadline.getDate() + 1);

					if(now > deadline.getTime()) {
						scope.status = "late";
					} else {
						scope.status = "awaiting";
					}
				} else {
					scope.status = "submitted";
				}
			});
		}
	};
});
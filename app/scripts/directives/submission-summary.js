'use strict';
app.directive('submissionSummary', function() {
	return {
		restrict: 'E',
		scope: {
			task: '='
		},
		templateUrl: 'views/submission-summary.html',
		link: function() {

		}
	};
});
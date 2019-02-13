'use strict';
app.directive('submissionList', function() {
	return {
		restrict: 'E',
		scope: {
			submissions: '='
		},
		templateUrl: 'views/submission-list.html'
	};
});
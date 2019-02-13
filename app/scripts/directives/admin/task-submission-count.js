'use strict';
app.directive('taskSubmissionCount', function(Submission) {
	return {
		restrict: 'E',
		scope: {
			task: '='
		},
		template: '<span>{{markedCount}} / {{submissionCount}}</span>',
		link: function(scope) {
			scope.$watch('task', function(task) {
				if(task) {
					Submission.count(task).then(function(response) {
						scope.submissionCount = response;
					}, function(error) {
						console.error(error);
					});
					Submission.marked(task).then(function(response) {
						scope.markedCount = response;
					}, function(error) {
						console.error(error);
					});
				}
			})
		}
	};
});
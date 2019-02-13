'use strict';
app.directive('submissionsTable', function(Submission, Task) {
	return {
		restrict: 'E',
		scope: {
			cohort: '='
		},
		templateUrl: 'views/admin/submissions-table.html',
		link: function(scope) {
			Task.list(scope.cohort).then(function(tasks) {
				scope.tasks = tasks;
			});

			scope.$watch('task', function(task) {
				if(task) {
					Submission.listForCohort(scope.cohort, task).then(function(submissions) {
						scope.submissions = submissions;
					});
				}
			});
		}
	};
});
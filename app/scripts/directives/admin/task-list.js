'use strict';
app.directive('taskList', function(Task, $mdDialog) {
	return {
		restrict: 'E',
		scope: {
			cohort: '='
		},
		templateUrl: 'views/admin/task-list.html',
		link: function(scope) {
			Task.list(scope.cohort).then(function(tasks) {
				scope.tasks = tasks;
			});

			scope.newTask = function() {
				var task = new Task();
				task.set('cohort', scope.cohort);
				task.set('title', 'New Task');
				task.save().then(function(task) {
					scope.tasks.push(task);
					scope.$apply();
				}, function(error) {
					console.error(error);
				});
			}
		}
	};
});
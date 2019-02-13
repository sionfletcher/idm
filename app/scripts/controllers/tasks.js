'use strict';
app.controller('TasksController', function($scope, $anchorScroll, Task, User, Mark, Submission) {
	Task.list(User.current().get('cohort'), true).then(function(tasks) {
		$scope.tasks = tasks;
	});

	Submission.list(User.current()).then(function(results) {
		var submissions = {};
		for(var i = 0; i < results.length; i++) {
			if(submissions[results[i].get('task').id] === undefined) {
				submissions[results[i].get('task').id] = [];
			}
			submissions[results[i].get('task').id].push(results[i]);
		}
		$scope.submissions = submissions;
	});

	$scope.goToTask = function(task) {
		$anchorScroll(task);
	};

	$scope.taskSubmitted = function(submission) {
		if($scope.submissions[submission.get('task').id] === undefined) {
			$scope.submissions[submission.get('task').id] = [];
		}
		$scope.submissions[submission.get('task').id].unshift(submission);
	};

	$scope.isResubmit = function(task) {
		if($scope.submissions === undefined) {
			return false;
		}
		if($scope.submissions[task.id] === undefined) {
			return false;
		} else {
			return true;
		}
	};
});
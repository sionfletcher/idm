'use strict';
app.directive('banner', function(Submission, User, Task) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'views/banner.html',
		link: function(scope) {
			var query = new Parse.Query(Task);
			query.equalTo('title', 'Network');
			query.equalTo('cohort', User.current().get('cohort'));
			query.first({
				success: function(task) {
					User.list(User.current().get('cohort')).then(function(students) {
						scope.students = students;

						var submissions = new Parse.Query(Submission);
						submissions.containedIn('user', students);
						submissions.equalTo('task', task);
						submissions.limit(1000);
						submissions.descending('createdAt');
						submissions.find({
							success: function(submissions) {
								scope.submissions = submissions;
								scope.$apply();
							},
							error: function(error) {
								console.error(error);
							}
						});
					});
				}
			});

			scope.submitted = function(student) {
				if(scope.submissions) {
					for(var i = 0; i < scope.submissions.length; i++) {
						if(scope.submissions[i].get('user').id === student.id) {
							return true;
						}
					}
				}
				return false;
			};

			scope.style = function(student) {
				if(scope.submissions) {
					for(var i = 0; i < scope.submissions.length; i++) {
						if(scope.submissions[i].get('user').id === student.id) {
							return {
								'background-image': 'url('+scope.submissions[i].url+')'
							};
						}
					}
				}
				return {};
			};

			scope.name = function(student) {
				var email = student.get('email');
				var name = email.split('@')[0];
				return name;
			};
		}
	};
});
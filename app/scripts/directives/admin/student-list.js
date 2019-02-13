'use strict';
app.directive('studentList', function(User, Card) {
	return {
		restrict: 'E',
		scope: {
			cohort: '='
		},
		templateUrl: 'views/admin/student-list.html',
		link: function(scope) {
			User.list(scope.cohort).then(function(users) {
				scope.students = users;
			}, function(error) {
				console.error(error);
			});

			scope.findCard = function(student) {
				var query = new Parse.Query(Card);
				query.equalTo('email', student.get('email'));
				query.first({
					success: function(card) {
						if(card) {
							card.set('user', student);
							card.save(null, {
								success: function() {
									console.log('success');
								},
								error: function(error) {
									console.error(error);
								}
							});
						} else {
							console.log('Could not find card for student '+student.get('email'));
						}
					},
					error: function(error) {
						console.error(error);
					}
				});
			};

			// Card.list().then(function(cards) {
			// 	for(var i = 0; i < cards.length; i++) {

			// 	}
			// }, function(error) {
			// 	console.error(error)
			// });
		}
	};
});
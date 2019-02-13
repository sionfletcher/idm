'use strict';
app.controller('RolesController', function($scope, User) {
	$scope.addUser = function() {
		var query = new Parse.Query(Parse.Role);
		query.equalTo('name', 'Administrator');
		query.first({
			success: function(role) {
				console.log(role);
				role.getUsers().add(User.current());
				role.save(null, {
					success: function(role) {
						console.log(role);
					},
					error: function(error) {
						console.error(error);
					}
				});
			},
			error: function(error) {
				console.error(error);
			}
		});
	};
});
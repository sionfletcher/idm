'use strict';
app.service('User', function($rootScope, $q) {
	var User = Parse.User.extend({}, {
		list: function(cohort) {
			var defer = $q.defer();
			var query = new Parse.Query(this);
			if(cohort) {
				query.equalTo('cohort', cohort);
			}
			query.descending('email');
			query.limit(1000);
			query.find({
				success: function(users) {
					defer.resolve(users);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		},
		listRoles: function() {
			var defer = $q.defer();
			var query = new Parse.Query('_Role');
			query.find({
				success: function(roles) {
					defer.resolve(roles);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		},
		login: function(email, password) {
			var defer = $q.defer();
			Parse.User.logIn(email, password, {
				success: function(user) {
					$rootScope.sessionUser = user;
					defer.resolve(user);
				},
				error: function(user, error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		},
		logout: function() {
			Parse.User.logOut();
			$rootScope.sessionUser = undefined;
			return $q.when({success: 'Logged Out'});
		},
		register: function(email, password) {
			var defer = $q.defer();
			var user = new Parse.User();
			user.set('email', email);
			user.set('username', email);
			user.set('password', password);
			user.signUp(null, {
				success: function(user) {
					$rootScope.sessionUser = user;
					defer.resolve(user);
				},
				error: function(user, error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		}
	});

	Object.defineProperty(User.prototype, 'email', {
		get: function() {
			return this.get('email');
		},
		set: function(value) {
			return this.set('email', value);
		}
	});

	return User;
});
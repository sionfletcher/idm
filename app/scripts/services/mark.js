'use strict';
app.service('Mark', function($q) {
	var Mark = Parse.Object.extend('Mark', {}, {
		list: function(user) {
			var defer = $q.defer();
			var query = new Parse.Query(this);
			query.equalTo('user', user);
			query.find({
				success: function(marks) {
					defer.resolve(marks);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		}
	});

	Object.defineProperty(Mark.prototype, 'grade', {
		get: function() {
			return this.get('grade');
		},
		set: function(value) {
			return this.set('grade', value);
		}
	});
	
	return Mark;
});
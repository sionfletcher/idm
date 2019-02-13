'use strict';
app.service('Task', function($q) {
	var Task = Parse.Object.extend('Task', {
		// Instance
	}, {
		list: function(cohort, activeOnly) {
			var defer = $q.defer();
			var query = new Parse.Query(Task);
			query.equalTo('cohort', cohort);
			if(activeOnly) {
				query.equalTo('active', true);
			}
			query.descending('createdAt'); //TODO: Change this to deadline
			query.find({
				success: function(tasks) {
					defer.resolve(tasks);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		},
		completed: function(cohort) {
			var defer = $q.defer();
			var query = new Parse.Query(Task);
			query.equalTo('complete', true);
			query.equalTo('cohort', cohort);
			query.descending('createdAt');
			query.find({
				success: function(tasks) {
					defer.resolve(tasks);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		}
	});

	Object.defineProperty(Task.prototype, 'title', {
		get: function() {
			return this.get('title');
		},
		set: function(value) {
			return this.set('title', value);
		}
	});

	Object.defineProperty(Task.prototype, 'content', {
		get: function() {
			return this.get('content');
		},
		set: function(value) {
			return this.set('content', value);
		}
	});

	Object.defineProperty(Task.prototype, 'deadline', {
		get: function() {
			return this.get('deadline');
		},
		set: function(value) {
			return this.set('deadline', value);
		}
	});

	Object.defineProperty(Task.prototype, 'slides', {
		get: function() {
			return this.get('slides');
		},
		set: function(value) {
			return this.set('slides', value);
		}
	});

	Object.defineProperty(Task.prototype, 'active', {
		get: function() {
			return this.get('active');
		},
		set: function(value) {
			return this.set('active', value);
		}
	});

	Object.defineProperty(Task.prototype, 'complete', {
		get: function() {
			return this.get('complete');
		},
		set: function(value) {
			return this.set('complete', value);
		}
	});

	Object.defineProperty(Task.prototype, 'comments', {
		get: function() {
			return this.get('comments');
		},
		set: function(value) {
			return this.set('comments', value);
		}
	});
	return Task;
});
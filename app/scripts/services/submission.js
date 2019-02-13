'use strict';
app.service('Submission', function($q) {
	var Submission = Parse.Object.extend('Submission', function() {}, {
		list: function() {
			var defer = $q.defer();
			var query = new Parse.Query(this);
			query.equalTo('user', Parse.User.current());
			query.descending('createdAt');
			query.include('mark');
			query.find({
				success: function(submissions) {
					defer.resolve(submissions);
				},
				error: function(error) {
					defer.resolve(error);
				}
			});
			return defer.promise;
		},
		count: function(task) {
			var defer = $q.defer();
			var query = new Parse.Query(this);
			query.equalTo('task', task);
			query.count({
				success: function(result) {
					defer.resolve(result);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		},
		marked: function(task) {
			var defer = $q.defer();
			var query = new Parse.Query(this);
			query.equalTo('task', task);
			query.exists('mark');
			query.count({
				success: function(result) {
					defer.resolve(result);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		},
		listForCohort: function(cohort, task) {
			var defer = $q.defer();
			var query = new Parse.Query(this);
			query.descending('createdAt');
			query.include(['user', 'task', 'mark']);
			query.limit(1000);

			var innerQuery = new Parse.Query('_User');
			innerQuery.equalTo('cohort', cohort);
			query.matchesQuery('user', innerQuery);

			if(task) {
				query.equalTo('task', task);
			}
			
			query.find({
				success: function(submissions) {
					defer.resolve(submissions);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		}
	});

	Object.defineProperty(Submission.prototype, 'url', {
		get: function() {
			return this.get('url');
		},
		set: function(value) {
			return this.set('url', value);
		}
	});

	Object.defineProperty(Submission.prototype, 'task', {
		get: function() {
			return this.get('task');
		},
		set: function(value) {
			return this.set('task', value);
		}
	});

	Object.defineProperty(Submission.prototype, 'user', {
		get: function() {
			return this.get('user');
		},
		set: function(value) {
			return this.set('user', value);
		}
	});

	Object.defineProperty(Submission.prototype, 'mark', {
		get: function() {
			return this.get('mark');
		},
		set: function(value) {
			return this.set('mark', value);
		}
	});

	Object.defineProperty(Submission.prototype, 'highlight', {
		get: function() {
			return this.get('highlight');
		},
		set: function(value) {
			return this.set('highlight', value);
		}
	});

	Object.defineProperty(Submission.prototype, 'resubmission', {
		get: function() {
			return this.get('resubmission');
		},
		set: function(value) {
			return this.set('resubmission', value);
		}
	});

	return Submission;
});
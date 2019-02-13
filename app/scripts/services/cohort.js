'use strict';
app.service('Cohort', function($q, Task) {
	var Cohort = Parse.Object.extend('Cohort', {
		getTasks: function() {
			var defer = $q.defer();
			var query = new Parse.Query(Task);
			query.equalTo('cohort', this);
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
	}, {
		create: function(title) {
			var defer = $q.defer();
			var cohort = new Cohort();
			cohort.set('title', title);
			cohort.save(null, {
				success: function(cohort) {
					console.log(cohort);
					defer.resolve(cohort);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		},
		list: function() {
			var defer = $q.defer();
			var query = new Parse.Query(Cohort);
			query.descending('createdAt');
			query.find({
				success: function(cohorts) {
					defer.resolve(cohorts);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		},
		fetch: function(cohort) {
			var defer = $q.defer();
			var query = new Parse.Query(this);
			query.get(cohort, {
				success: function(cohort) {
					defer.resolve(cohort);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		}
	});

	Object.defineProperty(Cohort.prototype, 'title', {
		get: function() {
			return this.get('title');
		},
		set: function(value) {
			return this.set('title', value);
		}
	});
	
	return Cohort;
});
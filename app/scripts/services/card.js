'use strict';
app.service('Card', function($q) {
	var Card = Parse.Object.extend('Card', {}, {
		list: function() {
			var defer = $q.defer();
			var query = new Parse.Query(this);
			query.limit(1000);
			query.find({
				success: function(cards) {
					defer.resolve(cards);
				},
				error: function(error) {
					defer.reject(error);
				}
			});
			return defer.promise;
		}
	});
	return Card;
});
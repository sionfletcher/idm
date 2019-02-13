'use strict';
app.controller('AdminController', function($scope, $state, Cohort) {
	Cohort.list().then(function(cohorts) {
		$scope.cohorts = cohorts;
	});

	$scope.newCohort = function() {
		Cohort.create($scope.cohort.title).then(function(cohort) {
			console.log(cohort);
			$scope.cohorts.push(cohort);
		});
	};
});
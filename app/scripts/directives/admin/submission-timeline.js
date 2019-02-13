'use strict';
app.directive('submissionTimeline', function() {
	return {
		restrict:'E',
		scope: {
			submissions: '='
		},
		templateUrl: 'views/admin/subission-timelime.html',
		link: function(scope) {
			scope.$watch('submissions', function(submissions) {
				if(submissions) {
					scope.chartObject = {};
					scope.chartObject.type = 'LineChart';

					var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
					if(submissions) {
						var count = {};
						
						for(var i = scope.submissions.length - 1; i >= 0; i--) {
							var date = scope.submissions[i].createdAt;
							var day = days[date.getDay()];
							if(count[day] === undefined) {
								count[day] = 0;
							}
							count[day]++;
						}

						var rows = [];
						var keys = Object.keys(count);

						for(var i = 0; i < keys.length; i++) {
							var row = {c: [{v: keys[i]}, {v: count[keys[i]]}]};
							rows.push(row);
						}

						scope.chartObject.data = {"cols": [
					        {id: "t", label: "Day", type: "string"},
					        {id: "s", label: "Submissions", type: "number"}
					    ], "rows": rows};

					    scope.chartObject.options = {
					    	title: 'Submissions',
					    	vAxis: {
								title: 'Submissions',
								minValue: 0
							},
							hAxis: {
								title: 'Day'
							}
					    };
					}
				}
			});
		}
	};
});
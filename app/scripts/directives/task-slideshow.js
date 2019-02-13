'use strict';
app.directive('taskSlideshow', function($interval) {
	return {
		restrict: 'E',
		scope: {
			task: '='
		},
		template: '<md-button class="md-raised md-warn" ng-click="show()">Slideshow</md-button>',
		link: function(scope) {
			scope.show = function() {



				var query = new Parse.Query('Submission');
				query.equalTo('task', scope.task);
				query.limit(1000);
				query.find({
					success: function(submissions) {
						scope.submissions = submissions;
						scope.interval = $interval(function() {
							showNext();
						}, 5000);
						showNext();
					},
					error: function(error) {
						console.error(error);
					}
				});

				var current = 0;
				var slideshow;
				function showNext() {
					if(!slideshow) {
						slideshow = window.open(scope.submissions[current % scope.submissions.length].get('url'), 'Slideshow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,fullscreen=yes');
					} else {
						if(slideshow.closed) {
							$interval.cancel(scope.interval);
							console.log('cancel');
						}
						slideshow.location.href = scope.submissions[current % scope.submissions.length].get('url');
					}
					current++;
				}
			};
		}
	};
});
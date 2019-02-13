'use strict';
app.directive('submissionSlideshow', function($interval) {
	return {
		restrict: 'E',
		scope: {
			submissions: '='
		},
		template: '<md-button ng-click="start()">Slideshow</md-button>',
		link: function(scope) {

			var current = 0;
			var slideshow;
			function showNext() {
				if(!slideshow) {
					slideshow = window.open(scope.submissions[current % scope.submissions.length].get('url'), 'Slideshow', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,fullscreen=yes');
				} else {
					slideshow.location.href = scope.submissions[current % scope.submissions.length].get('url');
				}
				current++;
			}

			scope.$watch('submissions', function(submissions) {
				if(submissions) {
					scope.start = function() {
						$interval(function() {
							showNext();
						}, 5000);
						showNext();
					};
				}
			});
		}
	};
});
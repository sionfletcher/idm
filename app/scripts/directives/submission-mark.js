'use strict';
app.directive('submissionMark', function() {
	return {
		restrict: 'E',
		scope: {
			submissions: '='
		},
		templateUrl: 'views/submission-mark.html',
		link: function(scope) {
			scope.$watch('submissions', function(submissions) {
				if(submissions) {
					var marks = [];
					for(var i = 0; i < submissions.length; i++) {
						var submission = submissions[i];
						if(submission.get('mark')) {
							marks.push(submission.get('mark'));
						}
					}
					if(marks.length > 0) {
						var grade;
						for(var j = 0; j < marks.length; j++) {
							var thisGrade = marks[j].get('grade');
							if(thisGrade !== undefined) {
								if(thisGrade > grade || grade === undefined) {
									grade = thisGrade;
								}
							}
						}
						scope.grade = grade;
					} else {
						scope.grade = 'awaiting';
					}
				} else {
					scope.grade = undefined;
				}
			});
		}
	};
});
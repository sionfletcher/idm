'use strict';
app.directive('studentMarks', function(User, Submission, Mark, $q, $timeout) {
	return {
		restrict: 'E',
		templateUrl: 'views/admin/student-marks.html',
		scope: {
			cohort: '='
		},
		link: function(scope) {

			scope.offset = 0;

			function getMark(student) {
				var query = new Parse.Query(Submission);
				query.equalTo('user', student.student);
				query.include('mark');
				query.select(['mark.grade', 'task']);

				var defer = $q.defer();
				query.find({
					success: function(submissions) {
						var marks = {};
						for(var i = 0; i < submissions.length; i++) {
							var submission = submissions[i];
							var taskId = submission.task.id;
							if(marks[taskId] === undefined) {
								marks[taskId] = {grade: 0};
							}
							if(!submission.mark) {
								marks[taskId].grade = 'unmarked';
							} else {
								if(submission.mark.grade > marks[taskId].grade) {
									marks[taskId].grade = submission.mark.grade;
								}
							}
						}

						var total = 0;
						for(var mark in marks) {
							var grade = marks[mark].grade;
							total += !isNaN(grade) ? grade : 0;
						}
						student.mark = total;
						defer.resolve();
					},
					error: function(error) {
						defer.reject();
					}
				});

				return defer.promise;
			}

			function fetchStudents(offset) {

				scope.students = [];
				var queries = [];

				var tempStudents = [];
				
				var query = new Parse.Query(User);
				query.ascending('email');
				query.limit(1000);
				query.skip(offset || 0);
				query.find({
					success: function(students) {
						for(var i = 0; i < students.length; i++) {
							var index = i;
							tempStudents[index] = {
								student: students[index]
							}
							queries.push(getMark(tempStudents[index]));
						}

						$q.all(queries).then(function() {
							scope.students = tempStudents;
							scope.min = 9999;
							scope.max = 0;
							for(var i = 0; i < scope.students.length; i++) {
								var student = scope.students[i];
								scope.min = student.mark < scope.min ? student.mark : scope.min;
								scope.max = student.mark > scope.max ? student.mark : scope.max;
							}							
						});
					},
					error: function(error) {
						console.error(error);
					}
				});
			}

			function map(value, srcRange, dstRange) {
				// value is outside source range return
				if (value < srcRange[0] || value > srcRange[1]){
					return NaN; 
				}

				var srcMax = srcRange[1] - srcRange[0],
				  dstMax = dstRange[1] - dstRange[0],
				  adjValue = value - srcRange[0];

				return (adjValue * dstMax / srcMax) + dstRange[0];

			}

			scope.grade = function(mark) {

				var grades = ['F-', 'F', 'E', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+'];
				var gradeIndex = Math.ceil(map(mark, [scope.min, scope.max], [0, grades.length - 1]));
				return grades[gradeIndex];
			};

			fetchStudents(2);
		}
	};
});
'use strict';
app.directive('markSubmission', function($mdToast, Mark) {
	return {
		restrict: 'E',
		scope: {
			submission: '='
		},
		templateUrl: 'views/admin/mark-submission.html',
		link: function(scope) {
			scope.mark = scope.submission.get('mark');
			scope.markChanged = function() {
				if(scope.submission.get('mark') === undefined) {
					var grade = scope.mark.grade;
					scope.mark = new Mark();
					scope.mark.set('grade', grade);
					
					var acl = new Parse.ACL();
					acl.setReadAccess(scope.submission.user, true);
					acl.setRoleWriteAccess("Administrator", true); 
					acl.setRoleReadAccess("Administrator", true); 
					scope.mark.setACL(acl);

					scope.submission.set('mark', scope.mark);
					scope.submission.save({
						success: function() {
							$mdToast.show({
								template: '<md-toast class="md-toast">Success!</md-toast>',
								hideDelay: 200,
								position: 'bottom right'
							});
						},
						error: function(error) {
							console.error(error);
						}
					});
				} else {
					scope.submission.save(null, {
						success: function() {
							$mdToast.show({
								template: '<md-toast class="md-toast">Success!</md-toast>',
								hideDelay: 200,
								position: 'bottom right'
							});
						},
						error: function(object, error) {
							console.error(object, error);
						}
					});
				}
			}
		}
	};
});
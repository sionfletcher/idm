'use strict';
/* global app:true */
/* exported app */
/**
 * @ngdoc overview
 * @name idmApp
 * @description
 * # idmApp
 *
 * Main module of the application.
 */
var app = angular
	.module('idmApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ngMaterial',
		'ngMessages',
		'ui.router',
		'ui.pagedown',
		'md.data.table',
		'googlechart'
	])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/main.html',
				controller: 'MainController'
			})
			.state('card', {
				url: '/card/:mode/:id',
				templateUrl: function($stateParams) {
					if($stateParams.mode === 'register') {
						return 'views/register-card.html';
					}
				},
				controller: 'CardController'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'views/login.html',
				controller: 'LoginController'
			})
			.state('home.tasks', {
				url: 'tasks',
				templateUrl: 'views/tasks.html',
				controller: 'TasksController'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'views/register.html',
				controller: 'RegisterController'
			})
			.state('home.information', {
				url: 'information',
				templateUrl: 'views/information.html'
			})
			.state('home.links', {
				url: 'links',
				templateUrl: 'views/links.html'
			})
			.state('home.profile', {
				url: 'profile/:user',
				templateUrl: 'views/profile.html',
				controller: function($scope, Submission, user) {
					$scope.user = user;
					var query = new Parse.Query(Submission);
					query.equalTo('user', user);
					query.find({
						success: function(submissions) {
							$scope.submissions = submissions;
							$scope.$apply();
						},
						error: function(error) {
							console.error(error);
						}
					});
				},
				resolve: {
					user: function($q, $stateParams, User) {
						var defer = $q.defer();
						var query = new Parse.Query(User);
						query.get($stateParams.user, {
							success: function(user) {
								defer.resolve(user);
							},
							error: function(error) {
								defer.reject(error);
							}
						});
						return defer.promise;
					}
				}
			})
			.state('home.admin', {
				url: 'admin',
				templateUrl: 'views/admin/admin.html',
				controller: 'AdminController'
			})
			.state('home.admin.roles', {
				url: '/roles',
				templateUrl: 'views/admin/roles.html',
				controller: 'RolesController'
			})
			.state('home.admin.cohort', {
				url: '/cohort/:cohort',
				templateUrl: 'views/admin/cohort.html',
				controller: function($scope, cohort) {
					$scope.cohort = cohort;
				},
				resolve: {
					cohort: function($stateParams, Cohort) {
						return Cohort.fetch($stateParams.cohort);
					}
				}
			})
			.state('home.admin.cohort.tasks', {
				url: '/tasks',
				template: '<task-list cohort="cohort"></task-list>'
			})
			.state('home.admin.cohort.submissions', {
				url: '/submissions',
				template: '<submissions-table cohort="cohort"></submissions-table>'
			})
			.state('home.admin.cohort.students', {
				url: '/students',
				template: '<student-list cohort="cohort"></student-list>'
			})
			.state('home.admin.cohort.marks', {
				url: '/student-marks',
				template: '<student-marks cohort="cohort"></student-marks>'
			})
			.state('home.admin.cohort.newTask', {
				url: '/newTask',
				template: '<new-task></new-task>'
			});

			$urlRouterProvider.otherwise('/');
	}).run(function(User, $rootScope, $state, $mdToast) {

		Parse.initialize('idm-csm', 'gDHFCm7N9X26Xt8kfAUOJ09FGCRCSh0RKS5J4tgjQMI83Gx0RySWeb9CpUANsMw');
		Parse.serverURL = 'https://idm-csm.herokuapp.com/parse';

		$rootScope.sessionUser = Parse.User.current();
		$rootScope.$on('$stateChangeStart', function(e, toState) {
			
			if(Parse.User.current()) {
				if(toState.name === 'register' || toState.name === 'login') {
					e.preventDefault();
					$state.go('home');
					$mdToast.show({
				        template: '<md-toast class="md-toast"><h1>Logged in</h1></md-toast>',
				        hideDelay: 1000,
				        position: 'bottom right'
				    });
				}
			}

			if(toState.name.indexOf('admin') !== -1) {
				if(!Parse.User.current()) {
					e.preventDefault();
					$state.go('home');
				} else {
					if(Parse.User.current().get('role') === undefined || Parse.User.current().get('role') !== 'Administrator') {
						e.preventDefault();
						$state.go('home');
					}
				}
			}
		});
	});

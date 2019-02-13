'use strict';
app.filter('trustedUrl', function($sce) {
	return function(value) {
		return $sce.trustAsUrl(value);
	};
});
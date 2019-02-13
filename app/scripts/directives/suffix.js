'use strict';
app.directive('suffix', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attributes, controller) {
			controller.$validators.suffix = function(modelValue) {
		        if(controller.$isEmpty(modelValue)) {
		          // consider empty models to be valid
		          return false;
		        } else {
		        	return modelValue.indexOf(attributes.suffix, modelValue.length - attributes.suffix.length) !== -1;
		        }
		        // it is invalid
		        return false;
		    };
		}
	};
});

(function () {
	'use strict';
		angular
			.module('fuse')
			.directive('uniqueValidation',uniqueValidation);

			/** @ngInject */
			function uniqueValidation ($q,$resource)
			{
				var directive = {
						restrict:'A',
						require:'ngModel',
						link: link
				};
				return directive;

					function link (scope,element,attrs,ngModel){
						ngModel.$asyncValidators.unique = uniqueValidator;

							function uniqueValidator (modelValue,viewValue){
								var deferred   = $q.defer(),
									currentVal = modelValue || viewValue,
									urlPath    = attrs.urlPath,
									keyID 	   = attrs.keyId,
									keyField   = attrs.keyField;

									if(urlPath && keyField){
										var res = $resource(urlPath),
											param = {uniqueId:keyID,uniqueField:keyField,uniqueValue:currentVal};
											res.save(param,success);
											function success(r)
											{
												if(r.status === 200)
												{
													deferred.resolve();
												}
												else if(r.status === 403)
												{
													 deferred.reject();
												}
												else
												{
													deferred.reject();
												}
											}
										return deferred.promise;
									}
									else
									{
										deferred.resolve();
										return deferred.promise;
									}
							}
					}
			}
})();
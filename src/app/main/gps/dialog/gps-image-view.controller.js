(function () {
	'use strict';
		angular
			.module('app.gps')
			.controller('GPSViewDialogController',GPSViewDialogController);

			/** @ngInject */
			function GPSViewDialogController(ModalConfig,data,RouteImage)
			{
				var vm = this;
					vm.data = {
						unit_name:data.unit_name,
						body_no:data.body_no,
						geofence_name:data.geofence_name,
						image: data.geofence_file
					};
					vm.closeDialog	= closeDialog;
					vm.photoPath = RouteImage;
					
					function closeDialog()
					{
						ModalConfig.cancelModal();
					}
			}
})();
(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('LicenseViewDialogController',LicenseViewDialogController);

			/** @ngInject */
			function LicenseViewDialogController(ModalConfig,data,LicenseImage)
			{
				var vm = this;
					vm.data 		= {license_no:data.license_no,image:data.license_file};
					vm.closeDialog	= closeDialog;
					vm.photoPath = LicenseImage;
					
					function closeDialog()
					{
						ModalConfig.cancelModal();
					}
			}
})();
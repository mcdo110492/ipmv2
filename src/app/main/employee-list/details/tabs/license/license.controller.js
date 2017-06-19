(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeLicenseController',EmployeeLicenseController);

			/** @ngInject */
			function EmployeeLicenseController ($rootScope,api,$stateParams,toaster,LoaderService,ModalConfig,LicenseImage) 
			{
				var vm = this;
					vm.lists = [];

					vm.photoPath = LicenseImage;
					vm.loadLicense = loadLicense;
					vm.openDialog	 = openDialog;
					vm.updateDialog	 = updateDialog;
					vm.uploadDialog  = uploadDialog;
					vm.openLicenseImage = openLicenseImage;
					function loadLicense ()
					{
						LoaderService.loader();
						var datastring = {project_id:$rootScope.selectedProject.project_id,employee_id:$stateParams.id};
						vm.promise = api.employeeDetails.employeeLicense.get(datastring,success).$promise;
						function success(r)
						{
							vm.lists = r;
							LoaderService.hide();
						}
					}

					function openDialog(ev)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/license/dialog/license-dialog.html';
						var ctrl 	= 'LicenseDialogController';
						var ctrlAs	= 'eldcvm';
						var local	= {status:0,data:{employee_id:$stateParams.id}};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadLicense);
					}

					function updateDialog(ev,datas)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/license/dialog/license-dialog.html';
						var ctrl 	= 'LicenseDialogController';
						var ctrlAs	= 'eldcvm';
						var local	= {status:1,data:datas};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadLicense);
					}

					function uploadDialog(ev,id)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/license/dialog/license-image.html';
						var ctrl 	= 'LicenseImageDialogController';
						var ctrlAs	= 'eldcvm';
						var local	= {data:{employee_license_id:id}};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadLicense);
					}

					function openLicenseImage(ev,data)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/license/dialog/license-view-image.html';
						var ctrl 	= 'LicenseViewDialogController';
						var ctrlAs	= 'eldcvm';
						var local	= {data:data};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadLicense);
					}
			}
})();	
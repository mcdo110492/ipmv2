(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('LicenseDialogController',LicenseDialogController);

			/** @ngInject */
			function LicenseDialogController(ModalConfig,data,status,toaster,api)
			{
				var vm = this;
					vm.loader   	= false;
					vm.save 		= save;	
					vm.closeDialog	= closeDialog;
					vm.details 		= {
								employee_license_id:'',
								employee_id:data.employee_id,
								license_no:'',
								license_type:'',
								date_issued:'',
								date_expired:''
					};

					init();
					function init()
					{
						if(status == 1)
						{
							vm.details 		= {
								employee_license_id:data.employee_license_id,
								employee_id:data.employee_id,
								license_no:data.license_no,
								license_type:data.license_type,
								date_issued: new Date(data.date_issued),
								date_expired: new Date(data.date_expired)
							};
						}
					}


					function save()
					{
						vm.loader   	= true;
						if(status == 0)
						{
							api.employeeDetails.employeeLicense.save(vm.details,success);
						}
						else
						{
							api.employeeDetails.employeeLicense.update(vm.details,success);
						}
						
						function success(r)
						{
							if(r.status == 200)
							{
								toaster.pop('success','Success','Data has been save successfully.');
							}
							else
							{
								toaster.pop('error','Error','Something went wrong.');
							}
							ModalConfig.closeModal();
							vm.loader   	= false;
						}	
					}

					function closeDialog()
					{
						ModalConfig.cancelModal();
					}
			}
})();
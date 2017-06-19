(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('FamilyDialogController',FamilyDialogController);

			/** @ngInject */
			function FamilyDialogController(ModalConfig,data,status,toaster,api)
			{
				var vm = this;
					vm.loader   	= false;
					vm.save 		= save;	
					vm.closeDialog	= closeDialog;
					vm.details 		= {
								employee_family_id:'',
								employee_id:data.employee_id,
								family_name:'',
								family_address:'',
								family_occupation:'',
								family_dob: new Date(),
								family_relation:''
					};

					init();
					function init()
					{
						if(status == 1)
						{
							vm.details 		= {
								employee_family_id:data.employee_family_id,
								employee_id:data.employee_id,
								family_name:data.family_name,
								family_address:data.family_address,
								family_occupation:data.family_occupation,
								family_dob:new Date(data.family_dob),
								family_relation:data.family_relation
							};
						}
					}


					function save()
					{
						vm.loader   	= true;
						if(status == 0)
						{
							api.employeeDetails.employeeFamily.save(vm.details,success);
						}
						else
						{
							api.employeeDetails.employeeFamily.update(vm.details,success);
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
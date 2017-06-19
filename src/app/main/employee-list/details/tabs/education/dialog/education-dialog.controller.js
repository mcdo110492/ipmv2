(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EducationDialogController',EducationDialogController);

			/** @ngInject */
			function EducationDialogController(ModalConfig,data,status,toaster,api)
			{
				var vm = this;
					vm.loader   	= false;
					vm.save 		= save;	
					vm.closeDialog	= closeDialog;
					vm.details 		= {
								employee_education_id:'',
								employee_id:data.employee_id,
								school_name:'',
								school_address:'',
								school_year:'',
								degree:'',
								honors:'',
								major:'',
								minor:''
					};

					init();
					function init()
					{
						if(status == 1)
						{
							vm.details 		= {
								employee_education_id:data.employee_education_id,
								employee_id:data.employee_id,
								school_name:data.school_name,
								school_address:data.school_address,
								school_year:data.school_year,
								degree:data.degree,
								honors:data.honors,
								major:data.major,
								minor:data.minor
							};
						}
					}


					function save()
					{
						vm.loader   	= true;
						if(status == 0)
						{
							api.employeeDetails.employeeEducation.save(vm.details,success);
						}
						else
						{
							api.employeeDetails.employeeEducation.update(vm.details,success);
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
(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeContactController',EmployeeContactController);

			/** @ngInject */
			function EmployeeContactController($rootScope,api,$stateParams,toaster,LoaderService)
			{
				var vm = this;
					vm.contact = {
						employee_id: $stateParams.id,
						present_address:'',
						provincial_address:'',
						cel_no:'',
						tel_no:''
					};


					vm.loadContact = loadContact;
					vm.save		   = save;




					function loadContact()
					{
						LoaderService.loader();
						var datastring = {employee_id:vm.contact.employee_id,project_id:$rootScope.selectedProject.project_id};
						api.employeeDetails.employeeContact.get(datastring,success);
						function success(r)
						{
							if(r.status == 200)
							{
								var contact = r.data[0];
								vm.contact = {
									employee_id: $stateParams.id,
									present_address:contact.present_address,
									provincial_address:contact.provincial_address,
									cel_no:contact.cel_no,
									tel_no:contact.tel_no
								};
							}
							else
							{
								toaster.pop('info','Not Found.','No result(s) found.');
							}
							LoaderService.hide();
						}
					}

					function save()
					{
						LoaderService.loader();
						api.employeeDetails.employeeContact.save(vm.contact,success);
						function success(r)
						{
							if(r.status == 200)
							{
								toaster.pop('success','Save Successfully.');
							}
							else
							{
								toaster.pop('error','Something went wrong in the server.');
							}
							LoaderService.hide();
						}
					}
			}
})();
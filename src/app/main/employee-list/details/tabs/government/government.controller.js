(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeGovernmentController',EmployeeGovernmentController);

			/** @ngInject */
			function EmployeeGovernmentController ($rootScope,api,$stateParams,toaster,LoaderService)
			{
				var vm = this;
					vm.government = {
						employee_id: $stateParams.id,
						tin:'',
						sss:'',
						pag_ibig:'',
						philhealth:''
					};


					vm.loadGovernment = loadGovernment;
					vm.save		   = save;




					function loadGovernment()
					{
						LoaderService.loader();
						var datastring = {employee_id:vm.government.employee_id,project_id:$rootScope.selectedProject.project_id};
						api.employeeDetails.employeeGovernment.get(datastring,success);
						function success(r)
						{
							if(r.status == 200)
							{
								var government = r.data[0];
								vm.government = {
									employee_id: $stateParams.id,
									tin:government.tin,
									sss:government.sss,
									pag_ibig:government.pag_ibig,
									philhealth:government.philhealth
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
						api.employeeDetails.employeeGovernment.save(vm.government,success);
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
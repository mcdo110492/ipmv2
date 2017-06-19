(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeEmploymentController',EmployeeEmploymentController);

			/** @ngInject */
			function EmployeeEmploymentController($rootScope,api,$stateParams,toaster,LoaderService)
			{
				var vm = this;
					vm.position = [];
					vm.employmentStatus = [];
					vm.employeeStatus = [];
					vm.employment = {
						employee_id: $stateParams.id,
						position_id:'',
						date_employed:'',
						date_retired:'',
						employee_status_id:'',
						employment_status_id:'',
						salary:'',
						remarks:''
					};


					vm.loadEmployment = loadEmployment;
					vm.save		   = save;

					init();
					function init()
					{
						loadPosition();
						loadEmploymentStatus();
						loadEmployeeStatus();
					}

					function loadPosition()
					{
						api.position.positionAll.get(success);
						function success(r)
						{
							vm.position = r.data;
						}
					}

					function loadEmploymentStatus()
					{
						api.employmentStatus.employmentStatusAll.get(success);
						function success(r)
						{
							vm.employmentStatus = r.data;
						}
					}

					function loadEmployeeStatus()
					{
						api.employeeStatus.employeeStatusAll.get(success);
						function success(r)
						{
							vm.employeeStatus = r.data;
						}
					}



					function loadEmployment()
					{
						LoaderService.loader();
						var datastring = {employee_id:vm.employment.employee_id,project_id:$rootScope.selectedProject.project_id};
						api.employeeDetails.employeeEmployment.get(datastring,success);
						function success(r)
						{
							if(r.status == 200)
							{
								var employment = r.data[0];
								vm.employment = {
									employee_id: $stateParams.id,
									position_id:employment.position_id,
									date_employed:new Date(employment.date_employed),
									date_retired:new Date(employment.date_retired),
									employee_status_id:employment.employee_status_id,
									employment_status_id:employment.employment_status_id,
									salary:Number(employment.salary),
									remarks:employment.remarks
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
						api.employeeDetails.employeeEmployment.save(vm.employment,success);
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
(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeEducationController',EmployeeEducationController);

			/** @ngInject */
			function EmployeeEducationController ($rootScope,api,$stateParams,toaster,LoaderService,ModalConfig)
			{
				var vm = this;
					vm.lists = [];

					vm.loadEducation = loadEducation;
					vm.openDialog	 = openDialog;
					vm.updateDialog	 = updateDialog;
					function loadEducation ()
					{
						LoaderService.loader();
						var datastring = {project_id:$rootScope.selectedProject.project_id,employee_id:$stateParams.id};
						vm.promise = api.employeeDetails.employeeEducation.get(datastring,success).$promise;
						function success(r)
						{
							vm.lists = r;
							LoaderService.hide();
						}
					}

					function openDialog(ev)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/education/dialog/education-dialog.html';
						var ctrl 	= 'EducationDialogController';
						var ctrlAs	= 'edcvm';
						var local	= {status:0,data:{employee_id:$stateParams.id}};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadEducation);
					}

					function updateDialog(ev,datas)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/education/dialog/education-dialog.html';
						var ctrl 	= 'EducationDialogController';
						var ctrlAs	= 'edcvm';
						var local	= {status:1,data:datas};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadEducation);
					}
			}
})();
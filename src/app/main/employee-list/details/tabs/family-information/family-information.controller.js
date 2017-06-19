(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeFamilyController',EmployeeFamilyController);

			/** @ngInject */
			function EmployeeFamilyController($rootScope,api,$stateParams,toaster,LoaderService,ModalConfig)
			{
				var vm = this;
					vm.lists = [];

					vm.loadFamily 	 = loadFamily;
					vm.openDialog	 = openDialog;
					vm.updateDialog	 = updateDialog;
					function loadFamily ()
					{
						LoaderService.loader();
						var datastring = {project_id:$rootScope.selectedProject.project_id,employee_id:$stateParams.id};
						vm.promise = api.employeeDetails.employeeFamily.get(datastring,success).$promise;
						function success(r)
						{
							vm.lists = r;
							LoaderService.hide();
						}
					}

					function openDialog(ev)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/family-information/dialog/family-information-dialog.html';
						var ctrl 	= 'FamilyDialogController';
						var ctrlAs	= 'edcvm';
						var local	= {status:0,data:{employee_id:$stateParams.id}};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadFamily);
					}

					function updateDialog(ev,datas)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/family-information/dialog/family-information-dialog.html';
						var ctrl 	= 'FamilyDialogController';
						var ctrlAs	= 'edcvm';
						var local	= {status:1,data:datas};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadFamily);
					}
			}
})();
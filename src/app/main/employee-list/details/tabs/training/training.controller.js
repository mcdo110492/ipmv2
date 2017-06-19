(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeTrainingController',EmployeeTrainingController);

			/** @ngInject */
			function EmployeeTrainingController($rootScope,api,$stateParams,toaster,LoaderService,ModalConfig)
			{
				var vm = this;
					vm.lists = [];

					vm.loadTraining 	 = loadTraining;
					vm.openDialog	 	 = openDialog;
					vm.updateDialog	 	 = updateDialog;
					function loadTraining ()
					{
						LoaderService.loader();
						var datastring = {project_id:$rootScope.selectedProject.project_id,employee_id:$stateParams.id};
						vm.promise = api.employeeDetails.employeeTraining.get(datastring,success).$promise;
						function success(r)
						{
							vm.lists = r;
							LoaderService.hide();
						}
					}

					function openDialog(ev)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/training/dialog/training-dialog.html';
						var ctrl 	= 'TrainingDialogController';
						var ctrlAs	= 'edcvm';
						var local	= {status:0,data:{employee_id:$stateParams.id}};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadTraining);
					}

					function updateDialog(ev,datas)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/training/dialog/training-dialog.html';
						var ctrl 	= 'TrainingDialogController';
						var ctrlAs	= 'edcvm';
						var local	= {status:1,data:datas};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadTraining);
					}
			}
})();	
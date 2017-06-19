(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeClubsController',EmployeeClubsController);

			/** @ngInject */
			function EmployeeClubsController ($rootScope,api,$stateParams,toaster,LoaderService,ModalConfig)
			{
				var vm = this;
					vm.lists = [];

					vm.loadClub 	 	 = loadClub;
					vm.openDialog	 	 = openDialog;
					vm.updateDialog	 	 = updateDialog;
					function loadClub ()
					{
						LoaderService.loader();
						var datastring = {project_id:$rootScope.selectedProject.project_id,employee_id:$stateParams.id};
						vm.promise = api.employeeDetails.employeeClub.get(datastring,success).$promise;
						function success(r)
						{
							vm.lists = r;
							LoaderService.hide();
						}
					}

					function openDialog(ev)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/clubs/dialog/clubs-dialog.html';
						var ctrl 	= 'ClubsDialogController';
						var ctrlAs	= 'edcvm';
						var local	= {status:0,data:{employee_id:$stateParams.id}};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadClub);
					}

					function updateDialog(ev,datas)
					{
						var tempUrl = 'app/main/employee-list/details/tabs/clubs/dialog/clubs-dialog.html';
						var ctrl 	= 'ClubsDialogController';
						var ctrlAs	= 'edcvm';
						var local	= {status:1,data:datas};
						ModalConfig.customModal(tempUrl,ev,local,ctrl,ctrlAs).then(vm.loadClub);
					}
			}
})();
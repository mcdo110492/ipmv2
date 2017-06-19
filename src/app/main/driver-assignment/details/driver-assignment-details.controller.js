(function () {
	'use strict';
		angular
			.module('app.driver-assignment')
			.controller('DriverAssignmentDetailsController',DriverAssignmentDetailsController);

			/** @ngInject */
			function DriverAssignmentDetailsController($rootScope,api,$stateParams,$state,toaster,LoaderService,ProfilePic,$timeout)
			{
				var vm = this;
					vm.details = {
						employee_id: $stateParams.id,
						employee_no: '',
						lastname:'',
						firstname:'',
						middlename:'',
						image:'',
						driver_id:'',
						equipment_id:'',
						project_id:$rootScope.selectedProject.project_id
					};
					vm.palerosDetails = {
						paleros:[],
						driver_id:''
					};
					vm.equipments = [];
					vm.paleros = [];
					vm.palerosSelect = [];
					vm.photoPath = ProfilePic;
					vm.save = save;
					vm.loadPaleros = loadPaleros;
					vm.loadPalerosSelect = loadPalerosSelect;
					vm.savePaleros = savePaleros;


				init();
				function init()
				{
					LoaderService.loader();
					var datastring = {employee_id:vm.details.employee_id,project_id:$rootScope.selectedProject.project_id};
					api.driverAssignment.driverAssignmentDetails.get(datastring,success);
					function success(r)
					{
						if(r.status == 200)
						{
							var info = r.data[0];
								vm.details = {
									employee_id: info.employee_id,
									employee_no: info.employee_no,
									lastname:info.lastname,
									firstname:info.firstname,
									middlename:info.middlename,
									image:info.profile_pic,
									driver_id:info.driver_id,
									equipment_id:info.equipment_id,
									project_id:$rootScope.selectedProject.project_id
								};

								vm.palerosDetails.driver_id = info.driver_id;
						}
						else
						{
							toaster.pop('info','Not Found.','No result(s) found.');
							$state.go('app.driver-assignment');
						}
						LoaderService.hide();
						
					}
				}

				function save()
				{
					if(vm.details.driver_id == null)
					{
						api.driverAssignment.driverAssignmentDetails.save(vm.details,success);
					}
					else
					{
						api.driverAssignment.driverAssignmentDetails.update(vm.details,success);
					}
					function success(r)
					{
						if(r.status == 200)
						{
							toaster.pop('success','Save Successfully.');
							init();
							
						}
						else
						{
							toaster.pop('error','Something went wrong in the server.');
							
						}

					}
				}

				loadEquipment();
				function loadEquipment()
				{
					var datastring = {project_id:$rootScope.selectedProject.project_id};
					api.equipment.equipmentAll.get(datastring,success);
					function success(r)
					{
						vm.equipments = r.data;
					}
				}
				

				function loadPaleros()
				{
					LoaderService.loader();
					var datastring = {driver_id:vm.details.driver_id};
					api.driverAssignment.driverAssignmentPaleros.get(datastring,success);
					function success(r)
					{
						
						vm.paleros = r;

						LoaderService.hide();
					}
				}

				function loadPalerosSelect()
				{
					var datastring = {project_id:$rootScope.selectedProject.project_id};
					api.driverAssignment.getPaleros.get(datastring,success);
					function success(r)
					{
						
						vm.palerosSelect = r.data;

					}
				}


				function savePaleros()
				{
					api.driverAssignment.driverAssignmentPaleros.save(vm.palerosDetails,success);
					function success(r)
					{
						if(r.status == 200)
						{
							toaster.pop('success','Save Successfully.');
							vm.palerosDetails.paleros = [];
							loadPaleros();
						}
						else
						{
							toaster.pop('error','Something went wrong in the server.');
						}
					}
				}


								



			}
})();
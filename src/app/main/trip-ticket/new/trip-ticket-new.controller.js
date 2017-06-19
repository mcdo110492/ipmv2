(function () {
	'use strict';
		angular
			.module('app.trip-ticket')
			.controller('TripTicketNewController',TripTicketNewController);

			/** @ngInject */
			function TripTicketNewController(api,$rootScope,LoaderService,toaster)
			{
				var vm = this,
					dateNow = new Date();
					vm.currentDate = dateNow;
					vm.urlPath = api.baseUrl+'tripTicket/check';
					vm.data = {
						trip_ticket_no:'',
						dispatch_date:dateNow,
						dispatch_time:dateNow,
						trip_lunchbox_id:'',
						equipment_id:'',
						driver_id:'',
						paleros:[],
						striker:[],
						dispatch_exact_time:'',
						project_id:$rootScope.selectedProject.project_id
					};
					vm.lunchbox = [];
					vm.shift = [];
					vm.equipment = [];
					vm.driver = [];
					vm.paleros = [];
					vm.striker = [];
					vm.loadLunchBox = loadLunchBox;
					vm.loadShift = loadShift;
					vm.loadStriker = loadStriker;
					vm.getShiftInformation = getShiftInformation;
					vm.save = save;


					function loadLunchBox()
					{
						var datastring = {project_id:$rootScope.selectedProject.project_id,employee_id:vm.data.driver_id};
						api.tripTicket.lunchbox.get(datastring,success);
						function success(r)
						{
							vm.lunchbox = r.data;
						}
					}

					function loadShift()
					{
						var datastring = {project_id:$rootScope.selectedProject.project_id};
						api.tripTicket.shift.get(datastring,success);
						function success(r)
						{
							vm.shift = r.data;
						}
					}
					init();
					function init()
					{
						loadEquipment();
						loadDriver();
						loadPaleros();
					}

					
					function loadEquipment()
					{
						var datastring = {project_id:$rootScope.selectedProject.project_id};
						api.tripTicket.equipment.get(datastring,success);
						function success(r)
						{
							vm.equipment = r.data;
						}
					}

					
					function loadDriver()
					{
						var datastring = {project_id:$rootScope.selectedProject.project_id};
						api.tripTicket.driver.get(datastring,success);
						function success(r)
						{
							vm.driver = r.data;
						}
					}

					
					function loadPaleros()
					{
						var datastring = {project_id:$rootScope.selectedProject.project_id};
						api.tripTicket.paleros.get(datastring,success);
						function success(r)
						{
							vm.paleros = r.data;
						}
					}

					function loadStriker()
					{
						var datastring = {project_id:$rootScope.selectedProject.project_id};
						api.tripTicket.striker.get(datastring,success);
						function success(r)
						{
							vm.striker = r.data;
						}
					}


					function getShiftInformation(id)
					{
						LoaderService.loader();
						var datastring = {shift_id:id,project_id:$rootScope.selectedProject.project_id};
						api.tripTicket.shift.save(datastring,success);
						function success(r)
						{
							if(r.status == 200)
							{
								vm.data.equipment_id = r.data.equipment_id;
								vm.data.driver_id = r.data.driver_id;
								vm.data.paleros = r.data.paleros;
							}
							LoaderService.hide();
						}
					}


					function save()
					{
						LoaderService.loader();
						vm.data.dispatch_exact_time = moment(vm.data.dispatch_time).format('YYYY-M-D H:mm:ss');
						api.tripTicket.tripTicket.save(vm.data,success);
						function success(r)
						{
							if(r.status == 200)
							{
								toaster.pop('success','Trip Ticket Created Successfully.');
								vm.data = {
									trip_ticket_no:'',
									dispatch_date:dateNow,
									dispatch_time:dateNow,
									lunchbox_id:'',
									equipment_id:'',
									driver_id:'',
									paleros:[],
									striker:[],
									dispatch_exact_time:'',
									project_id:$rootScope.selectedProject.project_id
								};
								init();
							}
							else
							{
								toaster.pop('error','Something Went Wrong in the server.');
							}

							LoaderService.hide();
						}
					}
			}
})();
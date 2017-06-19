(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('ClubsDialogController',ClubsDialogController);

			/** @ngInject */
			function ClubsDialogController(ModalConfig,data,status,toaster,api)
			{
				var vm = this;
					vm.loader   	= false;
					vm.save 		= save;	
					vm.closeDialog	= closeDialog;
					vm.details 		= {
								employee_club_id:'',
								employee_id:data.employee_id,
								club_name:'',
								club_position:'',
								club_membership: ''
					};

					init();
					function init()
					{
						if(status == 1)
						{
							vm.details 		= {
								employee_club_id:data.employee_club_id,
								employee_id:data.employee_id,
								club_name:data.club_name,
								club_position:data.club_position,
								club_membership: data.club_membership
							};
						}
					}


					function save()
					{
						vm.loader   	= true;
						if(status == 0)
						{
							api.employeeDetails.employeeClub.save(vm.details,success);
						}
						else
						{
							api.employeeDetails.employeeClub.update(vm.details,success);
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
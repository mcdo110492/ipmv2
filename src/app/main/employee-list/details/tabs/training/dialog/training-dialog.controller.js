(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('TrainingDialogController',TrainingDialogController);

			/** @ngInject */
			function TrainingDialogController(ModalConfig,data,status,toaster,api)
			{
				var vm = this;
					vm.loader   	= false;
					vm.save 		= save;	
					vm.closeDialog	= closeDialog;
					vm.details 		= {
								employee_training_seminar_id:'',
								employee_id:data.employee_id,
								training_nature:'',
								training_title:'',
								training_period_from: new Date(),
								training_period_to: new Date()
					};

					init();
					function init()
					{
						if(status == 1)
						{
							vm.details 		= {
								employee_training_seminar_id:data.employee_training_seminar_id,
								employee_id:data.employee_id,
								training_nature:data.training_nature,
								training_title:data.training_title,
								training_period_from: new Date(data.training_period_from),
								training_period_to: new Date(data.training_period_to)
							};
						}
					}


					function save()
					{
						vm.loader   	= false;
						if(status == 0)
						{
							api.employeeDetails.employeeTraining.save(vm.details,success);
						}
						else
						{
							api.employeeDetails.employeeTraining.update(vm.details,success);
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
							vm.loader   	= true;
						}	
					}

					function closeDialog()
					{
						ModalConfig.cancelModal();
					}
			}
})();
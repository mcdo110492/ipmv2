(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeAccountController',EmployeeAccountController);

			/** @ngInject */
			function EmployeeAccountController($stateParams,toaster,LoaderService,api,ModalConfig,$timeout)
			{
				var vm = this;
					vm.account = {
						user_id:'',
						username:'',
						status:''
					};

					vm.loadAccount = loadAccount;
					vm.openConfirm = openConfirm;
					vm.changeStatus = changeStatus;

					function loadAccount()
					{
						var datastring = {employee_id:$stateParams.id};
						api.employeeDetails.employeeAccount.get(datastring,success);
						function success(r)
						{
							var account = r.data[0];
							vm.account = {
								user_id: account.user_id,
								username: account.username,
								status:account.status
							};
						}
					}

					function openConfirm(ev)
					{
						var title = 'Password Reset',
							content = 'Would you like to reset this account password? The reset password of this account will be the Username.';
						ModalConfig.confirmModal(title,content,ev).then(yes);
						function yes()
						{
							$timeout(function (){
								LoaderService.loader();
								api.employeeDetails.employeeAccount.save(vm.account,success);
								function success(r)
								{
									if(r.status == 200)
									{
										toaster.pop('success','Password Reset Successfully.');
									}
									else
									{
										toaster.pop('error','Something went wrong.');
									}
									LoaderService.hide();
								}
							},0);
						}
					}


					function changeStatus(stat)
					{
						LoaderService.loader();
						var datastring = {user_id:vm.account.user_id,status:stat};
						api.employeeDetails.employeeAccount.update(datastring,success);
						function success(r)
						{
							if(r.status == 200)
							{
								toaster.pop('success','Account Status has been changed.');
								vm.account.status = stat;
							}
							else
							{
								toaster.pop('error','Something went wrong.');
							}
							LoaderService.hide();
						}
					}
			}
})();
(function () {
	'use strict';
		angular
			.module('fuse')
			.factory('Interceptor',Interceptor)
			.factory('LoaderService',LoaderService)
			.factory('ModalConfig',ModalConfig);


			/** @ngInject */
			function Interceptor ($q,$location,toaster,$injector)
			{
				return{
					'request': request,
					'responseError': responseError
				};


				function request (config)
				{
					var token = localStorage.presence;
						config.headers = config.headers || {};
						if(token)
						{
							config.headers.Authorization = 'Bearer '+ token;
						}

						return config;
				}



				function responseError (rejection)
				{
					var status = rejection.status,
					 	LoaderService = $injector.get('LoaderService');
					if(status == 500)
					{
						
						toaster.pop('error','Something Went Wrong in the server.');
					}
					else if(status == 400)
					{
						LoaderService.hide();
						localStorage.removeItem('profileName');
			            localStorage.removeItem('profilePicture');
			            localStorage.removeItem('presence');
			            localStorage.removeItem('userType');
						$location.url('/');
					}
					else if(status == 403)
					{
						
						LoaderService.restricted();

					}
					else if(status == 422)
					{
						toaster.pop('warning','Data cannot be processed.');
					}
					else if(status == 408 || status == 599)
					{
						toaster.pop('error','Server is not responding.','Please check your internet connection.');
					}


					return $q.reject(status);

				}
			}

			/** @ngInject */
			function LoaderService($mdDialog)
			{
				var service = [];
					service.loader = loader;
					service.restricted = restricted;
					service.isProject = isProject;
					service.hide = hide;
					return service;

					function loader()
					{
						return $mdDialog.show({
									template:'<md-dialog flex="33" aria-label="Loader Dialog"><md-dialog-content><div layout="row" layout-align="center center" aria-label="Loader Progress">'+
											 '<md-progress-circular class="md-accent" md-mode="indeterminate"></md-progress-circular>'+
											 '</div></md-dialog-content></md-dialog>',
									clickOutsideToClose: false,
									escapeToClose: true
						});
	
					}

					function restricted()
					{
						return $mdDialog.show({
									template:'<md-dialog flex="33" aria-label="Loader Dialog"><md-dialog-content><div layout="row" layout-align="center center" aria-label="Loader Progress">'+
											 '<img ng-src="assets/images/etc/restricted.gif">'+
											 '<audio style="display:none" controls autoplay loop><source src="assets/sounds/alarm.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>'+
											 '</div></md-dialog-content></md-dialog>',
									clickOutsideToClose: false,
									escapeToClose: true
						});
					}

					function isProject()
					{
						return $mdDialog.show({
									template:'<md-dialog flex="33" aria-label="Loader Dialog"><md-dialog-content><div layout="row" layout-align="center center" aria-label="Loader Progress">'+
											 '<strong>Please Select a Project First. On the upper left of the navigation.</strong>'+
											 '</div></md-dialog-content></md-dialog>',
									clickOutsideToClose: true,
									escapeToClose: true
						});
	
					}

					function hide()
					{
						return $mdDialog.hide();
					}
			}



			/** @ngInject */
			function ModalConfig($mdDialog)
			{
				var config = [];
					config.customModal = customModal;
					config.confirmModal = confirmModal;
					config.cancelModal = cancelModal;
					config.closeModal = closeModal;
					return config;

					
				

					function customModal(tempUrl,ev,localData,ctrl,ctrlAs)
					{
						return $mdDialog.show({
								parent: 		angular.element(document.body),
								templateUrl: 	tempUrl,
								controller: 	ctrl,
								controllerAs: 	ctrlAs,
								targetEvent: 	ev,
								locals: 		localData
								});
					}

					function confirmModal(title,content,ev)
					{
						var confirm = $mdDialog.confirm({
				                    onComplete: function afterShowAnimation() {
				                        var $dialog = angular.element(document.querySelector('md-dialog'));
				                        var $actionsSection = $dialog.find('md-dialog-actions');
				                        var $cancelButton = $actionsSection.children()[0];
				                        var $confirmButton = $actionsSection.children()[1];
				                        angular.element($confirmButton).addClass('md-raised md-accent');
				                        angular.element($cancelButton).addClass('md-raised md-warn');
				                    }
				                })
					          .title(title)
					          .textContent(content)
					          .ariaLabel('Confirm Modal Dialog')
					          .targetEvent(ev)
					          .ok('Yes')
					          .cancel('No');
					        return $mdDialog.show(confirm);
					}

					

					function cancelModal()
					{
						return $mdDialog.cancel();
					}

					function closeModal ()
					{
						return $mdDialog.hide();
					}
			}



})();
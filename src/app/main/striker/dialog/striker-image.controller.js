(function () {
	'use strict';
		angular
			.module('app.striker')
			.controller('StrikerImageDialogController',StrikerImageDialogController);

			/** @ngInject */
			function StrikerImageDialogController(ModalConfig,data,toaster,api,FileUploader,$timeout)
			{
				var vm = this;
					vm.closeDialog	= closeDialog;
					vm.openUpload   = openUpload;
					vm.data = {
						striker_id: data.striker_id
					};

					function closeDialog()
					{
						ModalConfig.cancelModal();
					}
					function openUpload()
					{
						$timeout(function(){
							angular.element('#file-input').trigger('click');
						},0);
					}

					var uploader = vm.uploader = new FileUploader({
			            url: api.baseUrl+'striker/strikerImageUpload',
			            alias:'userfile',
			            queueLimit: 1,
			            headers:{
			            	'Authorization':'Bearer '+localStorage.presence
			            },
			            method:'POST'
			        });

			        uploader.filters.push({
			            name: 'imageFilter',
			            fn: function(item /*{File|FileLikeObject}*/, options) {
			                var type = '|' + item.name.slice(item.name.lastIndexOf('.')+ 1) + '|';
			                return '|jpeg|jpg|'.indexOf(type) !== -1;

			            }
			        });

			        uploader.filters.push({
			            name: 'sizeFilter',
			            fn: function(item /*{File|FileLikeObject}*/, options) {
			                return item.size <= 5485760;
			            }
			        });

			        // CALLBACKS

			        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
			            toaster.pop('warning',"There's an error when trying to add image. Please Check the requirements again.");
			            
			            
			        };
			        uploader.onBeforeUploadItem = function(item) {
			        	item.formData.push(vm.data);
			        
			        };
			        uploader.onSuccessItem = function(fileItem, response, status, headers) {
			 
			        	if(response.status == 200)
			        	{
			        		toaster.pop('success','Image Upload Success.');
			       			
			        	}
			        	else
			        	{
			        		toaster.pop('error','Error','Something went wrong.');
			        	}

			        	ModalConfig.closeModal();
			            
			            
			        };
			        uploader.onErrorItem = function(fileItem, response, status, headers) {
			        	toaster.pop('error','Error','Something went wrong.');
			            
			        };
			}
})();
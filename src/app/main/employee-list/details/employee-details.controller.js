(function () {
	'use strict';
		angular
			.module('app.employee-list')
			.controller('EmployeeDetailsController',EmployeeDetailsController);

			/** @ngInject */
			function EmployeeDetailsController($rootScope,api,$stateParams,$state,toaster,LoaderService,FileUploader,$timeout,ProfilePic)
			{
				var vm = this;
					vm.photoPath = ProfilePic;
					vm.personal = {
						employee_id: $stateParams.id,
						employee_no:'',
						firstname:'',
						middlename:'',
						lastname:'',
						dob:'',
						pob:'',
						height:'',
						weight:'',
						blood:'',
						distinguishing_mark:'',
						civil_status:'',
						citizenship:'',
						religion:'',
						image:'default.jpg'
					};
					vm.data = {
						user_id:''
					};		

					vm.save = save;
					vm.openUpload = openUpload;

				init();
				function init()
				{
					LoaderService.loader();
					var datastring = {employee_id:vm.personal.employee_id,project_id:$rootScope.selectedProject.project_id};
					api.employeeDetails.employeeDetails.get(datastring,success);
					function success(r)
					{
						if(r.status == 200)
						{
							var info = r.data[0];
							vm.personal = {
								employee_id: $stateParams.id,
								employee_no:info.employee_no,
								firstname:info.firstname,
								middlename:info.middlename,
								lastname:info.lastname,
								dob: new Date(info.dob),
								pob:info.pob,
								height:info.height,
								weight:info.weight,
								blood:info.blood,
								distinguishing_mark:info.distinguishing_mark,
								civil_status:info.civil_status,
								citizenship:info.citizenship,
								religion:info.religion,
								image:info.profile_pic
							};

							vm.data = {
								user_id:info.user_id
							};	

						}
						else
						{
							toaster.pop('info','Not Found.','No result(s) found.');
							$state.go('app.employee-list');
						}
						LoaderService.hide();
						
					}
				}

				function save()
				{
					LoaderService.loader();
					api.employeeDetails.employeeDetails.save(vm.personal,success);
					function success(r)
					{
						if(r.status == 200)
						{
							toaster.pop('success','Save Successfully.');
						}
						else
						{
							toaster.pop('error','Something went wrong in the server.');
						}
						LoaderService.hide();
					}
				}

				function openUpload()
				{
					$timeout(function(){
						angular.element('#file-input1').trigger('click');
					},0);
				}


								


					var uploader = vm.uploader = new FileUploader({
			            url: api.baseUrl+'employeeDetails/employeeImageUpload',
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
			        		init();
			       			
			        	}
			        	else
			        	{
			        		toaster.pop('error','Error','Something went wrong.');
			        	}

			        	
			            
			            
			        };
			        uploader.onErrorItem = function(fileItem, response, status, headers) {
			        	toaster.pop('error','Error','Something went wrong.');
			            
			        };


			}
})();
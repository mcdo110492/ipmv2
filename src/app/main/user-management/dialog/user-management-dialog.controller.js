(function ()
{
    'use strict';

    angular
        .module('app.user-management')
        .controller('UserManagementDialogController',UserManagementDialogController);

    /** @ngInject */
    function UserManagementDialogController($rootScope,api,ModalConfig,toaster)
    {
        var vm          =   this;
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'user/check';
            vm.role     = [];
            vm.save     = save;
            vm.closeDialog = closeDialog;
            vm.loadRole = loadRole;
            vm.details = {
                username:'',
                role:'',
                profile_name:'',
                project_id:$rootScope.selectedProject.project_id
            };

            function save()
            {
                vm.loader   =   true;

                api.user.user.save(vm.details,success);
                function success(r)
                {
                    if(r.status == 200)
                    {
                        toaster.pop('success','Success','Data has been save successfully.');
                        ModalConfig.closeModal();
                    }
                    else if(r.status == 500)
                    {
                        toaster.pop('error','Error','Something went wrong.');
                    }
                    else
                    {
                        toaster.pop('warning','Warning',"There' s an error while saving your data. Please check again.");
                    }
                    vm.loader   =   false;
                }
            }


            function loadRole()
            {
                api.user.role.get(success);
                function success(r)
                {
                    vm.role = r.data;
                }
            }


            function closeDialog()
            {
                ModalConfig.cancelModal();
            }

           
        
    }
})();
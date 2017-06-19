(function ()
{
    'use strict';

    angular
        .module('app.striker')
        .controller('StrikerDialogController',StrikerDialogController);

    /** @ngInject */
    function StrikerDialogController(api,ModalConfig,toaster,$rootScope,index,data)
    {
        var vm          =   this;
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'striker/check';
            vm.statusIndex = index;
            vm.details = {
                        striker_id:'',
                        striker_no:'',
                        striker_fname:'',
                        striker_mname:'',
                        striker_lname:'',
                        striker_dob: new Date(),
                        striker_date_employed: new Date(),
                        project_id:$rootScope.selectedProject.project_id
            };
            vm.save     = save;
            vm.closeDialog = closeDialog;
            init();
            function init()
            {
                if(index == 1)
                {
                    vm.details = {
                        striker_id:data.striker_id,
                        striker_no:data.striker_no,
                        striker_number:data.striker_no,
                        striker_fname:data.striker_fname,
                        striker_mname:data.striker_mname,
                        striker_lname:data.striker_lname,
                        striker_dob:new Date(data.striker_dob),
                        striker_date_employed:new Date(data.striker_date_employed),
                        project_id:data.project_id
                    };
                }
            }

            function save()
            {
                vm.loader   =   true;
                if(index == 1)
                {
                    api.striker.striker.update(vm.details,success);
                }
                else
                {
                    api.striker.striker.save(vm.details,success);
                }
                
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


        
            function closeDialog()
            {
                ModalConfig.cancelModal();
            }

           
        
    }
})();
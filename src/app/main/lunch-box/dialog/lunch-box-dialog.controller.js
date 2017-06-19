(function ()
{
    'use strict';

    angular
        .module('app.lunch-box')
        .controller('LunchBoxDialogController',LunchBoxDialogController);

    /** @ngInject */
    function LunchBoxDialogController(api,ModalConfig,toaster,$rootScope)
    {
        var vm          =   this;
            vm.details  = {
                        lunchbox:'',
                        project_id:$rootScope.selectedProject.project_id,
                        gadgets : []
            };
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'lunchbox/check';
            vm.gadgets = [];
            vm.save     = save;
            vm.closeDialog = closeDialog;
            vm.loadGadgets = loadGadgets;


            function save()
            {
                vm.loader   =   true;
                api.lunchbox.lunchbox.save(vm.details,success);
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

            function loadGadgets()
            {
                var datastring = {project_id:$rootScope.selectedProject.project_id};
                api.lunchbox.gadgetsAll.get(datastring,success);
                function success(r)
                {
                    vm.gadgets = r.data;
                }
            }

           
        
    }
})();
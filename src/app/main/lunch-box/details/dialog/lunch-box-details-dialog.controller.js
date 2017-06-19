(function ()
{
    'use strict';

    angular
        .module('app.lunch-box')
        .controller('LunchBoxDetailsDialogController',LunchBoxDetailsDialogController);

    /** @ngInject */
    function LunchBoxDetailsDialogController(api,ModalConfig,toaster,$rootScope,$stateParams)
    {
        var vm          =   this;
            vm.details  = {
                        lunchbox_id:$stateParams.id,
                        project_id:$rootScope.selectedProject.project_id,
                        gadgets : []
            };
            vm.loader   =   false;
            vm.gadgets = [];
            vm.save     = save;
            vm.closeDialog = closeDialog;
            vm.loadGadgets = loadGadgets;


            function save()
            {
                vm.loader   =   true;
                api.lunchbox.lunchboxGadgets.save(vm.details,success);
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
                var datastring = {project_id:$rootScope.selectedProject.project_id,lunchbox_id:vm.details.lunchbox_id};
                api.lunchbox.gadgetsAll.get(datastring,success);
                function success(r)
                {
                    vm.gadgets = r.data;
                }
            }

           
        
    }
})();
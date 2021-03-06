(function ()
{
    'use strict';

    angular
        .module('app.gadget')
        .controller('GadgetDialogController',GadgetDialogController);

    /** @ngInject */
    function GadgetDialogController(api,ModalConfig,toaster,$rootScope)
    {
        var vm          =   this;
            vm.details  = {
                        gadget_type_id:'',
                        gadget_code:'',
                        gadget_model:'',
                        project_id:$rootScope.selectedProject.project_id
            };
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'gadget/check';
            vm.gadgetType = [];
            vm.save     = save;
            vm.closeDialog = closeDialog;
            vm.loadGadgetType = loadGadgetType;


            function save()
            {
                vm.loader   =   true;
                api.gadget.gadget.save(vm.details,success);
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

            function loadGadgetType()
            {
                api.gadgetType.gadgetTypeAll.get(success);
                function success(r)
                {
                    vm.gadgetType = r.data;
                }
            }

           
        
    }
})();
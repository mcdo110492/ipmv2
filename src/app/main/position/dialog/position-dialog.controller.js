(function ()
{
    'use strict';

    angular
        .module('app.position')
        .controller('PositionDialogController',PositionDialogController);

    /** @ngInject */
    function PositionDialogController(api,ModalConfig,toaster)
    {
        var vm          =   this;
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'position/checkData';
            vm.save     = save;
            vm.closeDialog = closeDialog;



            function save(data)
            {
                vm.loader   =   true;
                api.position.position.save(data,success);
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
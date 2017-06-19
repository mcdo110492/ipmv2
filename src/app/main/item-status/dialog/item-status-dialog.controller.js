(function() {
'use strict';

    angular
        .module('app.item-status')
        .controller('ItemStatusDialogController', ItemStatusDialogController);

    /** @ngInject */
    function ItemStatusDialogController(api,ModalConfig,toaster) {
        var vm = this;
        

            vm.loader   =   false;
            vm.urlPath  =   api.baseUrlLaravel+'item/status/check';
            vm.save     =   save;
            vm.closeDialog = closeDialog;

            vm.details = {
                item_status:''
            };

            function save()
            {
                vm.loader   =   true;
                api.itemStatus.itemStatus.save(vm.details,success);
                function success(r)
                {
                    if(r.status == 200)
                    {
                        toaster.pop('success','Success','Data has been save successfully.');
                        ModalConfig.closeModal();
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
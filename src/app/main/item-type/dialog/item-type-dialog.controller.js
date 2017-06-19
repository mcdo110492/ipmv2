(function() {
'use strict';

    angular
        .module('app.item-type')
        .controller('ItemTypeDialogController', ItemTypeDialogController);

    /** @ngInject */
    function ItemTypeDialogController(api,ModalConfig,toaster) {
        var vm = this;
        

            vm.loader   =   false;
            vm.urlPath  =   api.baseUrlLaravel+'item/type/check';
            vm.save     =   save;
            vm.closeDialog = closeDialog;

            vm.details = {
                item_type:''
            };

            function save()
            {
                vm.loader   =   true;
                api.itemType.itemType.save(vm.details,success);
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
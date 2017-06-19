(function() {
'use strict';

    angular
        .module('app.item')
        .controller('ItemDialogController', ItemDialogController);

    /** @ngInject */
    function ItemDialogController(api,ModalConfig,toaster,data,index) {
        var vm = this;
        

            vm.loader   =   false;
            //vm.urlPath  =   api.baseUrlLaravel+'item/check';
            vm.save     =   save;
            vm.closeDialog = closeDialog;

            vm.details = {
                model:'',
                item_type_id:''
            };

            vm.item_type = [];

            activate();
            init();

            function init()
            {
                if(index==1)
                {
                    vm.details = {
                        id:data.item_id,
                        model:data.model,
                        item_type_id:data.item_type.item_type_id
                    };
                }
            }

            function activate()
            {
                api.itemType.itemType.show({id:'show'},success);

                function success(r)
                {
                    vm.item_type = r.data;
                }
            }

            function save()
            {
                vm.loader   =   true;
                if(index == 1)
                {
                     api.item.item.update(vm.details,success);
                }
                else
                {
                     api.item.item.save(vm.details,success);
                }
               
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
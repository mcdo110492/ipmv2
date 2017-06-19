(function() {
'use strict';

    angular
        .module('app.item-inventory')
        .controller('ItemInventoryDialogController', ItemInventoryDialogController);

    /** @ngInject */
    function ItemInventoryDialogController(api,ModalConfig,toaster,data,index,$rootScope) {
        var vm = this;
        

            vm.loader   =   false;
            vm.save     =   save;
            vm.closeDialog = closeDialog;

           vm.details = {
                id:'',
                item_id:'',
                project_id:$rootScope.selectedProject.project_id,
                item_status_id:1,
                date_inventory:new Date(),
                details: '',
                qty:1
            };

            vm.items = [];
            vm.item_status = [];

            activate();
            
            function activate ()
            {
                getItem();
                getItemStatus();
                init();
            }

            function init()
            {
                if(index==1)
                {
                    vm.details = {
                        id:data.item_inventory_id,
                        item_id:data.item_id,
                        project_id:data.project_id,
                        item_status_id:data.item_status_id,
                        date_inventory:new Date(data.date_inventory),
                        details: data.details,
                        qty: Number(data.qty)
                    };
                }
            }

            function getItem()
            {
                api.item.item.show({id:'show'},success);

                function success(r)
                {
                    vm.items = r.data;
                }
            }

            function getItemStatus()
            {
                api.itemStatus.itemStatus.show({id:'show'},success);

                function success(r)
                {
                    vm.item_status = r.data;
                }
            }

            function save()
            {
                vm.loader   =   true;
                if(index == 1)
                {
                     api.itemInventory.itemInventory.update(vm.details,success);
                }
                else
                {
                     api.itemInventory.itemInventory.save(vm.details,success);
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
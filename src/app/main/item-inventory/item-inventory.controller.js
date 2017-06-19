(function() {
'use strict';

    angular
        .module('app.item-inventory')
        .controller('ItemInventoryController', ItemInventoryController);

    /** @ngInject */
    function ItemInventoryController(api,ModalConfig,$q,$scope,toaster,$rootScope) {
        var vm = this,
            bookmark;

             vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'model',
                    project_id:$rootScope.selectedProject.project_id
                };

            vm.lists = [];
            vm.activate =   activate;
            vm.add      =   add;
            vm.edit     =   edit;

        

        function activate()
        {
            vm.promise = api.itemInventory.itemInventory.get(vm.query,success).$promise;

            function success(r)
            {
                vm.lists = r;
            }
        }

        function add(ev)
        {
            var tempUrl     = 'app/main/item-inventory/dialog/item-inventory-dialog.html',
                localData   = {data:null,index:0},
                ctrl        = 'ItemInventoryDialogController',
                ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.activate);
        }

        function edit(ev,datas)
        {
            var tempUrl     = 'app/main/item-inventory/dialog/item-inventory-dialog.html',
                localData   = {data:datas,index:1},
                ctrl        = 'ItemInventoryDialogController',
                ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.activate);
        }

      

        $scope.$watchCollection('vm.query.filter', function (newValue, oldValue) {
            if(!oldValue) {
                bookmark = vm.query.page;
            }
                    
            if(newValue !== oldValue) {
                vm.query.page = 1;
            }
                    
            if(!newValue) {
                vm.query.page = bookmark;
            }
                    
                activate();
        });
    }
})();
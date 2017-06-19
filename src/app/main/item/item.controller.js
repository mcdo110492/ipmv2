(function() {
'use strict';

    angular
        .module('app.item')
        .controller('ItemController', ItemController);

    /** @ngInject */
    function ItemController(api,ModalConfig,$q,$scope,toaster) {
        var vm = this,
            bookmark;

             vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'model'
                };

            vm.lists = [];
            vm.activate =   activate;
            vm.add      =   add;
            vm.edit     =   edit;

        

        function activate()
        {
            api.item.item.get(vm.query,success);

            function success(r)
            {
                vm.lists = r;
            }
        }

        function add(ev)
        {
            var tempUrl     = 'app/main/item/dialog/item-dialog.html',
                localData   = {data:null,index:0},
                ctrl        = 'ItemDialogController',
                ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.activate);
        }

        function edit(ev,datas)
        {
            var tempUrl     = 'app/main/item/dialog/item-dialog.html',
                localData   = {data:datas,index:1},
                ctrl        = 'ItemDialogController',
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
(function ()
{
    'use strict';

    angular
        .module('app.gadget-accountability')
        .controller('GadgetAccountabilityController',GadgetAccountabilityController);

    /** @ngInject */
    function GadgetAccountabilityController($rootScope,api,LoaderService,toaster,ModalConfig)
    {
        var bookmark;
        var vm      =   this;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:new Date(),
                    field:'lunchbox_date',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];
            vm.getLists = getLists;
            vm.add = add;
            vm.update = update;
            getLists();
            function getLists()
            {
                vm.promise = api.gadgetAccountability.gadgetAccountability.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }


            function add(ev)
            {
                var tempUrl     = 'app/main/gadget-accountability/dialog/gadget-accountability-dialog.html',
                    localData   = {data:null},
                    ctrl        = 'GadgetAccountabilityDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }


            function update(ev,datas)
            {
                var tempUrl     = 'app/main/gadget-accountability/dialog/gadget-status-dialog.html',
                    localData   = {data:datas},
                    ctrl        = 'GadgetAccountabilityStatusDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            


           
    
        
    }
})();
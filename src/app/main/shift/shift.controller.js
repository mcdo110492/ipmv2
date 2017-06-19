(function ()
{
    'use strict';

    angular
        .module('app.shift')
        .controller('ShiftController',ShiftController);

    /** @ngInject */
    function ShiftController($rootScope,$scope,api,ModalConfig,$q,toaster)
    {
        var bookmark;
        var vm      =   this;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'geofence_name',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];

            vm.getLists = getLists;
            vm.add      = add;
            vm.update   = update;
            function getLists()
            {
                vm.promise = api.shift.shift.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/shift/dialog/shift-dialog.html',
                    localData   = {indexstatus:0,data:null},
                    ctrl        = 'ShiftDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function update(ev,datas)
            {
                var tempUrl     = 'app/main/shift/dialog/shift-dialog.html',
                    localData   = {indexstatus:1,data:datas},
                    ctrl        = 'ShiftDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
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
                    
                getLists();
            });
        
    }
})();
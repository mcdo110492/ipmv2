(function ()
{
    'use strict';

    angular
        .module('app.lunch-box')
        .controller('LunchBoxController',LunchBoxController);

    /** @ngInject */
    function LunchBoxController($rootScope,$scope,api,ModalConfig)
    {
        var bookmark;
        var vm      =   this;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'lunchbox',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];
            vm.getLists = getLists;
            vm.add      = add;

            function getLists()
            {
                vm.promise = api.lunchbox.lunchbox.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/lunch-box/dialog/lunch-box-dialog.html',
                    localData   = {data:null},
                    ctrl        = 'LunchBoxDialogController',
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
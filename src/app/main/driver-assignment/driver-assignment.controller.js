(function ()
{
    'use strict';

    angular
        .module('app.driver-assignment')
        .controller('DriverAssignmentController',DriverAssignmentController);

    /** @ngInject */
    function DriverAssignmentController($rootScope,$scope,api,ModalConfig,toaster,ProfilePic)
    {
        var bookmark;
        var vm      =   this;
            vm.photoPath = ProfilePic;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'lastname',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];
            vm.gadgetType = [];
            vm.getLists = getLists;

            function getLists()
            {
                vm.promise = api.driverAssignment.driverAssignment.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
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
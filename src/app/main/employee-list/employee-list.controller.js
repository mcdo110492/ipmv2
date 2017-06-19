(function ()
{
    'use strict';

    angular
        .module('app.employee-list')
        .controller('EmployeeListController',EmployeeListController);

    /** @ngInject */
    function EmployeeListController($scope,api,ModalConfig,$q,toaster,$rootScope,ProfilePic)
    {
        var bookmark;
        var vm      =   this;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'lastname',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];
            vm.photoPath = ProfilePic;
            vm.getLists = getLists;
            vm.add      = add;
           
            

            function getLists()
            {
                vm.promise = api.employeeList.employeeList.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/employee-list/dialog/employee-list-dialog.html',
                    localData   = {data:null},
                    ctrl        = 'EmployeeListDialogController',
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
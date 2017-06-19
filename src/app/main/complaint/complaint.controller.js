(function ()
{
    'use strict';

    angular
        .module('app.complaint')
        .controller('ComplaintController',ComplaintController);

    /** @ngInject */
    function ComplaintController($scope,api,ModalConfig,$rootScope)
    {
        var bookmark;
        var vm      =   this;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'complaint_no',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];

            vm.getLists = getLists;
            vm.add      = add;
            vm.update   = update;
            vm.viewTripDetails = viewTripDetails;

            function getLists()
            {
                vm.promise = api.complaint.complaint.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/complaint/dialog/complaint-dialog.html',
                    localData   = {indexstatus:0,data:null},
                    ctrl        = 'ComplaintDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function update(ev,datas)
            {
                var tempUrl     = 'app/main/complaint/dialog/complaint-dialog.html',
                    localData   = {indexstatus:1,data:datas},
                    ctrl        = 'ComplaintDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function viewTripDetails(ev,id)
            {
                var tempUrl     = 'app/main/complaint-dispatch/dialog/complaint-view.html',
                    localData   = {trip_ticket_id:id},
                    ctrl        = 'ComplaintViewDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs);
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
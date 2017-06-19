(function ()
{
    'use strict';

    angular
        .module('app.gps')
        .controller('GPSController',GPSController);

    /** @ngInject */
    function GPSController($rootScope,$scope,api,ModalConfig,toaster,RouteImage,LoaderService)
    {
        var bookmark;
        var vm      =   this;
            vm.photoPath = RouteImage;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'body_no',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];
            vm.gadgetType = [];
            vm.getLists = getLists;
            vm.add      = add;
            vm.update   = update;
            vm.uploadRoute = uploadRoute;
            vm.viewImage = viewImage;
            vm.changeStatus = changeStatus;

            function getLists()
            {
                vm.promise = api.gps.gps.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/gps/dialog/gps-dialog.html',
                    localData   = {indexstatus:0,data:null},
                    ctrl        = 'GPSDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function update(ev,datas)
            {
                var tempUrl     = 'app/main/gps/dialog/gps-dialog.html',
                    localData   = {indexstatus:1,data:datas},
                    ctrl        = 'GPSDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function uploadRoute(ev,id)
            {
                var tempUrl     = 'app/main/gps/dialog/gps-image-dialog.html',
                    localData   = {data:{geofence_id:id}},
                    ctrl        = 'GPSImageDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function viewImage(ev,datas)
            {
                var tempUrl     = 'app/main/gps/dialog/gps-image-view.html',
                    localData   = {data:datas},
                    ctrl        = 'GPSViewDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs);
            }


            function changeStatus(id,stat)
            {
                LoaderService.loader();
                var datastring = {geofence_id:id,geofence_status:stat};
                api.gps.gpsStatus.save(datastring,success);
                function success(r)
                {
                    if(r.status == 200)
                    {
                        toaster.pop('success','Status has been changed.');
                        getLists();
                            
                    }
                    else if(r.status == 500)
                    {
                        toaster.pop('error','Error','Something went wrong.');
                    }
                    LoaderService.hide();
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
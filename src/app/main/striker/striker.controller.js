(function ()
{
    'use strict';

    angular
        .module('app.striker')
        .controller('StrikerController',StrikerController);

    /** @ngInject */
    function StrikerController($scope,$rootScope,api,ModalConfig,$q,toaster,ProfilePicStriker,LoaderService)
    {
        var bookmark;
        var vm      =   this;
            vm.strikerPath = ProfilePicStriker;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'striker_no',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];

            vm.getLists = getLists;
            vm.add      = add;
            vm.update = update;
            vm.changeStatus = changeStatus;
            vm.uploadImage = uploadImage;

            function getLists()
            {
                vm.promise = api.striker.striker.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/striker/dialog/striker-dialog.html',
                    localData   = {index:0,data:null},
                    ctrl        = 'StrikerDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function update(ev,datastring)
            {
                var tempUrl     = 'app/main/striker/dialog/striker-dialog.html',
                    localData   = {index:1,data:datastring},
                    ctrl        = 'StrikerDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function changeStatus(id,stat)
            {
                LoaderService.loader();
                var datastring = {striker_id:id,striker_status:stat};
                api.striker.strikerStatus.save(datastring,success);
                function success(r)
                {
                    if(r.status == 200)
                    {
                        toaster.pop('success','Status Change Success');
                        getLists();
                    }
                    else
                    {
                        toaster.pop('error','Error','Something went wrong.');
                    }
                    LoaderService.hide();
                }
            }

            function uploadImage(ev,id)
            {
                var tempUrl     = 'app/main/striker/dialog/striker-image.html',
                    localData   = {data:{striker_id:id}},
                    ctrl        = 'StrikerImageDialogController',
                    ctrlAs      = 'sdcvm';
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
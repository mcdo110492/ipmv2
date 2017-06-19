(function ()
{
    'use strict';

    angular
        .module('app.lunch-box')
        .controller('LunchBoxDetailsController',LunchBoxDetailsController);

    /** @ngInject */
    function LunchBoxDetailsController($stateParams,$rootScope,$scope,api,ModalConfig,toaster)
    {
        var bookmark;
        var vm      =   this;
            vm.details = {
                lunchbox_id:$stateParams.id,
                lunchbox:$stateParams.name
            };
           
            vm.lists = [];
            vm.getLists = getLists;
            vm.add      = add;
            vm.changeStatus = changeStatus;

            function getLists()
            {
                var query = {lunchbox_id:vm.details.lunchbox_id,project_id:$rootScope.selectedProject.project_id};
                vm.promise = api.lunchbox.lunchboxGadgets.get(query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }
            getLists();

            function add(ev)
            {
                var tempUrl     = 'app/main/lunch-box/details/dialog/lunch-box-details-dialog.html',
                    localData   = {data:null},
                    ctrl        = 'LunchBoxDetailsDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            


            function changeStatus(id,gid,status)
            {
                var datastring = {lunchbox_gadget_id:id,gadget_id:gid,lunch_box_gadget_status:status,project_id:$rootScope.selectedProject.project_id};
                api.lunchbox.lunchboxGadgetStatus.save(datastring,success);
                function success(r)
                {
                    if(r.status === 200)
                    {
                        getLists();
                        toaster.pop('success','Status Change Successfully.');
                    }
                    else
                    {
                        toaster.pop('error','Something went wrong.');
                    }
                }
            }

        

          

    
        
    }
})();
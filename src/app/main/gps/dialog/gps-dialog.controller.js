(function ()
{
    'use strict';

    angular
        .module('app.gps')
        .controller('GPSDialogController',GPSDialogController);

    /** @ngInject */
    function GPSDialogController(api,ModalConfig,toaster,$rootScope,indexstatus,data)
    {
        var vm          =   this;
            vm.details  = {
                        geofence_id:'',
                        shift_id:'',
                        collection_type_id:'',
                        sector:'',
                        project_id:$rootScope.selectedProject.project_id
            };
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'gps/check';
            vm.shift = [];
            vm.collectionType = [];
            vm.save     = save;
            vm.closeDialog = closeDialog;


            init();
            function init()
            {
                if(indexstatus == 1)
                {
                    vm.details  = {
                        geofence_id:data.geofence_id,
                        shift_id:data.shift_id,
                        collection_type_id:data.collection_type_id,
                        sector:data.sector,
                        project_id:data.project_id
                    };
                }
            }

            function save()
            {
                vm.loader   =   true;
                if(indexstatus == 0)
                {

                    api.gps.gps.save(vm.details,success);
                }
                else if(indexstatus == 1)
                {
                    api.gps.gps.update(vm.details,success);
                }
                function success(r)
                {
                    if(r.status == 200)
                    {
                        toaster.pop('success','Success','Data has been save successfully.');
                        ModalConfig.closeModal();
                    }
                    else if(r.status == 500)
                    {
                        toaster.pop('error','Error','Something went wrong.');
                    }
                    else
                    {
                        toaster.pop('warning','Warning',"There' s an error while saving your data. Please check again.");
                    }
                    vm.loader   =   false;
                }
            }


            function closeDialog()
            {
                ModalConfig.cancelModal();
            }

            loadShift();
            function loadShift()
            {
                var datastring = {project_id:$rootScope.selectedProject.project_id};
                api.shift.shiftAll.get(datastring,success);
                function success(r)
                {
                    vm.shift = r.data;
                }
            }
            loadCollectionType();
            function loadCollectionType()
            {
                api.collectionType.collectionTypeAll.get(success);
                function success(r)
                {
                    vm.collectionType = r.data;
                }
            }

           
        
    }
})();
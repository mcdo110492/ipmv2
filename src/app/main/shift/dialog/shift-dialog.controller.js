(function ()
{
    'use strict';

    angular
        .module('app.shift')
        .controller('ShiftDialogController',ShiftDialogController);

    /** @ngInject */
    function ShiftDialogController($rootScope,api,ModalConfig,toaster,indexstatus,data)
    {
        var vm          =   this;
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'shift/check';
            vm.details = {
                shift_id:'',
                unit_id:'',
                collection_schedule_id:'',
                geofence_name:'',
                equipment_id:'',
                shift_time:'',
                exact_time:'',
                project_id:$rootScope.selectedProject.project_id
            };
            vm.units = [];
            vm.collectionSchedule = [];
            vm.equipments = [];
            vm.save     = save;
            vm.closeDialog = closeDialog;

            init();
            function init()
            {
                if(indexstatus == 1)
                {
                    var currentDate = moment().format('YYYY-M-D');
                    vm.details = {
                        shift_id:data.shift_id,
                        unit_id:data.unit_id,
                        collection_schedule_id:data.collection_schedule_id,
                        geofence_name:data.geofence_name,
                        equipment_id:data.equipment_id,
                        shift_time:new Date(currentDate +' '+data.shift_time),
                        exact_time:'',
                        project_id:$rootScope.selectedProject.project_id
                    };
                }
            }

            function save()
            {
                vm.loader   =   true;
                vm.details.exact_time = moment(vm.details.shift_time).format('YYYY-M-D H:mm:ss');
                if(indexstatus == 0)
                {

                    api.shift.shift.save(vm.details,success);
                }
                else
                {

                    api.shift.shift.update(vm.details,success);
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
            loadUnit();
            function loadUnit()
            {
                api.collectionSchedule.collectionScheduleAll.get(success);
                function success(r)
                {
                    vm.collectionSchedule = r.data;
                }
            }
            loadCollectionSchedule();
            function loadCollectionSchedule()
            {
                api.unit.unitAll.get(success);
                function success(r)
                {
                    vm.units = r.data;
                }
            }
            loadEquipments();
            function loadEquipments()
            {
                var datastring = {project_id:vm.details.project_id,shift_id:vm.details.shift_id};
                api.shift.shiftEquipment.get(datastring,success);
                function success(r)
                {
                    vm.equipments = r.data;
                }
            }


            function closeDialog()
            {
                ModalConfig.cancelModal();
            }

           
        
    }
})();
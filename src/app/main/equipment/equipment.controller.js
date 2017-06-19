(function ()
{
    'use strict';

    angular
        .module('app.equipment')
        .controller('EquipmentController',EquipmentController);

    /** @ngInject */
    function EquipmentController($rootScope,$scope,api,ModalConfig,toaster,$q,LoaderService)
    {
        var bookmark;
        var vm      =   this;
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
            vm.changeStatus = changeStatus;
            vm.check = check;
            vm.checkData = checkData;
            vm.updateData = updateData;

            function getLists()
            {
                vm.promise = api.equipment.equipment.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/equipment/dialog/equipment-dialog.html',
                    localData   = {data:null},
                    ctrl        = 'EquipmentDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function changeStatus(id,stat)
            {
                LoaderService.loader();
                var datastring = {equipment_id:id,equipment_status:stat};
                api.equipment.equipmentStatus.save(datastring,success);
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

            function check(newVal,field)
            {
                if(field === 'equipment_capacity')
                {
                    var num = isNaN(newVal);
                    if(newVal === '')
                    {
                        return 'This is required';
                    }
                    else if(num)
                    {
                        return 'Number(s) only';
                    }

                }
                else
                {
                     if(newVal === '')
                    {
                        return 'This is required';
                    }
                }
               
                
            }

            function checkData(newVal,oldVal,field)
            {
                var deferred = $q.defer();
                if(newVal === '')
                {
                    deferred.reject('This is required.');
                }
                else if(newVal != oldVal)
                {
                    var datastring = {uniqueField:field,uniqueValue:newVal};
                    api.equipment.check.save(datastring,success);
                    function success(r)
                    {
                        if(r.status == 403)
                        {
                            deferred.reject('This data is not available.');
                        }
                        else
                        {
                            deferred.resolve(true);
                        }
                    }
                }
                else if(newVal === oldVal)
                {
                    deferred.resolve(true);
                }
                return deferred.promise;
            }

            function updateData(data,id)
            {
               
                    var datastring = {equipment_id:id,equipment_code:data.equipment_code,body_no:data.body_no,equipment_model:data.equipment_model,equipment_capacity:data.equipment_capacity,equipment_remarks:data.equipment_remarks,equipment_plate_no:data.equipment_plate_no};
                    api.equipment.equipment.update(datastring,success);

                    function success(r)
                    {
                        if(r.status == 200)
                        {
                            toaster.pop('success','Success','Data has been save successfully.');
                            
                        }
                        else if(r.status == 500)
                        {
                            toaster.pop('error','Error','Something went wrong.');
                        }
                        else
                        {
                            toaster.pop('warning','Warning',"There' s an error while saving your data. Please check again.");
                        }
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
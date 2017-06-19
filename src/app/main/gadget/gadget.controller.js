(function ()
{
    'use strict';

    angular
        .module('app.gadget')
        .controller('GadgetController',GadgetController);

    /** @ngInject */
    function GadgetController($rootScope,$scope,api,ModalConfig,$q,toaster,$filter,LoaderService)
    {
        var bookmark;
        var vm      =   this;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'gadget_code',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];
            vm.gadgetType = [];
            vm.getLists = getLists;
            vm.add      = add;
            vm.checkData = checkData;
            vm.updateData = updateData;
            vm.loadGadgetType = loadGadgetType;
            vm.showGadgetType = showGadgetType;
            vm.changeStatus = changeStatus;

            function getLists()
            {
                vm.promise = api.gadget.gadget.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/gadget/dialog/gadget-dialog.html',
                    localData   = {data:null},
                    ctrl        = 'GadgetDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
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
                    api.gadget.check.save(datastring,success);
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
               
                    var datastring = {gadget_id:id,gadget_code:data.gadget_code,gadget_type_id:data.gadget_type_id,gadget_model:data.gadget_model,gadget_remarks:data.gadget_remarks};
                    api.gadget.gadget.update(datastring,success);

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

            function loadGadgetType()
            {
                return vm.gadgetType.length ? null : api.gadgetType.gadgetTypeAll.get(success);

                function success(r)
                {
                    vm.gadgetType = r.data;
                }
    
            }

            function showGadgetType(data)
            {
                if(data.gadget_type_id && vm.gadgetType.length)
                {
                    var selected = $filter('filter')(vm.gadgetType, {gadget_type_id: data.gadget_type_id});
                    return selected.length ? selected[0].gadget_type : 'Not Set';
                }
                else
                {
                    return data.gadget_type;
                }
            }

            function changeStatus(id,stat)
            {
                LoaderService.loader();
                var datastring = {gadget_id:id,gadget_status:stat};
                api.gadget.gadgetStatus.save(datastring,success);
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
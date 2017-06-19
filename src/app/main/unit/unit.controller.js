(function ()
{
    'use strict';

    angular
        .module('app.unit')
        .controller('UnitController',UnitController);

    /** @ngInject */
    function UnitController($scope,api,ModalConfig,$q,toaster)
    {
        var bookmark;
        var vm      =   this;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'unit_name'
                };
            vm.lists = [];

            vm.getLists = getLists;
            vm.add      = add;
            vm.checkData = checkData;
            vm.updateData = updateData;

            function getLists()
            {
                vm.promise = api.unit.unit.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/unit/dialog/unit-dialog.html',
                    localData   = {data:null},
                    ctrl        = 'UnitDialogController',
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
                    api.unit.check.save(datastring,success);
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
               
                    var datastring = {unit_id:id,unit_name:data.unit_name};
                    api.unit.unit.update(datastring,success);

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
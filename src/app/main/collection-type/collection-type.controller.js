(function ()
{
    'use strict';

    angular
        .module('app.collection-type')
        .controller('CollectionTypeController',CollectionTypeController);

    /** @ngInject */
    function CollectionTypeController($scope,api,ModalConfig,$q,toaster)
    {
        var bookmark;
        var vm      =   this;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'collection_type'
                };
            vm.lists = [];

            vm.getLists = getLists;
            vm.add      = add;
            vm.checkData = checkData;
            vm.updateData = updateData;

            function getLists()
            {
                vm.promise = api.collectionType.collectionType.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/collection-type/dialog/collection-type-dialog.html',
                    localData   = {data:null},
                    ctrl        = 'CollectionTypeDialogController',
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
                    api.collectionType.check.save(datastring,success);
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
               
                    var datastring = {collection_type_id:id,collection_type:data.collection_type};
                    api.collectionType.collectionType.update(datastring,success);

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
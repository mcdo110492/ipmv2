(function() {
'use strict';

    angular
        .module('app.item-type')
        .controller('ItemTypeController', ItemTypeController);

    /** @ngInject */
    function ItemTypeController(api,ModalConfig,$q,$scope,toaster) {
        var vm = this,
            bookmark;

             vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'item_type'
                };

            vm.lists = [];
            vm.activate =   activate;
            vm.add      =   add;
            vm.validate = validate;
            vm.update   =   update;


        

        function activate()
        {
            api.itemType.itemType.get(vm.query,success);

            function success(r)
            {
                vm.lists = r;
            }
        }

        function add(ev)
        {
            var tempUrl     = 'app/main/item-type/dialog/item-type-dialog.html',
                localData   = {data:null},
                ctrl        = 'ItemTypeDialogController',
                ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.activate);
        }

        function validate(newVal,oldVal)
        {
            var deferred = $q.defer();
            if(newVal === '')
            {
                 deferred.reject('This is required.');
            }
            else if(newVal != oldVal)
            {
                var datastring = {uniqueField:'item_type',uniqueValue:newVal,id:'check'};
                api.itemType.itemType.check(datastring,success);
                function success(r)
                {
                    if(r.status == 403)
                    {
                        deferred.reject('This data is not available.');
                    }
                    else
                    {
                        deferred.resolve();
                    }
                }
            }
            else if(newVal === oldVal)
            {
                deferred.resolve();
            }

            return deferred.promise;
        }


        function update (data,oid)
        {
          
            var datastring = {id:oid,item_type:data.item_type};
            api.itemType.itemType.update(datastring,success);
            
            
            function success(r)
            {
                if(r.status == 200)
                {
                    toaster.pop('success','Success','Data has been save successfully.');
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
                    
                activate();
        });
    }
})();
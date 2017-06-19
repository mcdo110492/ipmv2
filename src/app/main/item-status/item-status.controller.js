(function() {
'use strict';

    angular
        .module('app.item-status')
        .controller('ItemStatusController', ItemStatusController);

    /** @ngInject */
    function ItemStatusController(api,ModalConfig,$q,$scope,toaster) {
        var vm = this,
            bookmark;

             vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'item_status'
                };

            vm.lists = [];
            vm.activate =   activate;
            vm.add      =   add;
            vm.validate = validate;
            vm.update   =   update;


        

        function activate()
        {
            api.itemStatus.itemStatus.get(vm.query,success);

            function success(r)
            {
                vm.lists = r;
            }
        }

        function add(ev)
        {
            var tempUrl     = 'app/main/item-status/dialog/item-status-dialog.html',
                localData   = {data:null},
                ctrl        = 'ItemStatusDialogController',
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
                var datastring = {uniqueField:'item_status',uniqueValue:newVal,id:'check'};
                api.itemStatus.itemStatus.check(datastring,success);
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
          
            var datastring = {id:oid,item_status:data.item_status};
            api.itemStatus.itemStatus.update(datastring,success);
            
            
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
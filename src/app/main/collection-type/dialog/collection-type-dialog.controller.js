(function ()
{
    'use strict';

    angular
        .module('app.collection-type')
        .controller('CollectionTypeDialogController',CollectionTypeDialogController);

    /** @ngInject */
    function CollectionTypeDialogController(api,ModalConfig,toaster)
    {
        var vm          =   this;
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'collectionType/check';
            vm.save     = save;
            vm.closeDialog = closeDialog;

            vm.details = {
                collection_type:''
            };

            function save()
            {
                vm.loader   =   true;
                api.collectionType.collectionType.save(vm.details,success);
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

           
        
    }
})();
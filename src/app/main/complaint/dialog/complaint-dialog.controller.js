(function ()
{
    'use strict';

    angular
        .module('app.complaint')
        .controller('ComplaintDialogController',ComplaintDialogController);

    /** @ngInject */
    function ComplaintDialogController(api,ModalConfig,toaster,indexstatus,data,$rootScope)
    {
        var vm          =   this;
            vm.loader   =   false;
            vm.collectionType = [];
            vm.indexstatus = indexstatus;
            vm.save     = save;
            vm.closeDialog = closeDialog;

            vm.details = {
                complaint_id:'',
                complaint_no:'',
                collection_type_id:'',
                client_name:'',
                client_type:'',
                contact_no:'',
                details:'',
                location:'',
                complaint_date:new Date(),
                project_id: $rootScope.selectedProject.project_id
            };

            init();
            function init()
            {
                if(indexstatus == 1)
                {
                    vm.details = {
                        complaint_id:data.complaint_id,
                        complaint_no:data.complaint_no,
                        collection_type_id:data.collection_type_id,
                        client_name:data.client_name,
                        client_type:data.client_type,
                        contact_no:data.contact_no,
                        details:data.details,
                        location:data.location,
                        complaint_date:new Date(data.complaint_date),
                        project_id: $rootScope.selectedProject.project_id
                    };
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

            function save()
            {
                vm.loader   =   true;
                if(indexstatus == 0)
                {
                    api.complaint.complaint.save(vm.details,success);
                }
                else
                {
                    api.complaint.complaint.update(vm.details,success);
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

           
        
    }
})();
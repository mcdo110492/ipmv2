(function ()
{
    'use strict';

    angular
        .module('app.complaint-dispatch')
        .controller('ComplaintDispatchDialogController',ComplaintDispatchDialogController);

    /** @ngInject */
    function ComplaintDispatchDialogController(api,ModalConfig,toaster,data,$rootScope)
    {
        var vm          =   this;
            vm.loader   =   false;
            vm.tripTicket = [];
            vm.save     = save;
            vm.closeDialog = closeDialog;

            vm.details = {
                complaint_id:data.complaint_id,
                complaint_no:data.complaint_no,
                trip_ticket_id:data.trip_ticket_id
            };

            


            loadTripTicket();
            function loadTripTicket()
            {
                var datastring = {project_id:$rootScope.selectedProject.project_id};
                api.complaint.getTripTicket.get(datastring,success);
                function success(r)
                {
                    vm.tripTicket = r.data;
                }
            }

            function save()
            {
                
                api.complaint.complaintDispatch.save(vm.details,success);
                
                
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
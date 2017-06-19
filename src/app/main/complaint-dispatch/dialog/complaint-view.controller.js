(function ()
{
    'use strict';

    angular
        .module('app.complaint-dispatch')
        .controller('ComplaintViewDialogController',ComplaintViewDialogController);

    /** @ngInject */
    function ComplaintViewDialogController(api,ModalConfig,toaster,trip_ticket_id)
    {
        var vm          =   this;
            vm.tripTicket = [];
            vm.closeDialog = closeDialog;

           

          init();
          function init()
          {
            var datastring = {trip_ticket_id:trip_ticket_id};
            vm.promise = api.complaint.getTripTicket.viewtrip(datastring,success).$promise;
            function success(r)
            {
                vm.tripTicket = r.data;
            }
          }

         


            function closeDialog()
            {
                ModalConfig.cancelModal();
            }

           
        
    }
})();
(function ()
{
    'use strict';

    angular
        .module('app.gadget-accountability')
        .controller('GadgetAccountabilityStatusDialogController',GadgetAccountabilityStatusDialogController);

    /** @ngInject */
    function GadgetAccountabilityStatusDialogController(api,ModalConfig,toaster,data)
    {
        var vm          =   this;
            vm.info     = {
                    employee_no:data.employee_no,
                    firstname: data.firstname,
                    middlename: data.middlename,
                    lastname: data.lastname,
                    lunchbox:data.lunchbox,
                    trip_ticket_no:data.trip_ticket_no,
                    lunchbox_date: new Date(data.lunchbox_date)
            };
            vm.details  = {
                        id:data.trip_lunchbox_id,
                        lunchbox_status:data.lunchbox_status
            };
            vm.currentDate = new Date();
            vm.loader   =   false;
            vm.save     = save;
            vm.closeDialog = closeDialog;

            function save()
            {
                vm.loader   =   true;
                api.gadgetAccountability.gadgetAccountability.update(vm.details,success);
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
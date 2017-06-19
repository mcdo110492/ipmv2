(function ()
{
    'use strict';

    angular
        .module('app.equipment')
        .controller('EquipmentDialogController',EquipmentDialogController);

    /** @ngInject */
    function EquipmentDialogController(api,ModalConfig,toaster,$rootScope)
    {
        var vm          =   this;
            vm.details  = {
                        equipment_id:'',
                        equipment_code:'',
                        body_no:'',
                        equipment_model:'',
                        equipment_capacity:'',
                        equipment_remarks:'',
                        equipment_plate_no:'',
                        project_id:$rootScope.selectedProject.project_id
            };
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'equipment/check';
            vm.save     = save;
            vm.closeDialog = closeDialog;


            function save()
            {
                vm.loader   =   true;
                api.equipment.equipment.save(vm.details,success);
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
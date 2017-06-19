(function ()
{
    'use strict';

    angular
        .module('app.employee-list')
        .controller('EmployeeListDialogController',EmployeeListDialogController);

    /** @ngInject */
    function EmployeeListDialogController(api,ModalConfig,toaster,$rootScope)
    {
        var vm          =   this;
            vm.loader   =   false;
            vm.urlPath  =   api.baseUrl+'employeeList/check';
            vm.details = {
                        employee_no:'',
                        firstname:'',
                        middlename:'',
                        lastname:'',
                        dob:new Date(),
                        position_id:'',
                        employment_status_id:'',
                        date_employed:new Date(),
                        date_retired:new Date(),
                        project_id:''
            };
            vm.position = [];
            vm.employmentStatus = [];
            vm.save     = save;
            vm.loadPosition = loadPosition;
            vm.loadEmploymentStatus = loadEmploymentStatus;
            vm.closeDialog = closeDialog;



            function save(data)
            {
                vm.loader   =   true;
                data.project_id = $rootScope.selectedProject.project_id;
                api.employeeList.employeeList.save(data,success);
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


            function loadPosition ()
            {
                api.position.positionAll.get(success);
                function success(r)
                {
                    vm.position = r.data;
                }
            }

            function loadEmploymentStatus ()
            {
                api.employmentStatus.employmentStatusAll.get(success);
                function success(r)
                {
                    vm.employmentStatus = r.data;
                }
            }


            function closeDialog()
            {
                ModalConfig.cancelModal();
            }

           
        
    }
})();
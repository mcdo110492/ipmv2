(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming,msNavigationService,$rootScope,$scope)
    {
        var vm = this;
            vm.userType = Number($rootScope.userType);
        // Data
        vm.themes = fuseTheming.themes;

        //////////

        msNavigationService.saveItem('file', {
            title : 'File Maintenance',
            group : true,
            weight: 1,
            hidden:function(){
                var arr = [1];
                return check(arr);
            }
        });

        msNavigationService.saveItem('file.project', {
            title : 'PROJECT',
            icon : 'icon-book',
            weight: 1,
            state:'app.project'
        });

        msNavigationService.saveItem('file.position', {
            title : 'POSITION',
            icon : 'icon-book',
            weight: 2,
            state:'app.position'
        });

        msNavigationService.saveItem('file.employment-status', {
            title : 'EMPLOYMENT STATUS',
            icon : 'icon-book',
            weight: 3,
            state:'app.employment-status'
        });

        msNavigationService.saveItem('file.employee-status', {
            title : 'EMPLOYEE STATUS',
            icon : 'icon-book',
            weight: 4,
            state:'app.employee-status'
        });

        msNavigationService.saveItem('file.unit', {
            title : 'UNIT',
            icon : 'icon-book',
            weight: 5,
            state:'app.unit'
        });

        msNavigationService.saveItem('file.gadget-type', {
            title : 'GADGET TYPE',
            icon : 'icon-book',
            weight: 6,
            state:'app.gadget-type'
        });

         msNavigationService.saveItem('file.collection-schedule', {
            title : 'COLLECTION SCHEDULE',
            icon : 'icon-book',
            weight: 7,
            state:'app.collection-schedule'
        });

         msNavigationService.saveItem('file.collection-type', {
            title : 'COLLECTION TYPE',
            icon : 'icon-book',
            weight: 8,
            state:'app.collection-type'
        });

         msNavigationService.saveItem('file.violation', {
            title : 'VIOLATION',
            icon : 'icon-book',
            weight: 9,
            state:'app.violation'
        });

         msNavigationService.saveItem('file.company-policy', {
            title : 'COMPANY POLICY',
            icon : 'icon-book',
            weight: 10,
            state:'app.company-policy'
        });

        msNavigationService.saveItem('hr', {
            title : 'HR Module',
            group : true,
            weight: 2,
            hidden:function(){
                var arr = [1,2,3,4];
                return check(arr);
            }
        });

        msNavigationService.saveItem('hr.employee-list', {
            title : 'EMPLOYEE LIST',
            icon : 'icon-account-multiple',
            weight: 1,
            state:'app.employee-list',
            hidden:function(){
                var arr = [1,2,3];
                return check(arr);
            }
        });

        msNavigationService.saveItem('hr.striker', {
            title : 'STRIKER LIST',
            icon : 'icon-account-multiple',
            weight: 2,
            state:'app.striker',
             hidden:function(){
                var arr = [1,2,3];
                return check(arr);
            }

        });

         msNavigationService.saveItem('hr.employee-violation', {
            title : 'EMPLOYEE VIOLATION',
            icon : 'icon-account-multiple',
            weight: 3,
            state:'app.employee-violation'
        });

        msNavigationService.saveItem('hr.driver-assignment', {
            title : "DRIVER ASSIGNMENT",
            icon : 'icon-account-multiple',
            weight: 4,
            state:'app.driver-assignment',
             hidden:function(){
                var arr = [1,2,3];
                return check(arr);
            }
        });


       

         msNavigationService.saveItem('csr', {
            title : 'CSR Module',
            group : true,
            weight: 3,
             hidden:function(){
                var arr = [1,2,5,11];
                return check(arr);
            }
        });

         msNavigationService.saveItem('csr.complaint', {
            title : 'COMPLAINT',
            icon : 'icon-book',
            weight: 1,
            state:'app.complaint'
        });

        msNavigationService.saveItem('it', {
            title : 'IT Module',
            group : true,
            weight: 4,
             hidden:function(){
                var arr = [1,2,5,6];
                return check(arr);
            }
        });

         msNavigationService.saveItem('it.gadget', {
            title : 'GADGET',
            icon : 'icon-book',
            weight: 1,
            state:'app.gadget'
        });

         

        msNavigationService.saveItem('it.lunch-box', {
            title : 'LUNCH BOX',
            icon : 'icon-book',
            weight: 2,
            state:'app.lunch-box'
        });

        msNavigationService.saveItem('it.gadget-accountability', {
            title : 'GADGET ACCOUNTABILITY',
            icon : 'icon-book',
            weight: 3,
            state:'app.gadget-accountability'
        });

        msNavigationService.saveItem('it.item-type', {
            title : 'ITEM TYPE',
            icon : 'icon-book',
            weight: 4,
            state:'app.item-type'
        });

        msNavigationService.saveItem('it.item-status', {
            title : 'ITEM STATUS',
            icon : 'icon-book',
            weight: 5,
            state:'app.item-status'
        });

        msNavigationService.saveItem('it.item', {
            title : 'ITEMS',
            icon : 'icon-book',
            weight: 6,
            state:'app.item'
        });

        msNavigationService.saveItem('it.item-inventory', {
            title : 'INVENTORY',
            icon : 'icon-book',
            weight: 7,
            state:'app.item-inventory'
        });

         msNavigationService.saveItem('gps', {
            title : 'GPS Module',
            group : true,
            weight: 5,
             hidden:function(){
                var arr = [1,2,5,7];
                return check(arr);
            }
        });

         msNavigationService.saveItem('gps.shift', {
            title : 'SHIFT',
            icon : 'icon-book',
            weight: 1,
            state:'app.shift'
        });

        msNavigationService.saveItem('gps.gps', {
            title : 'GPS',
            icon : 'icon-book',
            weight: 2,
            state:'app.gps'
        });

    


         msNavigationService.saveItem('dispatch', {
            title : 'Dispatch Module',
            group : true,
            weight: 6,
             hidden:function(){
                var arr = [1,2,5,8,9];
                return check(arr);
            }
        });

         msNavigationService.saveItem('dispatch.trip-ticket', {
            title : 'TRIP TICKET',
            icon : 'icon-book',
            weight: 1,
            state:'app.trip-ticket',
             hidden:function(){
                var arr = [1,2,5,8];
                return check(arr);
            }
        });

         msNavigationService.saveItem('dispatch.tracker', {
            title : 'TRACKER',
            icon : 'icon-book',
            weight: 2,
            state:'app.tracker'
        });

         msNavigationService.saveItem('dispatch.dispatch-complaint', {
            title : 'COMPLAINTS',
            icon : 'icon-book',
            weight: 3,
            state:'app.complaint-dispatch',
            hidden:function(){
                var arr = [1,2,5,8];
                return check(arr);
            }
        });

         msNavigationService.saveItem('equipment', {
            title : 'Equipment Module',
            group : true,
            weight: 7,
            hidden:function(){
                var arr = [1,2,5];
                return check(arr);
            }
        });

         msNavigationService.saveItem('equipment.equipment', {
            title : 'EQUIPMENT',
            icon : 'icon-book',
            weight: 1,
            state:'app.equipment'
        });

         msNavigationService.saveItem('warehouse', {
            title : 'Warehouse Module',
            group : true,
            weight: 8,
            hidden:function(){
                var arr = [1,2,5,12];
                return check(arr);
            }
        });

         msNavigationService.saveItem('warehouse.fuel', {
            title : 'FUEL',
            icon : 'icon-book',
            weight: 1,
            state:'app.fuel'
        });


         msNavigationService.saveItem('user', {
            title : 'User Module',
            group : true,
            weight: 9,
            hidden:function(){
                var arr = [1,2];
                return check(arr);
            }
        });

         msNavigationService.saveItem('user.user', {
            title : 'USER MANAGEMENT',
            icon : 'icon-account-multiple',
            weight: 1,
            state:'app.user-management'
        });

         function check(arrRole)
         {
            if(arrRole.indexOf(vm.userType) == -1)
            {
                
                return true;
            }
            else
            {
                return false;
            }
         }

         $scope.$watchCollection('$root.userType', function() {
            vm.userType = Number($rootScope.userType);
        });

       

    }
})();
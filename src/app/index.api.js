(function ()
{
    'use strict';

    angular
        .module('fuse')
        .factory('api', apiService);

    /** @ngInject */
    function apiService($resource)
    {
       
        var api = {};

        //Base Url
        //api.baseUrl = 'http://ipm.pillarsweb.com/ipmservices/index.php/';
        api.baseUrl = 'http://localhost/ipmservicesv2/index.php/';

        api.baseUrlLaravel = 'http://127.0.0.1:8000/api/';

        api.login = {
            authenticate: $resource(api.baseUrlLaravel+'authenticate/:id')
        };

        api.routeResolver = {
            checking:$resource(api.baseUrl+'routeResolver/securityCheck/:id')
        };

        api.project = {
            project: $resource(api.baseUrl+'project/project/:id', null, {update:{method:'PUT'}}),
            checkProject : $resource(api.baseUrl+'project/checkData/:id'),
            projectAll : $resource(api.baseUrl+'project/projectAll/:id')
        };

        api.position = {
            position: $resource(api.baseUrl+'position/position/:id', null, {update:{method:'PUT'}}),
            checkPosition : $resource(api.baseUrl+'position/checkData/:id'),
            positionAll : $resource(api.baseUrl+'position/positionAll/:id')
        };


        api.employmentStatus = {
            employmentStatus: $resource(api.baseUrl+'employmentStatus/employmentStatus/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'employmentStatus/check/:id'),
            employmentStatusAll: $resource(api.baseUrl+'employmentStatus/employmentStatusAll/:id')
        };

        api.employeeStatus = {
            employeeStatus: $resource(api.baseUrl+'employeeStatus/employeeStatus/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'employeeStatus/check/:id'),
            employeeStatusAll: $resource(api.baseUrl+'employeeStatus/employeeStatusAll/:id')
        };

        api.unit = {
            unit: $resource(api.baseUrl+'unit/unit/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'unit/check/:id'),
            unitAll: $resource(api.baseUrl+'unit/unitAll/:id')
        };

        api.gadgetType = {
            gadgetType: $resource(api.baseUrl+'gadgetType/gadgetType/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'gadgetType/check/:id'),
            gadgetTypeAll: $resource(api.baseUrl+'gadgetType/gadgetTypeAll/:id')
        };

        api.collectionSchedule = {
            collectionSchedule: $resource(api.baseUrl+'collectionSchedule/collectionSchedule/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'collectionSchedule/check/:id'),
            collectionScheduleAll: $resource(api.baseUrl+'collectionSchedule/collectionScheduleAll/:id')
        };

        api.collectionType = {
            collectionType: $resource(api.baseUrl+'collectionType/collectionType/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'collectionType/check/:id'),
            collectionTypeAll: $resource(api.baseUrl+'collectionType/collectionTypeAll/:id')
        };

        api.employeeList = {
            employeeList: $resource(api.baseUrl+'employeeList/employeeList/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'employeeList/check/:id')
        };

        api.employeeDetails = {
            employeeDetails: $resource(api.baseUrl+'employeeDetails/employeeDetails/:id', null, {update:{method:'PUT'}}),
            employeeContact: $resource(api.baseUrl+'employeeDetails/employeeContact/:id', null, {update:{method:'PUT'}}),
            employeeEmployment: $resource(api.baseUrl+'employeeDetails/employeeEmployment/:id', null, {update:{method:'PUT'}}),
            employeeEducation: $resource(api.baseUrl+'employeeDetails/employeeEducation/:id', null, {update:{method:'PUT'}}),
            employeeGovernment: $resource(api.baseUrl+'employeeDetails/employeeGovernment/:id', null, {update:{method:'PUT'}}),
            employeeLicense: $resource(api.baseUrl+'employeeDetails/employeeLicense/:id', null, {update:{method:'PUT'}}),
            employeeFamily: $resource(api.baseUrl+'employeeDetails/employeeFamily/:id', null, {update:{method:'PUT'}}),
            employeeTraining: $resource(api.baseUrl+'employeeDetails/employeeTraining/:id', null, {update:{method:'PUT'}}),
            employeeClub: $resource(api.baseUrl+'employeeDetails/employeeClub/:id', null, {update:{method:'PUT'}}),
            employeeAccount: $resource(api.baseUrl+'employeeDetails/employeeAccount/:id', null, {update:{method:'PUT'}})
        };

        api.striker = {
            striker:$resource(api.baseUrl+'striker/striker/:id', null, {update:{method:'PUT'}}),
            strikerStatus:$resource(api.baseUrl+'striker/strikerStatus/:id')
        };

        api.gadget = {
            gadget: $resource(api.baseUrl+'gadget/gadget/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'gadget/check/:id'),
            gadgetStatus:$resource(api.baseUrl+'gadget/gadgetStatus/:id')
        };

         api.gadgetAccountability = {
            gadgetAccountability: $resource(api.baseUrl+'gadgetAccountability/gadgetAccountability/:id', null, {update:{method:'PUT'}}),
            driver: $resource(api.baseUrl+'gadgetAccountability/driver/:id'),
            lunchbox: $resource(api.baseUrl+'gadgetAccountability/lunchbox/:id')
        };

        api.lunchbox = {
            lunchbox: $resource(api.baseUrl+'lunchbox/lunchbox/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'lunchbox/check/:id'),
            gadgetsAll:$resource(api.baseUrl+'lunchbox/gadgetsAll/:id'),
            lunchboxGadgets:$resource(api.baseUrl+'lunchbox/lunchboxGadgets/:id', null, {update:{method:'PUT'}}),
            lunchboxGadgetStatus: $resource(api.baseUrl+'lunchbox/lunchboxGadgetStatus/:id', null, {update:{method:'PUT'}})
        };


        api.complaint = {
            complaint: $resource(api.baseUrl+'complaint/complaint/:id', null, {update:{method:'PUT'}}),
            complaintDispatch: $resource(api.baseUrl+'complaint/complaintDispatch/:id'),
            getTripTicket:$resource(api.baseUrl+'complaint/getTripTicket/:id', null, {viewtrip:{method:'PUT'}})
        };
        

        api.shift = {
            shift: $resource(api.baseUrl+'shift/shift/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'shift/check/:id'),
            shiftEquipment:$resource(api.baseUrl+'shift/equipment/:id'),
            shiftAll: $resource(api.baseUrl+'shift/shiftAll/:id')
        };

        api.gps = {
            gps: $resource(api.baseUrl+'gps/gps/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'gps/check/:id'),
            gpsStatus:$resource(api.baseUrl+'gps/gpsStatus/:id')
        };

        api.equipment = {
            equipment: $resource(api.baseUrl+'equipment/equipment/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'equipment/check/:id'),
            equipmentStatus:$resource(api.baseUrl+'equipment/equipmentStatus/:id'),
            equipmentAll:$resource(api.baseUrl+'equipment/equipmentAll/:id')
        };

        api.driverAssignment = {
            driverAssignment: $resource(api.baseUrl+'driverAssignment/driverAssignment/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'driverAssignment/check/:id'),
            driverAssignmentDetails:$resource(api.baseUrl+'driverAssignment/driverAssignmentDetails/:id', null, {update:{method:'PUT'}}),
            driverAssignmentPaleros:$resource(api.baseUrl+'driverAssignment/driverAssignmentPaleros/:id', null, {update:{method:'PUT'}}),
            getPaleros:$resource(api.baseUrl+'driverAssignment/getPaleros/:id')
        };

        api.tripTicket = {
            tripTicket: $resource(api.baseUrl+'tripTicket/tripTicket/:id', null, {update:{method:'PUT'}}),
            check : $resource(api.baseUrl+'tripTicket/check/:id'),
            lunchbox:$resource(api.baseUrl+'tripTicket/lunchbox/:id'),
            shift:$resource(api.baseUrl+'tripTicket/shift/:id'),
            driver:$resource(api.baseUrl+'tripTicket/driver/:id'),
            paleros:$resource(api.baseUrl+'tripTicket/paleros/:id'),
            striker:$resource(api.baseUrl+'tripTicket/striker/:id'),
            equipment:$resource(api.baseUrl+'tripTicket/equipment/:id')
        };

        api.user = {
            user:$resource(api.baseUrl+'user/user/:id', null, {update:{method:'PUT'}}),
            role:$resource(api.baseUrl+'user/role/:id'),
            changeStatus:$resource(api.baseUrl+'user/changeStatus/:id'),
            resetPassword: $resource(api.baseUrl+'user/resetPassword/:id')
        };


        api.itemType = {
            itemType:$resource(api.baseUrlLaravel + 'item/type/:id', null, { update : { method  :   'PUT', params   :   {id:'@id'} }, check : { method  :   'POST', params   :   {id:'@id'} }, show : { method  :   'GET', params   :   {id:'@id'} } })
        };

        api.itemStatus = {
            itemStatus:$resource(api.baseUrlLaravel + 'item/status/:id', null, { update : { method  :   'PUT', params   :   {id:'@id'} }, check : { method  :   'POST', params   :   {id:'@id'} }, show : { method  :   'GET', params   :   {id:'@id'} } })
        };

        api.item = {
            item:$resource(api.baseUrlLaravel + 'item/:id', null, { update : { method  :   'PUT', params   :   {id:'@id'} }, check : { method  :   'POST', params   :   {id:'@id'} }, show : { method  :   'GET', params   :   {id:'@id'} } })
        };


        api.itemInventory = {
            itemInventory:$resource(api.baseUrlLaravel + 'item/inventory/:id', null, { update: { method : 'PUT', params : { id:'@id' } } })
        };

        return api;
    }

})();
(function ()
{
    'use strict';

    angular
        .module('app.driver-assignment',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.driver-assignment', {
                url      : '/driver-assignment',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/driver-assignment/driver-assignment.html',
                        controller : 'DriverAssignmentController as vm'
                    }
                },
                resolve  : { 
                }
            })
            .state('app.driver-assignment-details', {
                url      : '/driver-assignment/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/driver-assignment/details/driver-assignment-details.html',
                        controller : 'DriverAssignmentDetailsController as vm'
                    }
                },
                resolve  : { 
                }
            });

        
    }
})();
(function ()
{
    'use strict';

    angular
        .module('app.employee-list',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.employee-list', {
                url      : '/employee-list',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/employee-list/employee-list.html',
                        controller : 'EmployeeListController as vm'
                    }
                },
                resolve  : { 
                }
            })
            .state('app.employee-details', {
                url      : '/employee-details/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/employee-list/details/employee-details.html',
                        controller : 'EmployeeDetailsController as vm'
                    }
                },
                resolve  : {
                }
            });

        
    }
})();
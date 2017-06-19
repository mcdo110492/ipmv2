(function ()
{
    'use strict';

    angular
        .module('app.user-management',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.user-management', {
                url      : '/user-management',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/user-management/user-management.html',
                        controller : 'UserManagementController as vm'
                    }
                },
                resolve  : {
                   
                }
            });

        
    }
})();
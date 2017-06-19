(function ()
{
    'use strict';

    angular
        .module('app.collection-schedule',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.collection-schedule', {
                url      : '/collection-schedule',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/collection-schedule/collection-schedule.html',
                        controller : 'CollectionScheduleController as vm'
                    }
                },
                resolve  : { 
                }
            });

        
    }
})();
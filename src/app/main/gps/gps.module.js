(function ()
{
    'use strict';

    angular
        .module('app.gps',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.gps', {
                url      : '/gps',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/gps/gps.html',
                        controller : 'GPSController as vm'
                    }
                },
                resolve  : { 
                   
                }
            });

        
    }
})();
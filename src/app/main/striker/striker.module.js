(function ()
{
    'use strict';

    angular
        .module('app.striker',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.striker', {
                url      : '/striker',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/striker/striker.html',
                        controller : 'StrikerController as vm'
                    }
                },
                resolve  : { 
                   
                }
            });

        
    }
})();
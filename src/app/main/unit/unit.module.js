(function ()
{
    'use strict';

    angular
        .module('app.unit',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.unit', {
                url      : '/unit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/unit/unit.html',
                        controller : 'UnitController as vm'
                    }
                },
                resolve  : { 
                   
                }
            });

        
    }
})();
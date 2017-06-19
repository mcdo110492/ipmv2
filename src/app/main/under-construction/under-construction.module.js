(function ()
{
    'use strict';

    angular
        .module('app.under-construction',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.under-construction', {
                url      : '/under-construction',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/under-construction/under-construction.html',
                        controller : 'UnderConstructionController as vm'
                    }
                },
                resolve  : {
                   
                }
            });

        
    }
})();
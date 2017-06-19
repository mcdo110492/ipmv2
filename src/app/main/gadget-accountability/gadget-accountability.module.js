(function ()
{
    'use strict';

    angular
        .module('app.gadget-accountability',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.gadget-accountability', {
                url      : '/gadget-accountability',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/gadget-accountability/gadget-accountability.html',
                        controller : 'GadgetAccountabilityController as vm'
                    }
                },
                resolve  : { 
                   
                }
            });

        
    }
})();
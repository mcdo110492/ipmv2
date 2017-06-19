(function ()
{
    'use strict';

    angular
        .module('app.gadget-type',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.gadget-type', {
                url      : '/gadget-type',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/gadget-type/gadget-type.html',
                        controller : 'GadgetTypeController as vm'
                    }
                },
                resolve  : { 
                   
                }
            });

        
    }
})();
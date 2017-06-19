(function ()
{
    'use strict';

    angular
        .module('app.complaint-dispatch',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.complaint-dispatch', {
                url      : '/complaint-dispatch',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/complaint-dispatch/complaint-dispatch.html',
                        controller : 'ComplaintDispatchController as vm'
                    }
                },
                resolve  : {
                }
            });

        
    }
})();
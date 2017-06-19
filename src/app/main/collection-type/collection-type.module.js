(function ()
{
    'use strict';

    angular
        .module('app.collection-type',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.collection-type', {
                url      : '/collection-type',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/collection-type/collection-type.html',
                        controller : 'CollectionTypeController as vm'
                    }
                },
                resolve  : { 
                }
            });

        
    }
})();
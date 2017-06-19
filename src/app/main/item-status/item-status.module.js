(function() {
    'use strict';

    angular
        .module('app.item-status', [])
        .config(config);

     /** @ngInject */
     function config($stateProvider)
     {
         // State
        $stateProvider
            .state('app.item-status', {
                url      : '/item-status',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/item-status/item-status.html',
                        controller : 'ItemStatusController as vm'
                    }
                },
                resolve  : { 
                   
                }
            });
     }

})();
(function() {
    'use strict';

    angular
        .module('app.item-inventory', [])
        .config(config);

     /** @ngInject */
     function config($stateProvider)
     {
         // State
        $stateProvider
            .state('app.item-inventory', {
                url      : '/item-inventory',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/item-inventory/item-inventory.html',
                        controller : 'ItemInventoryController as vm'
                    }
                },
                resolve  : { 
                   
                }
            });
     }

})();
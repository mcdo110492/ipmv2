(function() {
    'use strict';

    angular
        .module('app.item-type', [])
        .config(config);

     /** @ngInject */
     function config($stateProvider)
     {
         // State
        $stateProvider
            .state('app.item-type', {
                url      : '/item-type',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/item-type/item-type.html',
                        controller : 'ItemTypeController as vm'
                    }
                },
                resolve  : { 
                   
                }
            });
     }

})();
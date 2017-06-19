(function ()
{
    'use strict';

    angular
        .module('app.lunch-box',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.lunch-box', {
                url      : '/lunch-box',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/lunch-box/lunch-box.html',
                        controller : 'LunchBoxController as vm'
                    }
                },
                resolve  : { 
                   
                }
            })
            .state('app.lunch-box-details', {
                url      : '/lunch-box/:id/:name',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/lunch-box/details/lunch-box-details.html',
                        controller : 'LunchBoxDetailsController as vm'
                    }
                },
                resolve  : { 
                   
                }
            });

        
    }
})();
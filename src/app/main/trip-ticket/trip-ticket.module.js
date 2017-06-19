(function ()
{
    'use strict';

    angular
        .module('app.trip-ticket',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.trip-ticket', {
                url      : '/trip-ticket',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/trip-ticket/trip-ticket.html',
                        controller : 'TripTicketController as vm'
                    }
                },
                resolve  : { 
                   
                }
            })
            .state('app.trip-ticket-new', {
                url      : '/trip-ticket-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/trip-ticket/new/trip-ticket-new.html',
                        controller : 'TripTicketNewController as vm'
                    }
                },
                resolve  : {
                   
                }
            })
            .state('app.trip-ticket-details', {
                url      : '/trip-ticket/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/trip-ticket/details/trip-ticket-details.html',
                        controller : 'TripTicketDetailsController as vm'
                    }
                },
                resolve  : {
                   
                }
            });

        
    }
})();
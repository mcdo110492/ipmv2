(function ()
{
    'use strict';

    angular
        .module('app.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider.state('app.login', {
            url      : '/',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.login': {
                    templateUrl: 'app/main/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login',
            resolve: { /* @ngInject */
                Presence: function ($location){
                    var presence = localStorage.presence || '',
                        role = localStorage.userType || '';
                        if(presence != '')
                        {
                            if(role == 1)
                            {
                                 $location.url('/project');
                            }
                            else if(role == 2 || role == 3)
                            {
                                 $location.url('/employee-list');
                            }
                            else if(role == 4)
                            {
                               $location.url('/under-construction');
                            }
                            else if(role == 5)
                            {
                               $location.url('/complaint');
                            }
                            else if(role == 6)
                            {
                                $location.url('/gadget');
                            }
                             else if(role == 7)
                            {
                                $location.url('/shift');
                            }
                             else if(role == 8)
                            {
                                $location.url('/trip-ticket');
                            }
                             else if(role == 9)
                            {
                                $location.url('/under-construction');
                            }
                             else if(role == 10)
                            {
                                $location.url('/under-construction');
                            }
                             else if(role == 11)
                            {
                                $location.url('/complaint');
                            } 
                            else if(role == 12)
                            {
                                $location.url('/under-construction');
                            }
                             else if(role == 13)
                            {
                                $location.url('/under-construction');
                            }

                        }
                }
            }

        });

      
    }

})();
(function ()
{
    'use strict';

    angular
        .module('app.project',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.project', {
                url      : '/project',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/project/project.html',
                        controller : 'ProjectController as vm'
                    }
                },
                resolve  : { 
                }
            });

        
    }
})();
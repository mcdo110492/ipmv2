(function ()
{
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /** @ngInject */
    function ToolbarController($rootScope,$mdSidenav, msNavigationService,api,$cookies,$state)
    {
        var vm = this;
            vm.userType = localStorage.userType;
        $rootScope.selectedProject = {
                    project_id:$cookies.get('project_id') || '',
                    project_name:$cookies.get('project_name') || 'Select a Project'
        };
        vm.project = [];

        vm.profileDetails = {
            profileName: localStorage.profileName || '',
            profilePic:  localStorage.profilePicture || 'default.jpg'
        };

        vm.bodyEl = angular.element('body');
        vm.showLoader = true;

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.logout = logout;
        vm.toggleHorizontalMobileMenu = toggleHorizontalMobileMenu;
        vm.toggleMsNavigationFolded = toggleMsNavigationFolded;
        vm.getProjects  = getProjects;
        vm.selectProject = selectProject;
        //////////



        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

     
        /**
         * Logout Function
         */
        function logout()
        {
            // Do logout here..
            localStorage.removeItem('profileName');
            localStorage.removeItem('profilePicture');
            localStorage.removeItem('presence');
            localStorage.removeItem('userType');
            $state.go('app.login');
        }

       
        /**
         * Toggle horizontal mobile menu
         */
        function toggleHorizontalMobileMenu()
        {
            vm.bodyEl.toggleClass('ms-navigation-horizontal-mobile-menu-active');
        }

        /**
         * Toggle msNavigation folded
         */
        function toggleMsNavigationFolded()
        {
            msNavigationService.toggleFolded();
        }


        function getProjects()
        {
            vm.project = [];
            vm.showLoader = false;
            api.project.projectAll.get(success);
            function success(r)
            {
                
                vm.showLoader = true;
                vm.project = r;
                
            }
        }

        function selectProject(p)
        {
            $rootScope.selectedProject = {
                        project_id:p.project_id,
                        project_name:p.project_name
            };
            $cookies.put('project_id',p.project_id);
            $cookies.put('project_name',p.project_name);
            $state.reload();
        }
      

     
    }

})();
(function ()
{
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($state,$rootScope,api,toaster,LoaderService)
    {
        var vm = this;
        // Data

        // Methods
        vm.login = login;
        //////////


        function login (credentials)
        {
            LoaderService.loader();
            api.login.authenticate.save(credentials,success);

            function success(r)
            {
                if(r.status == 200)
                {

                    localStorage.setItem("presence", r.token);
                    localStorage.setItem('profileName',r.profileName);
                    localStorage.setItem('profilePicture',r.profilePic);
                    localStorage.setItem('userType',r.role);
                    $rootScope.userType = localStorage.userType;
                    if(r.role == 1)
                    {
                         $state.go('app.project');
                    }
                    else if(r.role == 2 || r.role == 3)
                    {
                         $state.go('app.employee-list');
                    }
                    else if(r.role == 4)
                    {
                       $state.go('app.under-construction');
                    }
                    else if(r.role == 5)
                    {
                       $state.go('app.complaint');
                    }
                    else if(r.role == 6)
                    {
                        $state.go('app.gadget');
                    }
                     else if(r.role == 7)
                    {
                        $state.go('app.shift');
                    }
                     else if(r.role == 8)
                    {
                        $state.go('app.trip-ticket');
                    }
                     else if(r.role == 9)
                    {
                        $state.go('app.under-construction');
                    }
                     else if(r.role == 10)
                    {
                        $state.go('app.under-construction');
                    }
                     else if(r.role == 11)
                    {
                        $state.go('app.complaint');
                    } 
                    else if(r.role == 12)
                    {
                        $state.go('app.under-construction');
                    }
                     else if(r.role == 13)
                    {
                        $state.go('app.under-construction');
                    }

                }
                else if(r.status == 401)
                {
                    toaster.pop('error','Invalid Credentials','Incorrect username or password.');
                }

                LoaderService.hide();
            }
        }
    }
})();
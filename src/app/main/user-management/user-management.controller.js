(function ()
{
    'use strict';

    angular
        .module('app.user-management')
        .controller('UserManagementController',UserManagementController);

    /** @ngInject */
    function UserManagementController($scope,$rootScope,api,ModalConfig,ProfilePic,LoaderService,toaster)
    {
        var bookmark;
        var vm      =   this;
            vm.query = {
                    order:'order',
                    limit: 5,
                    page: 1,
                    filter:'',
                    field:'username',
                    project_id:$rootScope.selectedProject.project_id
                };
            vm.lists = [];
            vm.ProfilePic = ProfilePic;
            vm.getLists = getLists;
            vm.add      = add;
            vm.changeStatus = changeStatus;
            vm.resetPassword = resetPassword;
            function getLists()
            {
                vm.promise = api.user.user.get(vm.query,success).$promise;
                function success (r)
                {
                    vm.lists = r;
                }
            }

            function add(ev)
            {
                var tempUrl     = 'app/main/user-management/dialog/user-management-dialog.html',
                    localData   = {data:null},
                    ctrl        = 'UserManagementDialogController',
                    ctrlAs      = 'dcvm';
                ModalConfig.customModal(tempUrl,ev,localData,ctrl,ctrlAs).then(vm.getLists);
            }

            function changeStatus(oid,stat)
            {
                LoaderService.loader();
                var datastring = {id:oid,status:stat};
                api.user.changeStatus.save(datastring,success);
                function success(r)
                {
                    if(r.status == 200)
                    {
                        toaster.pop('success','Status has been changed.');
                        getLists();
                    }
                    else
                    {
                        toaster.pop('error','Something went wrong.');
                    }
                    LoaderService.hide();
                }
            }

            function resetPassword(ev,oid,user)
            {
                var title   = 'Are you sure you want to reset this user password?',
                    content = 'The default password will be the username "'+user+'"';
                ModalConfig.confirmModal(title,content,ev).then(function () {
                    var datastring = {id:oid,username:user};
                    api.user.resetPassword.save(datastring,success);
                    function success(r)
                    {
                        if(r.status == 200)
                        {
                            toaster.pop('success','Password has been reset.');
                        }
                        else
                        {
                            toaster.pop('error','Something went wrong.');
                        }
                    }
                });
            }


         

            $scope.$watchCollection('vm.query.filter', function (newValue, oldValue) {
                if(!oldValue) {
                    bookmark = vm.query.page;
                }
                    
                if(newValue !== oldValue) {
                    vm.query.page = 1;
                }
                    
                if(!newValue) {
                    vm.query.page = bookmark;
                }
                    
                getLists();
            });
        
    }
})();
(function () {
	'use strict';
		angular
			.module('app.trip-ticket')
			.controller('TripTicketController',TripTicketController);

			/** @ngInject */
			function TripTicketController($rootScope,$scope,api,ModalConfig,$q,toaster)
			{
				var bookmark;
		        var vm      =   this;
		            vm.query = {
		                    order:'order',
		                    limit: 5,
		                    page: 1,
		                    filter:'',
		                    field:'trip_ticket_no',
		                    project_id:$rootScope.selectedProject.project_id
		                };
		            vm.lists = [];

		            vm.getLists = getLists;
		            function getLists()
		            {
		                vm.promise = api.tripTicket.tripTicket.get(vm.query,success).$promise;
		                function success (r)
		                {
		                    vm.lists = r;
		                }
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
(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Common 3rd Party Dependencies
            'textAngular',
            'xeditable',
            'md.data.table',
            'toaster',
            'mdPickers',
            'angularFileUpload',
            // Core
            'app.core',
            'app.toolbar',
            'app.navigation',
            'app.quick-panel',
            //Apps Module

            'app.login',
            'app.project',
            'app.position',
            'app.employment-status',
            'app.employee-status',
            'app.unit',
            'app.gadget-type',
            'app.collection-schedule',
            'app.collection-type',
            'app.employee-list',
            'app.striker',
            'app.gadget',
            'app.lunch-box',
            'app.shift',
            'app.gps',
            'app.equipment',
            'app.driver-assignment',
            'app.trip-ticket',
            'app.complaint',
            'app.complaint-dispatch',
            'app.gadget-accountability',
            'app.user-management',
            'app.under-construction',
            'app.item-type',
            'app.item-status',
            'app.item',
            'app.item-inventory'
            
        ]);
})();

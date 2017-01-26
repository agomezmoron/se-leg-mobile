/**
 * Application structure bootstraping.
 * @param {type} angular
 * @author Maria Villalba
 * @since Mon Nov 14 2016
 */
(function () {
  define([
    'angular',
    './core/main',
    // Main app module
    './main/main',
    // Components main files
'./components/scanner/main',
'./components/identification/main',
'./components/fingerprint/main',
'./components/message/main',
    // Another app modules.
    // Here application widgets
    './widgets/main'// Yeoman hook. Define section. Do not remove this comment.
  ],
    function (angular) {
      'use strict';

      var moduleName = 'app';

      angular
        .module(moduleName, [
          'ionic',
          'app.core',
          'app.main',
          // Components modules
'app.scanner',
'app.identification',
'app.fingerprint',
'app.message',
          'app.widgets'// Yeoman hook. Dependencies section. Do not remove this comment.
        ])
        .config(Config);

      /* @ ngInject */
      function Config($ionicConfigProvider, PermissionsProvider, SELEG_PERMISSIONS) {
        // Configure the max pages to save in cache
        $ionicConfigProvider.views.maxCache(1);

        // configuring the permissions to be handled
        PermissionsProvider.setConfigObject(SELEG_PERMISSIONS);
      }

      return moduleName;

    });
})();

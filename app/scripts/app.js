'use strict';

angular.module('megabyteApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/web-development', {
        templateUrl: 'views/web-development.html',
        controller: 'WebDevelopmentCtrl'
      })
      .when('/video', {
        templateUrl: 'views/video.html',
        controller: 'VideoCtrl'
      })
      .when('/team', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/music', {
        templateUrl: 'views/music.html',
        controller: 'MusicCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

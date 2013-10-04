'use strict';

angular.module('megabyteApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location) {
    $rootScope.category = 'Home';
    $rootScope.categories = ['Home', 'Websites', 'About'];
    $rootScope.activeNum = 0;
    $rootScope.active = [];
    $rootScope.websites = [
      {
        name: 'Tesser, Ryan, & Rochman, LLP',
        url: 'http://www.tesserryan.com',
        description: 'Attorney web site'
      },
      {
        name: 'Qwote',
        screenshot: 'qwote.jpg',
        description: 'Major Label Artist Web Site'
      }
    ];
    $rootScope.next = function(){
      $rootScope.activeNum++;
    }
    $rootScope.prev = function(){
      $rootScope.activeNum--;
    }
    window.loc = $location;
    window.rs = $rootScope;
    var amount = 0;
    $rootScope.setActive = function (cat){
      $rootScope.category = cat;
      $rootScope.active = $rootScope[cat.toLowerCase()];
      $location.path(cat == 'Home' ? '' : '/' + cat.toLowerCase());
      amount = amount== 0 ? 360 : 0;
      $('.scene .cub-1').css({
        '-webkit-transform': 'translate3D(0em, 18em, -13em) rotateX(0deg) rotateY(' + amount +'deg)',
        '-moz-transform': "translate3D(0em, 18em, -13em) rotateX(0deg) rotateY(" + amount +"deg)",
        '-ms-transform': 'translate3D(0em, 18em, -13em) rotateX(0deg) rotateY(' + amount +'deg)',
        'transform': 'translate3D(0em, 18em, -13em) rotateX(0deg) rotateY(' + amount +'deg)'
    });
      if (!$scope.$$phase) $scope.$apply();
    };

  });

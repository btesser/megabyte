'use strict';

describe('Controller: WebDevelopmentCtrl', function () {

  // load the controller's module
  beforeEach(module('megabyteApp'));

  var WebDevelopmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebDevelopmentCtrl = $controller('WebDevelopmentCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

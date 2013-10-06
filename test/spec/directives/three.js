'use strict';

describe('Directive: three', function () {

  // load the directive's module
  beforeEach(module('megabyteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<three></three>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the three directive');
  }));
});

describe("namedRouteDirective", function () {
   var $compile, $rootScope;

  beforeEach(module('testmodule'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_,
    $rootScope = _$rootScope_;
  }));

  it('updates href with home route', function() {
    var element = $compile('<div><a named-route="\'home\'">link</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('href="/"');
  });

  it('updates href with phone detail route, single arg', function() {
    $rootScope.hrefname = 'the link';
    var element = $compile('<div><a named-route="\'phone-detail\'" route-params="1">{{hrefname}}</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('href="/phones/1"');
    expect(element.html()).toContain('the link');
  });

  it('updates href with phone detail route, object arg', function() {
    var element = $compile('<div><a named-route="\'phone-detail\'" route-params="{phoneId: 1}">link</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('href="/phones/1"');
  });

  it('updates href with phone detail route, array arg', function() {
    var element = $compile('<div><a named-route="\'phone-detail\'" route-params="[1]">link</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('href="/phones/1"');
  });

  it('updates href with phone detail route, bound args', function() {
    var element = $compile('<div><a named-route="route" route-params="params">link</a></div>')($rootScope);
    $rootScope.params = 1;
    $rootScope.route = 'phone-detail';
    $rootScope.$digest();
    expect(element.html()).toContain('href="/phones/1"');
    $rootScope.params = 2;
    $rootScope.$digest();
    expect(element.html()).toContain('href="/phones/2"');
  });

  it('does not crash and burn if params provided later', function() {
    var element = $compile('<div><a named-route="route" route-params="params">link</a></div>')($rootScope);
    $rootScope.route = 'phone-detail';
    $rootScope.$digest();
    expect(element.html()).toContain('href="/phones/?"');
    $rootScope.params = 1;
    $rootScope.$digest();
    expect(element.html()).toContain('href="/phones/1"');
  });


});

describe('namedRouteDirective_hash', function () {
  beforeEach(module('testmodule_hash'));

  var namedRouteService, $compile, $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_,
    $rootScope = _$rootScope_;
  }));


  it('updates href with hashed home route', function() {
    var element = $compile('<div><a named-route="\'home\'">link</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('href="#!/"');
  });


  it('updates href with phone detail route, single arg', function() {
    $rootScope.hrefname = 'the link';
    var element = $compile('<div><a named-route="\'phone-detail\'" route-params="1">{{hrefname}}</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('href="#!/phones/1"');
    expect(element.html()).toContain('the link');
  });

});
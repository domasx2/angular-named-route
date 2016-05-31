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
    expect(element.find('a').attr('href')).toEqual('/');
  });

  it('updates href with phone detail route, single arg', function() {
    $rootScope.hrefname = 'the link';
    var element = $compile('<div><a named-route="\'phone-detail\'" route-params="1">{{hrefname}}</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('/phones/1');
    expect(element.html()).toContain('the link');
  });

  it('updates href with phone detail route, object arg', function() {
    var element = $compile('<div><a named-route="\'phone-detail\'" route-params="{phoneId: 1}">link</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('/phones/1');
  });

  it('updates href with phone detail route, array arg', function() {
    var element = $compile('<div><a named-route="\'phone-detail\'" route-params="[1]">link</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('/phones/1');
  });

  it('updates href with phone detail route, bound args', function() {
    var element = $compile('<div><a named-route="route" route-params="params">link</a></div>')($rootScope);
    $rootScope.params = 1;
    $rootScope.route = 'phone-detail';
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('/phones/1');
    $rootScope.params = 2;
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('/phones/2');
  });

  it('does not crash and burn if params provided later', function() {
    var element = $compile('<div><a named-route="route" route-params="params">link</a></div>')($rootScope);
    $rootScope.route = 'phone-detail';
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('/phones/?');
    $rootScope.params = 1;
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('/phones/1');
  });

  it('updates href with phone detail route, query params', function() {
    $rootScope.hrefname = 'the link';
    var element = $compile('<div><a named-route="\'phone-detail\'" route-params="1" route-query-params="{foo:[\'bar\', \'baz\'], bar: \'baz\'}">{{hrefname}}</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('/phones/1?foo=bar&foo=baz&bar=baz');
    expect(element.html()).toContain('the link');
  });


});

describe('namedRouteDirective_hash', function () {
  beforeEach(module('testmodule_hash'));

  var $compile, $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_,
    $rootScope = _$rootScope_;
  }));


  it('updates href with hashed home route', function() {
    var element = $compile('<div><a named-route="\'home\'">link</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('#!/');
  });


  it('updates href with phone detail route, single arg', function() {
    $rootScope.hrefname = 'the link';
    var element = $compile('<div><a named-route="\'phone-detail\'" route-params="1">{{hrefname}}</a></div>')($rootScope);
    $rootScope.$digest();
    expect(element.find('a').attr('href')).toEqual('#!/phones/1');
    expect(element.html()).toContain('the link');
  });

});

describe('namedRouteService_base', function () {
  beforeEach(module('testmodule'));

  var $compile, $rootScope;

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_,
    $rootScope = _$rootScope_;
  }));

  it('updates href with hashed home route', function() {
    inject(
      initBrowser({ url: 'http://host.com/prefix/', basePath: '/prefix' }),
      function () {
        var element = $compile('<div><a named-route="\'home\'">link</a></div>')($rootScope);
        $rootScope.$digest();
        expect(element.find('a').attr('href')).toEqual('/prefix/');
      }
    );
  });

  it('updates href with phone detail route, single arg', function() {
    inject(
      initBrowser({ url: 'http://host.com/prefix/', basePath: '/prefix' }),
      function () {
        $rootScope.hrefname = 'the link';
        var element = $compile('<div><a named-route="\'phone-detail\'" route-params="1">{{hrefname}}</a></div>')($rootScope);
        $rootScope.$digest();
        expect(element.find('a').attr('href')).toEqual('/prefix/phones/1');
        expect(element.html()).toContain('the link');
      }
    );
  });

  /* From: https://github.com/angular/angular.js/blob/fa79eaa816aa27c6d1b3c084b8372f9c17c8d5a3/test/ng/locationSpec.js#L2630,L2635 */
  function initBrowser(options) {
    return function($browser) {
      $browser.url(options.url);
      $browser.$$baseHref = options.basePath;
    };
  }
});

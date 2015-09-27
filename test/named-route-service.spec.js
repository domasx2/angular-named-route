describe('namedRouteService', function() {
  beforeEach(module('testmodule'));

  var namedRouteService;

  beforeEach(inject(function(_namedRouteService_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    namedRouteService = _namedRouteService_;
  }));

  it('resolves home route', function() {
    expect(namedRouteService.reverse('home')).toEqual('/');
  });

  it('resolves phone detail route using single parameter', function() {
    expect(namedRouteService.reverse('phone-detail', 2)).toEqual('/phones/2');
  });

  it('resolves phone detail route using array parameter', function() {
    expect(namedRouteService.reverse('phone-detail', [2])).toEqual('/phones/2');
  });

  it('resolves phone model detail route using array parameter', function() {
    expect(namedRouteService.reverse('phone-model-detail', [2, 'c'])).toEqual('/phones/2/models/c');
  });

  it('resolves phone detail route using object parameter', function() {
    expect(namedRouteService.reverse('phone-model-detail', {phoneId: 2, modelId: 'c'})).toEqual('/phones/2/models/c');
  });

  it('optional parameter can be ignored', function () {
    expect(namedRouteService.reverse('optional-param-route')).toEqual('/optional/');
  });

  it('optional parameter can be provided', function () {
    expect(namedRouteService.reverse('optional-param-route', 'test')).toEqual('/optional/test');
  });

  it('greedy parameter also works', function () {
    expect(namedRouteService.reverse('admin-greedy', 3)).toEqual('/admin/3/view');
  });

  it('optional parameter can be provided using object', function () {
    expect(namedRouteService.reverse('optional-param-route', {subpath: 'test'})).toEqual('/optional/test');
  });

  it('greedy parameter also works using object', function () {
    expect(namedRouteService.reverse('admin-greedy', {page: 'ten/ne'})).toEqual('/admin/ten/ne/view');
  });

  it('query parameter works', function () {
    expect(namedRouteService.reverse('phone-detail', 2, {foo: 'bar', bar:'baz'})).toEqual('/phones/2?foo=bar&bar=baz');
  });

  it('array query parameter works', function () {
    expect(namedRouteService.reverse('phone-detail', 2, {foo: ['bar', 'baz'], bar:'baz'})).toEqual('/phones/2?foo=bar&foo=baz&bar=baz');
  });
});

describe('namedRouteService_hash', function () {
  beforeEach(module('testmodule_hash'));

  var namedRouteService;

  beforeEach(inject(function(_namedRouteService_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    namedRouteService = _namedRouteService_;
  }));

  it('resolves home route', function() {
    expect(namedRouteService.reverse('home')).toEqual('/');
  });

  it('resolves phone detail route using single parameter', function() {
    expect(namedRouteService.reverse('phone-detail', 2)).toEqual('/phones/2');
  });

});
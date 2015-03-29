describe('namedRouteService', function() {
  beforeEach(module('testmodule'));

  var namedRouteService

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
});
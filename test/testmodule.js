angular.module('testmodule', ['ngRoute', 'ngNamedRoute']).config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        controller: 'PhoneListCtrl',
        name: 'home'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl',
        name: 'phone-detail'
      })
      .when('/phones/:phoneId/models/:modelId', {
        controller: 'PhoneModelDetailCtrl',
        name: 'phone-model-detail'
      })
      .when('/optional/:subpath?', {
        controller: 'PhoneModelDetailCtrl',
        name: 'optional-param-route'
      })
      .when('/admin/:page*/view', {
        controller: 'AdminCtrl',
        name: 'admin-greedy'
      })
});

angular.module('testmodule_hash', ['ngRoute', 'ngNamedRoute']).config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
    $routeProvider.
    when('/', {
      controller: 'PhoneListCtrl',
      name: 'home'
    }).
    when('/phones/:phoneId', {
      templateUrl: 'partials/phone-detail.html',
      controller: 'PhoneDetailCtrl',
      name: 'phone-detail'
    });
});
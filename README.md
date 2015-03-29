Angular named route
===========================
Named route support for angular-route. Name your routes so you don't have to copy-paste-replace url everywhere.
# Install

```sh 
bower install angular-named-route --save
```

or just grab dist/angular-named-route.js

# Usage

```javascript
//include it in your app
angular.module('myapp', ['ngRoute', 'ngNamedRoute']);

//provide names to routes
angular.module('myapp').config(function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'HomeCtrl',
        name: 'home'
      }).
      when('/thing/:id', {
        controller: 'ThingCtrl',
        name: 'thing-detail'
      });
});

//use as a service
angular.module('myapp').controller('ThingCtrl', function (namedRouteService, $location) {
    var path;
    
    //reverse to get path string
    path = namedRouteService.reverse('home'); // '/'

    //single param
    path = namedRouteService.reverse('thing-detail', 1); // '/thing/1'

    //param list
    path = namedRouteService.reverse('thing-detail', [1]); // '/thing/1'

    //param object
    path = namedRouteService.reverse('thing-detail', {id: 1}); // '/thing/1'

    //open immediately
    namedRouteServie.open('thing-detail', 1);
    //is same as
    $location.path(namedRouteService.reverse('thing-detail', 1));
});
```

'named-route' directive to set href attribute:
```html
<a named-route="'home'">home</a>

<a named-route="'thing-detail'" route-params="1">first thing</a>

<a named-route="'thing-detail'" route-params="{id: 1}">first thing</a>
```

# Development

## Install

```sh
npm install gulp-cli -g
npm install
```

## Build

```sh
gulp build
```

## Test

```sh
npm test
```
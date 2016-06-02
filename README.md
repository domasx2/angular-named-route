[![Build Status](https://travis-ci.org/domasx2/angular-named-route.svg)](https://travis-ci.org/domasx2/angular-named-route)

Angular named route
===========================

Named route support for angular-route. Name your routes so you don't have to copy-paste-replace URLs everywhere. Automatically prefixes [`<base />` href][rellink] so that all links created work in HTML 5 mode.

[rellink]: https://docs.angularjs.org/guide/$location#relative-links

# Install

### Bower

```sh
bower install angular-named-route --save
```

```html
<script src="bower_components/angular-named-route/dist/angular-named-route.js" />
```


### NPM

```sh
npm install angular-named-route --save
```


```html
<script src="node_modules/angular-named-route/dist/angular-named-route.js" />
```

or in case of webpack/browserify and npm

```js
import 'angular-named-route';
```


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
    path = namedRouteService.reverse('home');
    //path = '/'

    //single param
    path = namedRouteService.reverse('thing-detail', 1);
    //path = '/thing/1'

    //param list
    path = namedRouteService.reverse('thing-detail', [1]);
    //path = '/thing/1'

    //param object
    path = namedRouteService.reverse('thing-detail', {id: 1});
    //path = '/thing/1'

    //query arguments
    path = namedRouteService.reverse('thing-detail', 1, {foo: 'bar', 'baz': ['blah', 'meh']});
    //path = '/thing/1?foo=bar&baz=blah&baz=meh'

    //open immediately
    namedRouteService.open('thing-detail', 1);
    //is same as
    $location.path(namedRouteService.reverse('thing-detail', 1));
});
```

'named-route' directive to set href attribute:
```html
<a named-route="'home'">home</a>

<a named-route="'thing-detail'" route-params="1">first thing</a>

<a named-route="'thing-detail'" route-params="{id: 1}">first thing</a>

<a named-route="'thing-detail'" route-params="1" route-query-params="{foo: 'bar'}">first thing</a>
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

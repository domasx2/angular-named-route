angular.module('ngNamedRoute').factory('namedRouteService', function ($route, $location) {
    'use strict';

    //map name to route
    var routemap = {};

    Object.keys($route.routes).forEach(function (path) {
        var route = $route.routes[path];
        if (route.name) {
            if (routemap.hasOwnProperty(route.name)) {
                throw new Error("Route name [" + route.name + "] defined more than once.");
            }
            routemap[route.name] = {
                path: path,
                route: route
            };
        }
    });

    function reverse(name, args) {
        var idx = -1;

        if (!routemap.hasOwnProperty(name)) {
            throw new Error("Route name [" + name + "] not known.");
        }

        return routemap[name].path.replace(/(:\w+[\*\?]{0,1})/g, function (match, p) {
            idx++;

            p = p.substring(1);

            var placeholder = p[p.length - 1] === '?' ? '' : '?';
            if (p[p.length - 1] === '*' || p[p.length - 1] === '?') {
                p = p.substring(0, p.length - 1);
            }

            //arguments is an array: resolve positional parameter
            if (angular.isArray(args)) {
                return idx < args.length ? args[idx] : placeholder;
            }

            //argument is an object: resolve property
            if (angular.isObject(args)) {
                if (args.hasOwnProperty(p)) {
                    return args[p];
                }
                return placeholder;
            }

            //it's string or number, return as is, unless more than one is required
            if (!idx) {
                return args === undefined ? placeholder : args;
            }

            return '?';
        });
    }

    return {
        reverse: reverse,
        open: function (name, args) {
            $location.path(reverse(name, args));
        }
    };
});
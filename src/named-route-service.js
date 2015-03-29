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

        return routemap[name].path.replace(/(:\w+)/g, function (match, p) {
            idx++;

            p = p.substring(1);

            //arguments is an array: resolve positional parameter
            if (angular.isArray(args)) {
                return args[idx];
            }

            //argument is an object: resolve property
            if (angular.isObject(args)) {
                if (args.hasOwnProperty(p)) {
                    return args[p];
                }
                return '?';
            }

            //it's string or number, return as is, unless more than one is required
            if (!idx) {
                return args === undefined ? '?' : args;
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
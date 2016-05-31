angular.module('ngNamedRoute').provider('namedRouteService', function ($locationProvider) {
    'use strict';

    /** Internal configuration variable. */
    var shouldAlwaysPrefixBase = false;

    /**
     * Sets whether the service should always prefix the <base href />.
     */
    this.alwaysPrefixBase = function (value) {
        if (value === undefined) {
            return shouldAlwaysPrefixBase;
        }

        shouldAlwaysPrefixBase = value;

        return this;
    };

    this.$get = /*@ngInject*/ function ($route, $location, $browser) {
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

        function reverse(name, args, query_params) {
            var idx = -1, url;

            if (!routemap.hasOwnProperty(name)) {
                throw new Error("Route name [" + name + "] not known.");
            }

            url = routemap[name].path.replace(/(:\w+[\*\?]{0,1})/g, function (match, p) {
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

            if (query_params) {
                url += '?' + Object.keys(query_params).map(function (key) {
                    var val = query_params[key];
                    if (angular.isArray(val)) {
                        return val.map(function (val) {
                            return key + '=' + encodeURIComponent(val);
                        }).join('&');
                    }
                    return key + '=' + encodeURIComponent(val);
                }).join('&');
            }

            if (shouldAlwaysPrefixBase) {
                if ($browser.baseHref() === '/') {
                    // No need to append '/'
                    return url;
                }
                // Prepend the base href
                return $browser.baseHref() + url;
            }

            return url;
        }

        return {
            reverse: reverse,
            open: function (name, args) {
                $location.path(reverse(name, args));
            },
            hashPrefix: function () { return $locationProvider.hashPrefix(); }
        };
    };
});

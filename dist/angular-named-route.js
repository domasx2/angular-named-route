angular.module("ngNamedRoute",[]),angular.module("ngNamedRoute").directive("namedRoute",["$location","namedRouteService",function(e,n){"use strict";return{restrict:"A",scope:{name:"=namedRoute",args:"=routeParams"},link:function(r,t){function a(){void 0!==r.name&&t.attr("href",(e.$$html5?"":"#"+n.hashPrefix())+n.reverse(r.name,r.args))}r.$watch("name",a),r.$watch("args",a,!0)}}}]),angular.module("ngNamedRoute").provider("namedRouteService",["$locationProvider",function(e){"use strict";this.$get=["$route","$location",function(n,r){function t(e,n){var r=-1;if(!a.hasOwnProperty(e))throw new Error("Route name ["+e+"] not known.");return a[e].path.replace(/(:\w+[\*\?]{0,1})/g,function(e,t){r++,t=t.substring(1);var a="?"===t[t.length-1]?"":"?";return("*"===t[t.length-1]||"?"===t[t.length-1])&&(t=t.substring(0,t.length-1)),angular.isArray(n)?r<n.length?n[r]:a:angular.isObject(n)?n.hasOwnProperty(t)?n[t]:a:r?"?":void 0===n?a:n})}var a={};return Object.keys(n.routes).forEach(function(e){var r=n.routes[e];if(r.name){if(a.hasOwnProperty(r.name))throw new Error("Route name ["+r.name+"] defined more than once.");a[r.name]={path:e,route:r}}}),{reverse:t,open:function(e,n){r.path(t(e,n))},hashPrefix:function(){return e.hashPrefix()}}}]}]);
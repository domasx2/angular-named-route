angular.module('ngNamedRoute').directive('namedRoute', function (namedRouteService) {
    'use strict';

    return {
        restrict: 'A',
        transclude: true,
        scope: {
            name: '=namedRoute',
            args: '=routeParams'
        },
        link: function ($scope, $element) {

            function updateHref() {
                if ($scope.name !== undefined) {
                    $element.attr('href', namedRouteService.reverse($scope.name, $scope.args));
                }
            }

            $scope.$watch('name', updateHref);
            $scope.$watch('args', updateHref, true);
        }
    };
});
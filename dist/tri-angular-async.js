/* global window */
(function (ng, app) {
    'use strict';

    /*jshint -W074 */
    app.provider('$async', function () {

        // !! cyclomatic complexity 6
        var async = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame   ||
            window.mozRequestAnimationFrame      ||
            window.oRequestAnimationFrame        ||
            window.msRequestAnimationFrame       ||
            function (fnCaller) {
                return window.setTimeout(fnCaller, 21);
            };

        var asyncService = function ($log, $rootScope) {

            // mode can be a $scope, any truth-y value (will prevent $digest()) or may not be
            // so old API works just like it has
            var future = function (fn, mode) {

                // normally lets $rootScope.$digest()
                var scope = $rootScope;

                if (mode) {
                    // but if scope is passed, let's call scope.$digest() or
                    // if other truth-y arg is passed (not a scope) just
                    // don't $digest()
                    scope = angular.isFunction(mode.$digest) ? mode : null;
                }

                // as we know proper mode (clean/localScope/rootScope) we can
                // run the callback in some near future
                return async(function () {

                    // user may break something
                    try {
                        fn();
                    } catch (e) {
                        // if he does - let him know that it has happened in $async
                        e.message = e.message + ' :: triNgAsync.$async';
                        $log.error(e);
                    } finally {
                        // finally let's $digest() localScope or rootScope (or do nothing)
                        scope && scope.$digest();
                    }
                });
            };

            return angular.extend(future, {

                // nice way to call without $digest in coffee
                // $async.clean -> doSomething()
                clean: function (fn) {
                    return this(fn, true);
                },

                // nice way to call with local $digest in coffee
                // $async.clean $scope, -> doSomething()
                local: function (scope, fn) {
                    return this(fn, scope);
                }
            });

        };

        return {
            $get: ['$log', '$rootScope', asyncService]
        };
    });

}(angular, angular.module('triNgAsync', ['ng'])));
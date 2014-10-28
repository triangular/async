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

        var asyncService = function ($log, $root) {
            var future = function (fn, mode) {
                var scope = $root;

                if (mode) {
                    scope = angular.isFunction(mode.$destroy) ? mode : null;
                }

                return async(function () {
                    try {
                        fn();
                    } catch (e) {
                        e.message = e.message + ' :: triNgAsync.$async';
                        $log.error(e);
                    } finally {
                        scope && scope.$digest();
                    }
                });
            };

            return angular.extend(future, {
                clean: function (fn) {
                    return this(fn, true);
                },

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
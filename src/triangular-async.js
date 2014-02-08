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

        var AsyncService = function ($log, $root) {
            return function (fn) {
                async(function () {
                    try {
                        fn();
                    } catch (e) {
                        $log.error(e);
                    } finally {
                        $root.$apply();
                    }
                });
            };
        };

        return {
            $get: ['$log', '$rootScope', AsyncService]
        };
    });

}(angular, angular.module('triAsync', [])));
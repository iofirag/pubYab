(function () {
    angular.module("app").controller("home", constructor);

    'use strict';

    constructor.$inject = ['$scope', '$rootScope'];

    function constructor($scope, $rootScope) {

        var vm = this;
        var root = $rootScope;
        var LOG_TAG = 'home';

        //vars
            vm.windowName = 'Actions';
            vm.subName = 'Action Sub actions';
            vm.input = 'Hi john';


        //functions




    }
})();
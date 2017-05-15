'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function controller($scope) {

    //const
    var vm = this;
    var loggerManager = void 0;
    var moduleName = 'pubYav';

    var OPEN_PUBYAV = 'pubYab.open';
    var CLOSE_PUBYAV = 'pubYab.close';
    var INIT_PUBYAV = 'pubYab.init';

    //vars
    vm.property = {};

    //functions
    vm.$onInit = onInit;
    vm.openWindow = openWindow;
    vm.closeWindow = closeWindow;

    /**
     * @desc on initiation
     */
    function onInit() {
        if (!vm.uuid) {
            throw 'Please provide dialogId in magic \n for example:::\n <div uuid="thisIsId"></div>';
        }

        loggerManager = new logger(vm.debug);

        $scope.$on(INIT_PUBYAV, function (e, args) {
            openDataState();
            vm.magic = {
                uuid: args.uuid
            };
        });

        $scope.$on(OPEN_PUBYAV, function (e, args) {
            vm.magic = {
                uuid: args.uuid,
                message: args.message,
                state: args.state
            };
        });

        $scope.$on(CLOSE_PUBYAV, function (e, args) {
            vm.magic = {
                uuid: args.uuid,
                message: args.message,
                state: args.state
            };
        });
        notifyBroadCast(false, true);
    }

    function closeWindow() {
        vm.status = false;
        openDataState();
        notifyBroadCast(vm.status);
    }

    /**
     * @desc open and close window
     */
    function openWindow(e) {
        if (e.target.nodeName === 'path' || e.target.nodeName === 'svg') return;
        vm.status = true;
        openDataState();
        notifyBroadCast(vm.status);
    }

    /**
     * @desc notify by broad cast on the event
     * @param boolean
     * @param init
     */
    function notifyBroadCast(boolean, init) {
        if (init) {
            $scope.$emit(INIT_PUBYAV, { uuid: vm.uuid });
            return;
        }
        var eventName = boolean ? OPEN_PUBYAV : CLOSE_PUBYAV;
        var eventMessage = boolean ? moduleName + ' ' + vm.name + ' open' : moduleName + ' ' + vm.name + ' close';
        loggerManager.log(eventMessage);
        $scope.$emit(eventName, { uuid: vm.uuid, message: eventMessage, state: boolean });
    }

    /**
     * @dec open and close the state of the window
     */
    function openDataState() {
        if (vm.status) {
            vm.property.name = vm.name;
            vm.property.second = vm.second;
            vm.property.content = vm.content;
            vm.property.hr = true;
        } else vm.property = { name: vm.name };
    }
}

var logger = function () {
    function logger() {
        var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        _classCallCheck(this, logger);

        this.debug = debug;
    }

    _createClass(logger, [{
        key: 'log',
        value: function log(msg) {
            if (this.debug) console.debug(msg);
        }
    }]);

    return logger;
}();

angular.module('app').component('magic', {
    bindings: {
        name: '<',
        uuid: '<',
        second: '<',
        content: '<',
        debug: '<'
    },
    templateUrl: 'component/myFirstComponent/view.html',
    controller: controller
});
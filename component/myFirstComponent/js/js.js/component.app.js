'use strict';

function controller($scope) {

    //const
    var moduleName = 'pubYav';
    var open = moduleName + this.name + ' open';
    var close = moduleName + this.name + ' close';
    var self = this;
    self.property = {};

    var OPEN_PUBYAV = 'pubYab.open';
    var CLOSE_PUBYAV = 'pubYab.close';
    var INIT_PUBYAV = 'pubYab.init';

    //vars
    var vm = this;

    //functions
    this.$onInit = onInit;
    this.openWindow = openWindow;

    /**
     * @desc on initiation
     */
    function onInit() {
        console.log('init ready');
        if (!self.uuid) {
            console.log(self);
            throw 'Please provide dialogId in magic \n for example:::\n <div uuid="thisIsId"></div>';
        }

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

    /**
     * @desc open and close window
     */
    function openWindow() {
        vm.status = vm.status ? false : true;
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
            $scope.$emit(INIT_PUBYAV, { uuid: self.uuid });
            return;
        }
        var eventName = boolean ? OPEN_PUBYAV : CLOSE_PUBYAV;
        var eventMessage = boolean ? open : close;
        $scope.$emit(eventName, { uuid: self.uuid, message: eventMessage, state: boolean });
    }

    /**
     * @dec open and close the state of the window
     */
    function openDataState() {
        if (vm.status) {
            self.property.name = self.name;
            self.property.second = self.second;
            self.property.hr = true;
        } else self.property = {
            name: self.name
        };
    }
}

angular.module('app').component('magic', {
    bindings: {
        name: '<',
        uuid: '<',
        second: '<'
    },

    templateUrl: 'component/myFirstComponent/view.html',
    controller: controller

});
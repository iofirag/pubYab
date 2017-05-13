function controller($scope){

    //const
        const moduleName = 'pubYav';
        const open = moduleName + this.name +' open';
        const close = moduleName + this.name +' close';
        var vm = this;


        const OPEN_PUBYAV = 'pubYab.open';
        const CLOSE_PUBYAV = 'pubYab.close';
        const INIT_PUBYAV = 'pubYab.init';



    //vars
    vm.property = {};


    //functions
    vm.$onInit = onInit;
    vm.openWindow = openWindow;
    vm.closeWindow = closeWindow;


    /**
     * @desc on initiation
     */
    function onInit(){
        console.log('init ready');
        if(!vm.uuid){
            console.log(vm);
            throw ('Please provide dialogId in magic \n for example:::\n <div uuid="thisIsId"></div>');
        }

        $scope.$on(INIT_PUBYAV, (e , args) => {
            openDataState();
            vm.magic = {
               uuid: args.uuid
           };
        });

        $scope.$on(OPEN_PUBYAV , (e , args) => {
            vm.magic = {
                uuid: args.uuid,
                message: args.message,
                state : args.state
            };
        })

        $scope.$on(CLOSE_PUBYAV , (e , args) => {
            vm.magic = {
            uuid: args.uuid,
            message: args.message,
            state : args.state
        };
    })

        notifyBroadCast(false , true);
    }


    function closeWindow(){
        vm.status =  false ;
        openDataState();
        notifyBroadCast(vm.status);
    }

    /**
     * @desc open and close window
     */
    function openWindow(){
        vm.status =  true;
        openDataState();
        notifyBroadCast(vm.status);
    }


    /**
     * @desc notify by broad cast on the event
     * @param boolean
     * @param init
     */
    function notifyBroadCast(boolean , init){
        if(init){
            $scope.$emit(INIT_PUBYAV , {uuid : vm.uuid});
            return;
        }
        var eventName = (boolean) ? OPEN_PUBYAV : CLOSE_PUBYAV;
        var eventMessage = (boolean) ? open : close;
        $scope.$emit(eventName , {uuid : vm.uuid , message: eventMessage , state : boolean});

    }


    /**
     * @dec open and close the state of the window
     */
    function openDataState(){
        if(vm.status) {
            vm.property.name = vm.name;
            vm.property.second = vm.second;
            vm.property.hr = true;
        }else
            vm.property = {
                name: vm.name
            }
    }

}


angular.module('app')
    .component('magic' , {
        bindings: {
            name : '<',
            uuid: '<',
            second: '<'
        },

        templateUrl:'component/myFirstComponent/view.html',
        controller : controller

    });



(function () {
    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);


    reviewModalCtrl.$inject = ['$modalInstance', 'locationData'];
    function reviewModalCtrl ($modalInstance, locationData) {
        var vm = this;
        vm.locationData = locationData;


        vm.doTest = function(){
          console.log(" -->> Is this working??");
            return false;
        };

        vm.onSubmit = function() {

            console.log(" ** Running inside onSubmit function of reviewModalCtrl ** ");

            vm.formError = " Waht Up!!";
            if(!vm.locationData.name || !vm.locationData.reviewText) {
                vm.formError = "Fill in the FIELDS";
            } else {
                console.log("*****>> " + locationData.name + " | " + locationData.reviewText);
            }

            console.log(vm.formError);

        };

        vm.modal = {
        cancel : function () {
            $modalInstance.dismiss('cancel');
        }
    };
}
})();
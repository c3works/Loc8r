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
            if(!vm.formData.name || !vm.formData.reviewText) {
                vm.formError = "Fill in the FIELDS";
            } else {
                console.log("*****>> " + formData.name + " | " + formData.reviewText);
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
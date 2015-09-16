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
            console.log(vm.formData);
            return false;

            //vm.formError = " Waht Up!!";
            //if(!vm.formData.name || !vm.formData.reviewText) {
            //    vm.formError = "Fill in the FIELDS";
            //} else {
            //    console.log("*****>> " + vm.formData.name + " | " + vm.formData.reviewText);
            //}
            //
            //console.log(vm.formError);

        };

        vm.modal = {
        cancel : function () {
            $modalInstance.dismiss('cancel');
        }
    };
}
})();
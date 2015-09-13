(function () {
    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);


    reviewModalCtrl.$inject = ['$modalInstance', 'locationData'];
    function reviewModalCtrl ($modalInstance, locationData) {
        var vm = this;
        vm.locationData = locationData;

        vm.onSubmit = function(){
          vm.formError = "";
            if(!vm.formData.name || !vm.formData.reviewText) {
                vm.formError = "Fill in the FIELDS";
                return false;
            } else {
                console.log("*****>> " + formData.name + " | " + formData.reviewText);
            }
        };

        vm.modal = {
        cancel : function () {
            $modalInstance.dismiss('cancel');
        }
    };
}
})();
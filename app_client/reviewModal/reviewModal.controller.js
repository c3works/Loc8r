(function () {
    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);


    reviewModalCtrl.$inject = ['$modalInstance', 'locationData', 'loc8rData'];
    function reviewModalCtrl ($modalInstance, locationData, loc8rData) {
        var vm = this;
        vm.locationData = locationData;

        vm.onSubmit = function() {

            console.log(" ** Running inside onSubmit function of reviewModalCtrl ** ");


            vm.formError = "";

            if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "We need all the FIELDS, please";
                return false;
            } else {
                console.log(vm.formData);
                vm.doAddReview(vm.locationData.locationid, vm.formData);
                return false;
            }

        };

        vm.doAddReview = function(locationid, formData) {
            loc8rData.addReviewById(locationid, {
                author : formData.name,
                rating : formData.rating,
                reviewText : formData.reviewText
            })
                .success(function(data){
                    console.log("Success!");
                    vm.modal.close(data);
                })
                .error(function(data){
                    vm.formError = "Your review was not saved - try again!";
                });
            return false;
        };

        vm.modal = {

            close: function(result){
                $modalInstance.close(result);
            },

            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
    };
}
})();
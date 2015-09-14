(function () {
    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);


    reviewModalCtrl.$inject = ['$modalInstance', 'loc8rData', 'locationData'];
    function reviewModalCtrl ($modalInstance, loc8rData, locationData) {
        var vm = this;
        vm.locationData = locationData;


        //vm.doTest = function(){
        //  console.log(" -->> Is this working??");
        //    return false;
        //};

        vm.onSubmit = function() {

            console.log(" ** Running inside onSubmit function of reviewModalCtrl ** ");
            console.log(vm.locationData);
            console.log(vm.locationData.name + " | " + vm.locationData.locationid);

            //vm.formError = " Waht Up!!";
            if(!vm.locationData.name || !vm.locationData.rating || !vm.locationData.reviewText) {
                vm.formError = "Fill in the FIELDS";
                return false;
            } else {
                console.log("*****>> " + locationData.name + " | " + locationData.rating +  " | " + locationData.reviewText);
                vm.doAddReview(vm.locationData.locationid, vm.locationData);
            }

            //console.log(vm.formError);

        };

        vm.doAddReview = function(locationid, locationData) {
            loc8rData.addReviewById(locationid, {
                author: locationData.name,
                rating: locationData.rating,
                reviewText: locationData.reviewText
            })
                .success(function(data){
                    console.log("Success!");
                    vm.modal.close(data);
                })
                .error(function(data){
                    vm.formError = "Your review has not been saved. Try again.";
                });
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
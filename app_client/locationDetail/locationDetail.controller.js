(function() {
    angular
        .module('loc8rApp')
        .controller('locationDetailCtrl', locationDetailCtrl);


    locationDetailCtrl.$inject = ['$routeParams','$modal', 'loc8rData'];
    function locationDetailCtrl ($routeParams, $modal, loc8rData){
        var vm = this;
        vm.locationid = $routeParams.locationid;

        loc8rData.locationById(vm.locationid)
            .success(function(data){
                vm.data = { location: data };
                vm.pageHeader = {
                    title: vm.data.location.name
                }
            })
            .error(function(e){
               console.log(e);
            });

        vm.popupReviewForm = function() {
            //alert("Let's add a review!")
            var modalInstance = $modal.open({
                templateUrl: '/reviewModal/reviewModal.view.html',
                controller: 'reviewModalCtrl as vm',
                resolve: {
                    locationData: function(){
                        return {
                            locationid: vm.locationid,
                            name: vm.data.location.name,
                            reviewText: vm.data.location.reviewText
                        };
                    }

                }
            });

            modalInstance.result.then(function (data){
                vm.data.location.reviews.push(data)
            });
        };






        //vm.pageHeader = {
        //    title: vm.locationid
        //}
    }
})();
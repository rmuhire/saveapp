save.controller('SignCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
            $("#btn-next").click(function(event){
               event.preventDefault();
                $(".organization-details").hide();
                $(".admin-details").show();

            });
            $(".back-to-organization").click(function(event){
               event.preventDefault();
                $(".admin-details").hide();
                $(".organization-details").show();
            });
}])

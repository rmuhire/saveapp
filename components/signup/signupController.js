save.controller('SignCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
            $("#btn-next").click(function(e){
               event.preventDefault();
                $(".organization-details").hide();
                $(".admin-details").show();

            });
            $(".back-to-organization").click(function(e){
               event.preventDefault();
                $(".admin-details").hide();
                $(".organization-details").show();
            });
}])

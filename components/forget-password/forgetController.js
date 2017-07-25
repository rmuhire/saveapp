save.controller('forgetCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
            $("#send-email").click(function(event){
               event.preventDefault();
                 $(".pwd-recovery").hide();
                 $(".email-sent-confirmation").show();
            });
}])

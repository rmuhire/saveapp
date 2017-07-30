save.controller('projectCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
  $(".panel").css("height", function(index){
                    return $(window).height();
                })
  $(".well").css("height", function(index){
                    return $(window).height();
                })
}])

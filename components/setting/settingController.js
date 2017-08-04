save.controller('settingViewCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
  $(function () {

    $(".setting").css("height", function(index){
        return $(window).height();
    })
  //   $(".well").css("height", function(index){
  //     return $(window).height();
  // })
    $('#ddlCars01').multiselect({
    includeSelectAllOption: true

    });
    $('#ddlCars02').multiselect({
    includeSelectAllOption: true
   });
 });
}])

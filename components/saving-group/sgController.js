save.controller('sgViewCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
  $(function () {

    $(".panel").css("height", function(index){
        return $(window).height();
    })
    $(".well").css("height", function(index){
      return $(window).height();
  })

    $('#ddlCars01').multiselect({
    includeSelectAllOption: true

    });
    $('#ddlCars02').multiselect({
    includeSelectAllOption: true
   });
 });
}])

save.controller('settingViewCtrl', function($scope,$http,$location, $rootScope, AuthService){
  $(function () {

    $(".setting").css("height", function(index){
        return $(window).height();
    })
    $('#ddlCars01').multiselect({
    includeSelectAllOption: true

    });
    $('#ddlCars02').multiselect({
    includeSelectAllOption: true
   });
 });
    
    
    $scope.users_info = function(){
        var user_profile = AuthService.getUserInformations();
        user_profile.then(function(data){
            console.log(data);
            $scope.user_names = data.name != null ? data.name : data.username;
            $scope.organization = data.organization.name.toUpperCase();
            console.log($scope.user_names);
        });
    }
    
    $scope.users_info();
    
    
})

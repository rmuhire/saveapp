save.controller('settingViewCtrl', function($scope,$http,$location, $rootScope, AuthService, SettingService){
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
            $scope.name = data.name;
            $scope.email = data.email;
            $scope.phone = data.phone;
            $scope.username = data.username;
            $scope.user = data;
            console.log($scope.user_names);
        });
    }
    
    $scope.users_info();
    
    $scope.user = {};
    $scope.save_user_details = function(){
        console.log($scope.user);
        SettingService.updateUser(JSON.stringify($scope.user))
            .then(function(){
                console.log("done");
                $scope.users_info();
            })
            .catch(function(){
                console.log("error");
            })
    }
    
    $scope.user_p = {};
    $scope.changePassword = function(){
        SettingService.resetPassword(JSON.stringify($scope.user_p))
            .then(function(){
                console.log("reset");
                $scope.response = "Password reset."
            }).catch(function(){
                $scope.response = "Oops! Current password not matching!"
            })
    }
    
    $scope.new_user = {}
    $scope.newUser = function(){
        console.log($scope.new_user);
        var data = $scope.new_user;
        console.log(data['name'])
    }
    
    $scope.checkMail = function(){
        alert("remy");
    }
    
    
})

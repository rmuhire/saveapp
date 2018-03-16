save.controller('ChangePasswordCtrl', function($scope, $http, $location, $routeParams, SettingService){
    
    $scope.confirmation = false;
    $scope.change_password = true;
    $scope.changePassword = function(){
        console.log($scope.user, $routeParams.email);
        
        if ($scope.user['new_password'] == $scope.user['c_password']){
            var url = "https://api.getsave.io/v1/users/"+$routeParams.email+"/email/";
            SettingService.UserInformationEmail(url).then(function(response){
                $scope.modifyPassword(response.data.id, $scope.user);
            }).catch(function(response){
                console.log(response);
            })
        }
    }
    
    
    $scope.modifyPassword = function(user_id, user){
        var url = "https://api.getsave.io/v1/users/"+user_id+"/reset-password/";
        SettingService.userResetPassword(url, user)
            .then(function(){
                console.log("Reset Successfull");
                $scope.confirmation = true;
                $scope.change_password = false;
            })
            .catch(function(){
                console.log("Fail Reset");
            })
        
    }
    
});  
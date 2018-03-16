save.controller('forgetCtrl', function($scope, $http, $location, AuthService) {

    $scope.pwd_recovery = true;
    $scope.confirmation = false;
    
    
    $scope.pwdRecovery = function(email){
        var url = "https://api.getsave.io/v1/users/"+email+"/recover/";
        AuthService.recoverUserEmail(url)
            .then(function(response){
                console.log(response);
                if (response.status == 200){
                    $scope.pwd_recovery = false;
                    $scope.confirmation = true;
                }
            })
            .catch(function(response){
                
            })
    }
    
})
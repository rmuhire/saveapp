save.controller('forgetCtrl', function($scope, $http, $location, AuthService) {

    $scope.pwd_recovery = true;
    $scope.confirmation = false;
    
    
    $scope.pwdRecovery = function(email){
        var url = "http://127.0.0.1:5000/v1/users/"+email+"/recover/";
        AuthService.recoverUserEmail(url)
            .then(function(response){
                console.log(response);
                if (response.status == 200){
                    $scope.pwd_recovery = false;
                    $scope.confirmation = true;
                }else{
                    
                }
            })
            .catch(function(response){
            
            })
    }
    
})
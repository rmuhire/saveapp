save.controller('ChangePasswordCtrl', function($scope, $http, $location, $routeParams, AuthService){
    
    $scope.changePassword = function(){
        console.log($scope.user, $routeParams.email);
        
        if ($scope.user['password'] == $scope.user['c_password']){
            AuthService.
        }
    }
    
}); 
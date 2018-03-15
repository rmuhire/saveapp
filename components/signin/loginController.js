save.controller('signinCtrl', function($scope, $location, AuthService){
    $scope.signin = function(){
        $scope.wPassword = false;
        AuthService.sign_in(JSON.stringify($scope.user))
                   .then(function(){
                       $location.path("/project");
                   })
                   .catch(function(){
                       $scope.wPassword = true;
                   });
    }
}) 

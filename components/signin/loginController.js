save.controller('signinCtrl', function($scope, $location, AuthService){
    $scope.signin = function(){
        console.log($scope.user);
        AuthService.sign_in(JSON.stringify($scope.user))
                   .then(function(){
                       $location.path("/project");
                       console.log("login");
                   })
                   .catch(function(){
                       console.log("not login"); 
                   });
    }
}) 

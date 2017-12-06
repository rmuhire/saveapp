save.controller('navbarCtrl', function($scope, $location, AuthService){
    $scope.sign_out = function(){
        AuthService.sign_out()
                   .then(function(){
                       console.log("signed out");
                   })
                   .catch(function(){
                       console.log("fail signed out");
                   })
    }
})

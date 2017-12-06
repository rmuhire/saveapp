save.controller('navbarCtrl', function($scope, $location, $rootScope, AuthService){
    // Sign out controller
    $scope.sign_out = function(){
        AuthService.sign_out()
                   .then(function(){
                       console.log("signed out");
                   })
                   .catch(function(){
                       console.log("fail signed out");
                   })
    }
    
    
    
    // User profile 
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

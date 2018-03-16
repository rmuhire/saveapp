save.controller('keyController', function($scope, $location, $routeParams, AuthService, $window){
    console.log($routeParams.keyu, $routeParams.email);
    var url='https://api.getsave.io/v1/users/'+$routeParams.keyu+'/reset/';
    AuthService.Key(url)
        .then(function(response){
            console.log(response)
            if (response.status == 200){
                $window.location.href = "#/change-password/" +$routeParams.email;
            }else{
                $window.location.href = "#/signin";
            }
            
        })
        .catch(function(response){
            console.log(response)
            $window.location.href = "#/signin";
        })
})
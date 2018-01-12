save.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/',{
        redirectTo: '/signin'
    })
    .when('/signin',{
        templateUrl:'components/signin/loginView.html',
        data: {
            private: false
        }
    }) 
    .when('/signup',{
        templateUrl:'components/signup/signupView.html',
        data: {
            private: false
        } 
    })
    .when('/forget-password',{ 
        templateUrl:'components/forget-password/forgetView.html',
        data: {
            private: false
        }
    })
    .when('/change-password/:email',{
        templateUrl:'components/changing-password/changingView.html',
        data: {
            private: false
        }
    })
    .when('/project',{
        templateUrl:'components/project/projectView.html',
        data: {
            private: true
        }
    })
    .when('/saving-group',{
        templateUrl:'components/saving-group/sgView.html',
        data: {
            private: false
        }
    })
    .when('/settings',{
        templateUrl:'components/setting/settingsView.html',
        data: {
            private: true
        }
    })
    .when('/map',{
        templateUrl:'components/map/mapView.html',
        data: {
            private: true
        }
    })
    .when('/404',{
        templateUrl:'components/404/404.html',
        data: {
            private: false
        }
    })
    .when('/recover/:email/:keyu',{
        template: '',
        controller: 'keyController',
        data: {
            private: false
        }
    })
    .otherwise({
        redirectTo: '/404'
    });
}]);

//save.run(function($rootScope, $location, $route, AuthService){
//    $rootScope.$on('$routeChangeStart', function(event, next, current){
//        if(!AuthService.get_user_status()){
//            console.log(next.data.private);
//            if(next.data.private && !AuthService.is_signed_in()){
//                $location.path('/');
//                $route.reload();
//            }
//        }
//    })
//})

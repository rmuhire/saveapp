save.factory('AuthService', ['$cookieStore','$base64','$q','$timeout','$http', function($cookieStore, $base64, $q, $timeout, $http){
    // create user variable
    var user = null;
    // create new instance for deffered
    var deferred = $q.defer();
    var url = 'http://localhost:5000/v1/';
    return ({
        sign_in: function (data){
            $http.post(url+'login/', data)
                 .then(function successCallback(response){
                     user = true;
                     console.log(response.data.id);
                     deferred.resolve();
                 }, function errorCallback(response){
                     user =  false;
                     deferred.reject();
                 });
            return deferred.promise;
        },
        is_signed_in: function (){
            if (user){
                return true;
            }else{
                return false;
            }
        },
        get_user_status: function(){
            if (get_user_cookies()){
                user = true;
            }else{
                user = false; 
            }
            return user;
        },
        sign_out: function(){
            if (remove_user_cookies()){
                user = false;
                deferred.resolve();
            }else{
                user = false;
                deferred.reject();
            }
            return deferred.promise;
        }
      
    });

    function set_user_cookies(user_id){
        $cookieStore.put('__save',user_id);
    }

    function get_user_cookies(){
        return $cookieStore.get('__save');
    }

    function remove_user_cookies(){
        $cookieStore.remove('__save');
    }
     
    
}]);

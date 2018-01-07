save.factory('AuthService', ['$cookieStore','$base64','$q','$timeout','$http', function($cookieStore, $base64, $q, $timeout, $http){
    // create user variable
    var user = null;
    
    var url = 'http://197.243.18.25:5000/v1/';
    return ({
        sign_in: function (data){
            // create new instance for deffered
            var deferred = $q.defer();
            $http.post(url+'login/', data)
                 .then(function successCallback(response){
                     user = true;
                     set_user_cookies(response.data.id);
                     console.log(response.data.id);
                    $cookieStore.put('__save_o',response.data.organization.id);
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
            // create new instance for deffered
            var deferred = $q.defer();
            if (remove_user_cookies()){
                user = false;
                deferred.resolve();
            }else{
                user = false;
                deferred.reject();
            }
            return deferred.promise;
        },
        getUserInformations : function(){
            var user_url = url+'users/'+get_user_cookies();
            return $http.get(user_url).then(function(response){
                return response.data;
            });
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

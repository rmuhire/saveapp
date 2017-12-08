save.factory('SettingService', function($cookieStore, $q, $timeout, $http){
    var url = 'http://localhost:5000/v1/users/'+ $cookieStore.get('__save');
    
    return ({
        updateUser: function(data){
            var deffered = $q.defer();
            $http.put(url, data)
                .then(function successCallback(response){
                    console.log(response);
                    deffered.resolve();
                }, function errorCallback(response){
                    console.log(response);
                    deffered.reject();
                });
            return deffered.promise;
        },
        resetPassword : function(data){
            var deffered = $q.defer();
            $http.put(url+'/reset-password/', data)
                .then(function(response){
                    console.log(response);
                    if (response.status == 200){
                        deffered.resolve();
                    }else{
                       deffered.reject(); 
                    } 
                }).catch(function(response){
                    console.log(response);
                    deffered.reject();
                });
            return deffered.promise;
        }
    })
    
});
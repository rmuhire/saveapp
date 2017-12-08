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
        },
        checkEmail: function(data){
            var deferred = $q.defer();
            var url = 'http://localhost:5000/v1/users/'+data+'/email/';
            $http.get(url)
                .then(function(response){
                    deferred.resolve();
                }).catch(function(response){
                    deferred.reject();
                });
            return deferred.promise;
        },
        checkPhone: function(data){
            var deferred = $q.defer();
            var url = 'http://localhost:5000/v1/users/'+data+'/phone/';
            $http.get(url).then(function(response){
                    deferred.resolve();
                }).catch(function(response){
                    deferred.reject();
                });
            return deferred.promise;
            
        }, 
        checkIdNumber:  function(data){
            var deferred = $q.defer();
            var url = 'http://localhost:5000/v1/users/'+data+'/id-number/';
            $http.get(url).then(function(response){
                    deferred.resolve();
                })
                .catch(function(response){
                    deferred.reject(); 
                });
            return deferred.promise;
        },
        newUser: function(data){
            var deferred = $q.defer();
            var url = 'http://localhost:5000/v1/users/';
        }
    })
    
});
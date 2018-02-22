save.factory('SettingService', function($cookieStore, $q, $timeout, $http){
    var url = 'http://197.243.18.25:5000/v1/users/'+ $cookieStore.get('__save');
    
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
            $http.put(url+'/change-password/', data)
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
            var url = 'http://197.243.18.25:5000/v1/users/'+data+'/email/';
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
            var url = 'http://197.243.18.25:5000/v1/users/'+data+'/phone/';
            $http.get(url).then(function(response){
                    deferred.resolve();
                }).catch(function(response){
                    deferred.reject();
                });
            return deferred.promise;
            
        }, 
        checkIdNumber:  function(data){
            var deferred = $q.defer();
            var url = 'http://197.243.18.25:5000/v1/users/'+data+'/id-number/';
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
            var url = 'http://197.243.18.25:5000/v1/organizations/'+ $cookieStore.get('__save_o')+'/users/';
            $http.post(url, data)
                .then(function(response){
                    deferred.resolve();
                    console.log(response);
                }).catch(function(response){
                    deferred.reject();
                    console.log(response);
                });
            return deferred.promise;
        },
        getOrganizationUsers: function(){
            var url = 'http://197.243.18.25:5000/v1/organizations/'+ $cookieStore.get('__save_o')+'/users/';
            return $http.get(url)
                .then(function(response){
                    return response;
                });
        },
        UserInformationEmail: function(url){
            return $http.get(url).then(function(response){
                return response;
            }).catch(function(response){
                return response;
            })
        },
        userResetPassword: function(url, data){
            var deferred = $q.defer();
            $http.post(url, data).then(function(response){
                deferred.resolve();
            }).catch(function(response){
                deferred.reject();
            });
            
            return deferred.promise;
        }
    })
    
});
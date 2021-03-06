save.factory('ProjectService', function($cookieStore, $q, $timeout, $http){
   return ({
       getOrganizationProject: function(data){
           var deffered = $q.defer();
           var url = 'https://api.getsave.io/v1/organizations/'+ $cookieStore.get('__save_o')+'/projects/';
           return $http.get(url)
               .then(function(response){
                    return response;
                });
       },
       updateProject: function(data){
           var url = 'https://api.getsave.io/v1/projects/'+data.id;
           return $http.put(url, data)
               .then(function(response){
                    return response;   
                }).catch(function(response){
                    return response;
                })
       }
   }) 
});
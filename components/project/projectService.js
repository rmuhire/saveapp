save.factory('ProjectService', function($cookieStore, $q, $timeout, $http){
   return ({
       getOrganizationProject: function(data){
           var deffered = $q.defer();
           var url = 'http://197.243.18.25:5000/v1/organizations/'+ $cookieStore.get('__save_o')+'/projects/';
           return $http.get(url)
               .then(function(response){
                    return response;
                });
       }
   }) 
});
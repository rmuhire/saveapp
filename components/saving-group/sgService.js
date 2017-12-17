 save.factory('SavingGroupService', function($cookieStore, $q, $timeout, $http){
     return ({
         getOrganizationSG: function(){
             var url = 'http://127.0.0.1:5000/v1/organizations/'+$cookieStore.get('__save_o')+'/sg/';
             return $http.get(url).then(function(response){
                 //console.log(response);
                 return response;
             }).catch(function(response){
                 return response;
             })
         },
         getProjectSG: function(id){
             var url = 'http://127.0.0.1:5000/v1/projects/'+id+'/sg/';
             return $http.get(url).then(function(response){
                return response;
             }).catch(function(response){
                return response;  
             });
         }
     })
 })  
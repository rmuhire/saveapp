 save.factory('SavingGroupService', function($cookieStore, $q, $timeout, $http){
     return ({
         getOrganizationSG: function(){
             var url = 'https://api.getsave.io/v1/organizations/'+$cookieStore.get('__save_o')+'/sg/';
             return $http.get(url).then(function(response){
                 return response;
             }).catch(function(response){
                 return response;
             })
         },
         getProjectSG: function(id){
             var url = 'https://api.getsave.io/v1/projects/'+id+'/sg/';
             return $http.get(url).then(function(response){
                return response;
             }).catch(function(response){
                return response;  
             });
         },
         getWalletSG: function(url){
            return $http.get(url).then(function(response){
                return response
            }).catch(function(response){
                return response
            })
        },
        getDistricts: function(){
            var url = 'https://api.getsave.io/v1/kenessa/1,2,3,4,5/districts/'
            return $http.get(url).then(function(response){
                return response;
            }).catch(function(response){
                return response;
            })
        }
     })
 })  


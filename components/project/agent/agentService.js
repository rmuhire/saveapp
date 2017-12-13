save.factory('AgentService', function($cookieStore, $q, $timeout, $http){
    return ({
        postAgentProject: function(id, data){
            var deffered = $q.defer();
            var url = "http://127.0.0.1:5000/v1/project/"+id+"/agents/";
            $http.post(url, data).then(function(response){
                console.log(response);
                deffered.resolve();
            }).catch(function(response){
                console.log(response);
                deffered.reject();
            })
            return deffered.promise;
        },
        getProjectAgent: function(id){
            var url = 'http://127.0.0.1:5000/v1/projects/'+id+'/agents/';
            return $http.get(url).then(function(response){
                return response;
            }).catch(function(response){
                return response;
            });
        },
        getAgentSavingGroup: function(url){
            return $http.get(url).then(function(response){
                return response;
            }).catch(function(response){
                return response;
            })  
        }
    })
});
save.factory('PartnerService', function($cookieStore, $q, $timeout, $http){
    return ({
        getProvince: function(){
            var url = 'http://127.0.0.1:5000/v1/kenessa/provinces/';
            return $http.get(url).then(function(response){
                return response;
            })
        },
        getDistrict: function(data){
            var url = 'http://127.0.0.1:5000/v1/kenessa/'+data+'/districts/';
            return $http.get(url).then(function(response){
                return response;
            })
        },
        getSector: function(data){
            var url = 'http://127.0.0.1:5000/v1/kenessa/'+data+'/sectors/';
            return $http.get(url).then(function(response){
                return response;
            })
        },
        getCell: function(data){
            var url = 'http://127.0.0.1:5000/v1/kenessa/'+data+'/cells/';
            return $http.get(url).then(function(response){
                return response;
            })
        },
        getVillage: function(data){
            var url = 'http://127.0.0.1:5000/v1/kenessa/'+data+'/villages/';
            return $http.get(url).then(function(response){
                return response;
            }) 
        },
        postOrganizations: function(data){
            var url = 'http://127.0.0.1:5000/v1/organizations/';
            return $http.post(url, data).then(function(response){
                    return response;
                })
                .catch(function(response){
                    return response;
                });
        },
        postOrganizationsUsers: function(data, id){
            var url = 'http://127.0.0.1:5000/v1/organizations/'+id+'/users/';
            return $http.post(url,data).then(function(response){
                    return response
                }).catch(function(response){
                    return response
                })
        },
        postOrganizationsProject: function(data){
            var url = 'http://127.0.0.1:5000/v1/organizations/'+$cookieStore.get('__save_o')+'/projects/';
            return $http.post(url, data)
                .then(function(response){
                    return response
                }).catch(function(response){
                    return response
                })
        },
        postProjectInterventionArea: function(data, id){
            var url = 'http://127.0.0.1:5000/v1/projects/'+id+'/intervention/';
            return $http.post(url, data).then(function(response){
                return response
            }).catch(function(response){
                return response
            });
        },
        postProjectPartner: function(id, partner_id){
            var url = 'http://127.0.0.1:5000/v1/projects/'+id+'/partners/'+partner_id+'/';
            return $http.post(url).then(function(response){
                return response;
            }).catch(function(response){
                return response
            })
        }
    })
}) 
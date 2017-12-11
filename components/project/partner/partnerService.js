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
        }
    })
}) 
save.factory('MemberService', function($cookieStore, $q, $timeout, $http){
    return ({
        getMemberShares: function(url){
            return $http.get(url).then(function(response){
                return response
            }).catch(function(response){
                return response
            })
        }
    })
})
save.factory('SGCycleService', function($cookieStore, $q, $timeout, $http){
  return ({
      getSgCycles: function(url){
          return $http.get(url).then(function(response){
              return response
          }).catch(function(response){
              return response
          })
      },
      getCyclesMembers: function(url){
          return $http.get(url).then(function(response){
              return response
          }).catch(function(response){
              return response
          })
      },
      getCyclesShareOut: function(url){
          return $http.get(url).then(function(response){
              return response
          }).catch(function(response){
              return response
          })
      }
  })  
})  
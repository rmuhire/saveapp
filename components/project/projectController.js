save.controller('projectCtrl', function($scope,$http,$location, ProjectService,){
  $(".panel").css("height", function(index){
                    return $(window).height();
                })
  $(".well").css("height", function(index){
                    return $(window).height();
                })
    
    
    
    
    // Project Controller
    
    $scope.getOrganizationProject = function(){
        var organization_project = ProjectService.getOrganizationProject();
        organization_project.then(function(response){
            console.log(response.data.projects);
            $scope.projects = response.data.projects;
        });
    }
    $scope.getOrganizationProject();
    
    
    // Load Province 
    
    $scope.loadProvince = function(){
        PartnerService.getProvince()
            .then(function(response){
                console.log(response);
                provinces = response.data;
            })
    }
    
    
    $scope.currentProject = function(id, name){
        $scope.$broadcast('LoadPorjectAgent', {id: id, name:name});
    }
})

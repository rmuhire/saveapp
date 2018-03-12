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
    
    $scope.project_sg = false;
    $scope.currentProject = function(project){
        $scope.$broadcast('LoadPorjectAgent', {project: project });
        $scope.$broadcast('LoadProjectPartner', { project: project });
        $scope.project_sg = true;
    }
    
    $scope.fireModalProject = function(project){
        console.log("project modal", project)
        console.log();
        $("#editProjectModel").modal('show');
        project.start = moment(project.start).format('YYYY-MM-DD');
        project.end = moment(project.end).format('YYYY-MM-DD');
        $scope.project = project;
    }
    
    $scope.editProject = function(){
        console.log($scope.project);
        ProjectService.updateProject($scope.project).then(function(response){
            console.log(response);
        }).catch(function(response){
            console.log(response);
        })
        
    }
    
})

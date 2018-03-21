save.controller('sgViewCtrl', function($scope,$http,$location, ProjectService, SavingGroupService){
  $(function () {

    $(".second-panel").css("height", function(index){
        return $(window).height();
    })
  //   $(".well").css("height", function(index){
  //     return $(window).height();
  // })

    $('#sg_project').multiselect({
        includeSelectAllOption: true,
        buttonWidth: '150%'
    });
    
      $('#sg_location').multiselect({
        includeSelectAllOption: true,
        buttonWidth: '110%'
    }); 
 }); 
    
    
    $scope.organizationProject = function(){
        ProjectService.getOrganizationProject()
            .then(function(response){
                //$scope.projects = response.data.projects;
                var options = "<option value='all'>All</option>";
                $.each(response.data.projects, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#sg_project").append(options);

                $("#sg_project").multiselect('rebuild');
                $("#sg_project").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '110%'
                });
            })
    }
    
    $scope.organizationProject();
    
    // load Project SG 
    
    
    $("#sg_project").change(function(){
        var selection = $("#sg_project").val();
        $scope.loadProjectSG(selection);
    });
     
    $scope.loadProjectSG = function(selection){
        if (selection == 'all'){
            SavingGroupService.getOrganizationSG().then(function(response){
                $scope.sgs = response.data.saving_group;
                
            }).catch(function(response){
                console.log(response);
            })
        }else{
            SavingGroupService.getProjectSG(selection).then(function(response){
                $scope.sgs = response.data.saving_group;
                
            }).catch(function(response){
                console.log(response);
            })
        }
    }
    
    var selection = 'all';
    $scope.loadProjectSG(selection);
    
    $scope.sg_tabs = false;
    
    $scope.loadSG = function(sg){
        
        $scope.$broadcast('LoadSgCycle', { sg:sg })
        $scope.$broadcast('LoadSgMember', { sg:sg })
        $scope.$broadcast('LoadSgLoansSavings', { sg:sg })
        $scope.$broadcast('LoadSgDividends', { sg:sg })
        $scope.$broadcast('LoadAL', { sg:sg })
        
        $scope.sg_tabs = true;
        
    }
    
    
    $scope.getDistricts = function(){
        SavingGroupService.getDistricts()
            .then(function(response){
                
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#sg_location").append(options);

                $("#sg_location").multiselect('rebuild');
                $("#sg_location").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '140%'
                });
            
            }).catch(function(response){
                console.log(response);
            })
    }
    
    $scope.getDistricts();
})
 
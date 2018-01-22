save.controller('AgentCtrl', function($scope, $http, $location, ProjectService, PartnerService, SettingService, $cookieStore, AgentService) {
    /*agent-hide-and-show*/

    /*isolated agent view*/
    $("#agent-details").click(function(event) {
        event.preventDefault();
        $(".agent-view").hide();
        $(".isolated-agent-view").show();

    });

    /*back to agent view table*/
    $(".back-to-agent-view").click(function(event) {
        event.preventDefault();
        $(".isolated-agent-view").hide();
        $(".agent-view").show();
    }); 

    /*back to isolated agent view*/
    $(".back-to-agent-detail").click(function(event) {
        event.preventDefault();
        $("#add-new-agent").hide();
        $("#isolated-agent-view").show();
    });
    /*floating button add new agent*/
    $(".btn-add-new-agent").click(function(event) {
        event.preventDefault();
        $("#isolated-agent-view,.agent-view").hide();
        $("#add-new-agent").show();

    });
     
     
    // Load Province 
    
    $("#province__").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '300px',
        dropLeft: true
    });

    $("#district__").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '300px',
        dropLeft: true
    });

    $("#sector__").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '300px',
        dropLeft: true
    });

    $("#cell__").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '300px',
        dropLeft: true
    });

    $("#village__").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '300px',
        dropLeft: true
    });

    
    $scope.loadProvince_ = function() {
        PartnerService.getProvince()
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#province__").html(options);

                $("#province__").multiselect('rebuild');
                $("#province__").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '300px',
                    dropLeft: true
                });

            })
    }

    $scope.loadDistrict_ = function() {
        PartnerService.getDistrict($scope.Alocation.province)
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#district__").html(options);

                $("#district__").multiselect('rebuild');
                $("#district__").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '300px',
                    dropLeft: true
                });

            });
    }


    $scope.loadSector_ = function() {
        PartnerService.getSector($scope.Alocation.district)
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#sector__").html(options);

                $("#sector__").multiselect('rebuild');
                $("#sector__").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '300px',
                    dropLeft: true
                });

            });
    }

    $scope.loadCell_ = function() {
        PartnerService.getCell($scope.Alocation.sector)
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#cell__").html(options);

                $("#cell__").multiselect('rebuild');
                $("#cell__").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '300px',
                    dropLeft: true
                });

            });
    }

    $scope.loadVillage_ = function() {
        PartnerService.getVillage($scope.Alocation.cell)
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#village__").html(options);

                $("#village__").multiselect('rebuild');
                $("#village__").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '300px',
                    dropLeft: true
                });

            });
    }

    $scope.loadProvince_()
    
    

    $("#project_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '266px',
        dropLeft: true
    });

    
    
    // Load Organization Project
    $scope.organizationProject = function(){
        ProjectService.getOrganizationProject()
            .then(function(response){
                console.log(response);
                $scope.projects = response.data.projects;
                var options = "";
                $.each(response.data.projects, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#project_").html(options);

                $("#project_").multiselect('rebuild');
                $("#project_").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '266px',
                    dropLeft: true
                });
            })
    }
    
    $scope.organizationProject();
    
    $scope.addAgent = function(){
        // $scope.user
        $scope.user['username'] = null;
        $scope.user['birth_date'] = '1900-01-01';
        $scope.user['education'] = null;
        $scope.user['location'] = '11010106';
        $scope.user['type'] = 2;
        $scope.user['password'] = '000000';
        $scope.user['gender'] = null;
        var project_id = $("#project_").val();
        console.log($scope.user, $scope.project)
        PartnerService.postOrganizationsUsers($scope.user, $cookieStore.get('__save_o'))
            .then(function(response){
                var user_id = new Object();
                user_id['user_id'] = response.data.id;
                AgentService.postAgentProject(project_id, JSON.stringify(user_id))
                    .then(function(){
                        console.log("added");
                    }).catch(function(){
                        console.log("added");
                    })
            }).catch(function(reponse){
                console.log(reponse);
            });
        
    }
    
    
    
    $scope.$on('LoadPorjectAgent', function(event, opt){
        alert(opt.project.id);
        $scope.pmessage = false;
        AgentService.getProjectAgent(opt.project.id)
            .then(function(response){
                var agent = response.data.project_agents;
                var data = Array();
                
                agent.forEach(function(element){
                    var json = new Object();
                    json['name'] = element.users['name'];
                    json['project_name'] = opt.project.name;
                    AgentService.getAgentSavingGroup(element.users['sg_url'])
                        .then(function(response){
                            console.log(response);
                            
                            json['sg_count'] = response.data.pages['total'];
                            console.log(response.data.pages['total']);
                            
                            // count sg members
                            var sg = response.data.saving_group;
                            var members = [];
                            sg.forEach(function(element){
                                var url = element.members_url;
                                AgentService.getSavingGroupMember(url)
                                    .then(function(response){
                                        members.push(response.data.pages.total)
                                    }).catch(function(response){
                                    
                                    });
                            })
                            
                            json['members'] = members;
                            
                        }).catch(function(response){
                            console.log(response);
                        })
                    data.push(json);
                });
                
                if (data.length > 0 ){
                    $scope.items = data;
                }else{
                    $scope.pmessage = true;
                }
                
                
            }).catch(function(reponse){
                console.log(reponse);
            });
        
        
    })
    
    $scope.sum = function(getMembers){
        if (typeof getMembers !== 'undefined' && getMembers.length > 0){
            console.log(getMembers);
            return getMembers.reduce(getSum);
        }else{
            return 0;
        }
        
    }
    
    function getSum(a, b){
        return a + b;
    }
    
    

})


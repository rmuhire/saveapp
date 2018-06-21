save.controller('PartnerCtrl', function($scope, $http, $location, PartnerService, $cookieStore, ProjectService) {

    
  
    function datePickerPlugin(){
        $('[data-toggle="start"]').datepicker({
            format: 'yyyy-mm-dd'
        });
        $('[data-toggle="end"]').datepicker({
            format: 'yyyy-mm-dd'
        });
    }
    
    
    $scope.$on('addNewProject', function(event, opt){
        event.preventDefault();
        
        $("#isolated-project-view").hide();
        
        $("#add-new-project").show();
        datePickerPlugin();
        $("#partner-view").hide();
    });

    /*bootstrap tooltip function*/
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /*Partner hide-and-show*/
    $("#partner-details").click(function(event) {
        event.preventDefault();
        $("#partner-view").hide();
        $("#isolated-project-view").show();
    });
    /*back to partner-view-table*/
    $(".back-to-partner-view").click(function(event) {
        event.preventDefault();
        $("#isolated-project-view,#isolated-agent-view").hide();
        $("#partner-view").show();
    }); 
    /*floating button add-new-project*/
    $(".btn-add-new-project").click(function(event) {
        event.preventDefault();
        
        $("#isolated-project-view").hide();
        
        $("#add-new-project").show();
        datePickerPlugin();
        $("#partner-view").hide();
    });
    /*back to isolated agent view*/
    $(".back-to-partner-detail").click(function(event) {
        event.preventDefault();
        $("#add-new-project,#add-new-project").hide();
        $("#partner-view").show();
    });

    /*file upload function*/
    $(function() {



        // Create the close button
        var closebtn = $('<button/>', {
            type: "button",
            text: 'x',
            id: 'close-preview',
            style: 'font-size: initial;',
        });
        closebtn.attr("class", "close pull-right");
        // Set the popover default content
        $('.image-preview').popover({
            trigger: 'manual',
            html: true,
            title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
            content: "There's no image",
            placement: 'bottom'
        });
        // Clear event
        $('.image-preview-clear').click(function() {
            $('.image-preview').attr("data-content", "").popover('hide');
            $('.image-preview-filename').val("");
            $('.image-preview-clear').hide();
            $('.image-preview-input input:file').val("");
            $(".image-preview-input-title").text("");
        });
        // Create the preview image
        $(".image-preview-input input:file").change(function() {
            var img = $('<img/>', {
                id: 'dynamic',
                width: 250,
                height: 200
            });
            var file = this.files[0];
            var reader = new FileReader();
            // Set preview image into the popover data-content
            reader.onload = function(e) {
                $(".image-preview-input-title").text("");
                $(".image-preview-clear").show();
                $(".image-preview-filename").val(file.name);
                img.attr('src', e.target.result);
                $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
            }
            reader.readAsDataURL(file);
        });
    });




    $("#province_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '400px',
        dropLeft: true,
        maxHeight: 200
    });

    $("#district_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '400px',
        dropLeft: true,
        maxHeight: 200,
        disableIfEmpty: true
    });

    $("#sector_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '400px',
        dropLeft: true,
        maxHeight: 200,
        disableIfEmpty: true
    });

    $("#cell_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '400px',
        dropLeft: true,
        maxHeight: 200,
        disableIfEmpty: true
    });

    $("#village_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '400px',
        dropLeft: true,
        maxHeight: 200,
        disableIfEmpty: true
    });


    // Load Province 

    $scope.loadProvince = function() {
        PartnerService.getProvince()
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#province_").html(options);

                $("#province_").multiselect('rebuild');
                $("#province_").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '400px',
                    dropLeft: true
                });
 
            })
    }

    $scope.loadDistrict = function() {
        PartnerService.getDistrict($scope.location.province)
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#district_").html(options);

                $("#district_").multiselect('rebuild');
                $("#district_").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '400px',
                    dropLeft: true,
                    maxHeight: 200
                });
 
            });
    }


    $scope.loadSector = function() {
        PartnerService.getSector($scope.location.district)
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#sector_").html(options);

                $("#sector_").multiselect('rebuild');
                $("#sector_").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '400px',
                    dropLeft: true,
                    maxHeight: 200
                });

            });
    }

    $scope.loadCell = function() {
        PartnerService.getCell($scope.location.sector)
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#cell_").html(options);

                $("#cell_").multiselect('rebuild');
                $("#cell_").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '400px',
                    dropLeft: true,
                    maxHeight: 200
                });

            }); 
    }

    $scope.loadVillage = function() {
        var json = new Object()
        json['cell'] = $scope.location.cell
        PartnerService.postVillage(JSON.stringify(json))
            .then(function(response) {
                console.log(response);
                var options = "";
                $.each(response.data, function(key, value) {
                    options += "<option value=" + value.id + " >" + value.name + "</option>";

                });

                $("#village_").html(options);

                $("#village_").multiselect('rebuild');
                $("#village_").multiselect({
                    includeSelectAllOption: true,
                    buttonWidth: '400px',
                    dropLeft: true,
                    maxHeight: 200
                });

            });
    }

    $scope.loadProvince()
    
    
    // Get Organization Project
    
    $scope.loadOrganizationProject = function(){
        ProjectService.getOrganizationProject()
            .then(function(response){
                console.log(response);
                var options = "";
                $.each(response.data.projects, function(key, value){
                    options += "<option value=" + value.id + " >" + value.name + "</option>";
                })
                $("#org_project").html(options)
            }).catch(function(response){
                console.log(response);
            })
    }
    
    
    $scope.loadOrganizationProject();
    
    
    
    // add Project Partner 
    
    $scope.addProjectPartner = function(){
        $scope.partnerResponse = false;
        // $scope.user
        $scope.ngo['address'] = null;
        $scope.ngo['country'] = null;
        
        // $scope.user
        $scope.user['username'] = null;
        $scope.user['birth_date'] = '1900-01-01';
        $scope.user['education'] = null;
        $scope.user['location'] = '12090208';
        $scope.user['type'] = 1;
        $scope.user['password'] = '000000'
        $scope.user['gender'] = null;
        
        // project_id
        var project_id = $("#org_project").val();
        
        console.log($scope.ngo, $scope.user, project_id);
        
        
        PartnerService.postOrganizations($scope.ngo)
            .then(function(response){
                console.log(response);
                // post organization users
                PartnerService.postOrganizationsUsers($scope.user, response.data.id)
                    .then(function(response){
                        console.log(response);
                    })
                    .catch(function(response){
                        console.log(response);
                    })
            
                 // post organization partnership
                        PartnerService.postProjectPartner(project_id, response.data.id).then(function(response){
                            $scope.partnerResponse = true;
                             alert("Partner added");
                            $scope.ngo = {};
                            $scope.user = {};
                            console.log(response);
                        }).catch(function(response){
                            console.log(response);
                        })
                
            })
            .catch(function(response){
                console.log(response);    
            })
        
        
    }
    
    
    
    // add Project
    
    $scope.addProject = function(){
        $scope.projectResponse = false;
        $(".btn-project").attr('disabled', 'disabled');
        
        // $scope.project
        $scope.project['user_id'] = $cookieStore.get('__save'); 
        
        //$scope.user, $scope.ngo
        console.log($scope.project, $scope.location);
        var village = Array();
        for (var i=0; i < $scope.location.village.length; i++){
            var dict = new Object();
            dict['village_id'] = parseInt($scope.location.village[i]);
            village.push(dict);
        }
         
        
        
        PartnerService.postOrganizationsProject($scope.project)
            .then(function(response){
                $scope.postProjectArea(response.data.id, village)
            }).catch(function(response){
                
            });
        
        $scope.postProjectArea = function(project_id, village){
            PartnerService.postProjectInterventionArea(JSON.stringify(village), project_id)
            .then(function(response){
                $scope.project = {};
                alert("Project area added");
                $scope.projectResponse = true;
                $(".btn-project").removeAttr('disabled');
                
            }).catch(function(response){
                console.log(response);
            })  
        }
        
//        $scope.postProjectArea(26, village);
        
        

    }
    
    
    $scope.$on('LoadProjectPartner', function(event, opt){
        $scope.no_partner = false;
        $scope.partner = false;
        console.log(opt.project)
        PartnerService.getProjectPartner(opt.project.project_partners)
            .then(function(response){
                if(response.data.partners.length > 0){
                    $scope.no_partner = false;
                    $scope.partner = true;
                    console.log(response.data.partners, "partner mazo")
                    var partners = response.data.partners
                    var data = new Array()
                    partners.forEach(function(element, index){
                        var json = new Object()
                        console.log(element)
                        json['partner'] = element.partner.name
                        json['intervention'] = '12'
                        json['donor'] = opt.project.donor
                        json['duration'] = '6'
                        json['budget'] = opt.project.budget
                        data.push(json)
                        $scope.projects = data
                    })
                }else{
                    $scope.no_partner = true;
                    $scope.partner = false;
                }
            }).catch(function(response){
                console.log(response)
            })
    })

})
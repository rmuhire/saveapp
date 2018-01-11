save.controller('PartnerCtrl', function($scope, $http, $location, PartnerService, $cookieStore) {

  
    function datePickerPlugin(){
        $('[data-toggle="start"]').datepicker({
            format: 'yyyy-mm-dd'
        });
        $('[data-toggle="end"]').datepicker({
            format: 'yyyy-mm-dd'
        });
    }

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
        $("#isolated-project-view").show();
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
        buttonWidth: '300px',
        dropLeft: true
    });

    $("#district_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '300px',
        dropLeft: true
    });

    $("#sector_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '300px',
        dropLeft: true
    });

    $("#cell_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '300px',
        dropLeft: true
    });

    $("#village_").multiselect({
        includeSelectAllOption: true,
        buttonWidth: '300px',
        dropLeft: true
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
                    buttonWidth: '300px',
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
                    buttonWidth: '300px',
                    dropLeft: true
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
                    buttonWidth: '300px',
                    dropLeft: true
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
                    buttonWidth: '300px',
                    dropLeft: true
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
                    buttonWidth: '300px',
                    dropLeft: true
                });

            });
    }

    $scope.loadProvince()
    
        
    
    // add Project
    
    $scope.addProject = function(){
        // $scope.user
        $scope.ngo['address'] = null;
        $scope.ngo['country'] = null;
        
        // $scope.user
        $scope.user['username'] = null;
        $scope.user['birth_date'] = '1900-01-01';
        $scope.user['education'] = null;
        $scope.user['location'] = null;
        $scope.user['type'] = 1;
        $scope.user['password'] = '000000'
        $scope.user['gender'] = null;
        
        // $scope.project
        $scope.project['user_id'] = $cookieStore.get('__save'); 
        
        console.log($scope.project, $scope.location, $scope.user, $scope.ngo);
        var village = Array();
        for (var i=0; i < $scope.location.village.length; i++){
            var dict = new Object();
            dict['village_id'] = parseInt($scope.location.village[i]);
            village.push(dict);
        }
        
        
        
//        PartnerService.postOrganizations($scope.ngo)
//            .then(function(response){
//                console.log(response);
//                // post organization users
//                PartnerService.postOrganizationsUsers($scope.user, response.data.id)
//                    .then(function(response){
//                        console.log(response);
//                    })
//                    .catch(function(response){
//                        console.log(response);
//                    })
//            
//                // post Organization project
//                PartnerService.postOrganizationsProject($scope.project)
//                    .then(function(data){
//                        console.log(data)
//                        // post project intervention area
//                        PartnerService.postProjectInterventionArea(JSON.stringify(village), data.data.id)
//                            .then(function(response){
//                                console.log(response);
//                            }).catch(function(reponse){
//                                console.log(response);
//                            })
//                    
//                        // post organization partnership
//                        PartnerService.postProjectPartner(data.data.id, response.data.id).then(function(response){
//                            console.log(response);
//                        }).catch(function(response){
//                            console.log(response);
//                        })
//                    
//                    }).catch(function(data){
//                        console.log(data);
//                    })
//                
//            })
//            .catch(function(response){
//                console.log(response);    
//            })
    }
    
    
    $scope.$on('LoadProjectPartner', function(event, opt){
        console.log(opt.project)
        PartnerService.getProjectPartner(opt.project.project_partners)
            .then(function(response){
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
                
            }).catch(function(response){
                console.log(response)
            })
    })

})
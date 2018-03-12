save.controller('settingViewCtrl', function($scope,$http,$location, $rootScope, AuthService, SettingService){
  $(function () {

    $(".setting").css("height", function(index){
        return $(window).height();
    })
    $('#ddlCars01').multiselect({
    includeSelectAllOption: true

    });
    $('#ddlCars02').multiselect({
    includeSelectAllOption: true
   });
      $("#province_").multiselect({
        includeSelectAllOption: true
    });
 });
    
    
    function birthdatePlugin(){
        $('[data-toggle="birthdate"]').datepicker({
            format: 'yyyy-mm-dd'
        });
    }
    
    
    $scope.users_info = function(){
        
        var user_profile = AuthService.getUserInformations();
        user_profile.then(function(data){
            console.log(data);
            $scope.user_names = data.name != null ? data.name : data.username;
            $scope.name = data.name;
            $scope.email = data.email;
            $scope.phone = data.phone;
            $scope.username = data.username;
            data['location'] = 
            data.location.village.id;
            $scope.user = data;
            console.log($scope.user_names);
        });
    } 
    
    $scope.users_info();
    birthdatePlugin();
    $scope.user = {};
    $scope.save_user_details = function(){
        console.log($scope.user);
        SettingService.updateUser(JSON.stringify($scope.user))
            .then(function(){
                console.log("done");
                $scope.users_info();
            })
            .catch(function(){
                console.log("error");
            })
    }
    
    $scope.user_p = {};
    $scope.changePassword = function(){
        SettingService.resetPassword(JSON.stringify($scope.user_p))
            .then(function(){
                console.log("reset");
                $scope.response = "Password reset."
            }).catch(function(){
                $scope.response = "Oops! Current password not matching!"
            })
    }
    
    $scope.new_user = {}
    $scope.newUser = function(){
        console.log($scope.new_user);
        var data = $scope.new_user;
        data['username'] = null;
        data['birth_date'] = '1900-01-01';
        data['education'] = null;
        data['location'] = '12090208';
        data['type'] = 1;
        data['password'] = '000000'
        
        SettingService.newUser(JSON.stringify(data))
            .then(function(){
                console.log("added");
            }).catch(function(){
                console.log("not added");
            });
    }
    
    $scope.checkMail = function(){
        if (validateEmail($scope.new_user.email)){
            SettingService.checkEmail($scope.new_user.email)
                .then(function(){
                    $scope.emailState = 'already exist';
                }).catch(function(){
                    $scope.emailState = 'Valide';
                });
        }
    }
    
    $scope.checkPhone = function(){
        SettingService.checkPhone($scope.new_user.phone)
            .then(function(){
                $scope.phoneState = 'already exist';
            }).catch(function(){
                $scope.phoneState = 'Valide';
            })
    } 
    
    $scope.checkIdNumber = function(){
        SettingService.checkIdNumber($scope.new_user.id_number)
            .then(function(){
                $scope.idNumberState = 'already exist'; 
            }).catch(function(){
                $scope.idNumberState = 'Valide';
            });
    }
    
    
    $scope.organizationUsers = function(){
        var organization_users = SettingService.getOrganizationUsers();
        organization_users.then(function(response){
            $scope.users = response.data.users;
        });
    }
    
    $scope.organizationUsers();
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    
    // reset user password 
    
    $scope.resetPassword = function(user){
        $("#resetPasswordModal").modal('show');
        $scope.user = user;
        console.log(user);
    }
    
    $scope.editUser = function(user){
        $scope.user = user;
        user.birth_date = moment(user.birth_date).format('YYYY-MM-DD');
        user.location = user.village_id;
        console.log(user);
        $("#editUserModal").modal('show');
    }
    
    $scope.updateUserInfoData = function(){
        SettingService.userUpdateInfo($scope.user).then(function(response){
            console.log(response);
            $("#editUserModal").modal('hide');
        }).catch(function(response){
            console.log(response);
        })
    }
    
    
})

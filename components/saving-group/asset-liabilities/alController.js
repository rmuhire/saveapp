 save.controller('alViewCtrl', function($scope, $http, $location, AgentService, MemberService, SGCycleService){
     $scope.$on('LoadAL', function(event, opt){
         console.log(opt.sg, 'SG AL')
         $scope.total_members = opt.sg.male + opt.sg.female
         $scope.social_fund_balance = opt.sg.social_fund_balance
         $scope.count_write_off = opt.sg.count_write_off
         AgentService.getSavingGroupMember(opt.sg.members_url)
            .then(function(response) {
                var members = response.data.members
                var data = new Array()

                members.forEach(function(element, index) {
                    var json = new Object()
                    MemberService.getMemberShares(element.member_shares)
                        .then(function(response) {
                            json['names'] = element.user.name
                            json['contributions'] = numeral(response.data.contributions).format('0,0')
                            json['shares'] = response.data.shares

                        }).catch(function(response) {
                            console.log(response)
                        })
                    data.push(json)
                    $scope.members = data
                })
            }).catch(function(response) {
                console.log(response)
            })

     })
 })
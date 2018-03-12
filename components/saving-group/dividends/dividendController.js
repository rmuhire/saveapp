save.controller('dividendsViewCtrl', function($scope, $http, $location, AgentService, MemberService, SGCycleService) {
    $scope.$on('LoadSgDividends', function(event, opt) {
 
        $scope.social_fund_balance = opt.sg.social_fund_balance
        $scope.count_write_off = opt.sg.count_write_off
        $scope.cumulative_dividend = opt.sg.cumulative_dividend
        $scope.current_dividend = opt.sg.current_saving
         AgentService.getSavingGroupMember(opt.sg.members_url)
            .then(function(response) {
                $scope.total_members = response.data.pages.total;
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
        
        
        
        SGCycleService.getSgCycles(opt.sg.cycle_url).then(function(response) {
            if (response.data.cycles.length !== 0) {
                $scope.cycle_length = response.data.cycles.length
                $scope.first_cycle = response.data.cycles[0].start

                // get cycles members
                var cycles = response.data.cycles
                var x = new Array()
                var y = new Array()
                var suggestions = new Array('First', 'Second', 'Third', 'Fourth', 'Fifth')
                cycles.forEach(function(element, index) {
                    SGCycleService.getCyclesShareOut(element.cycle_share_out_url)
                        .then(function(response) {
                            x.push(suggestions[index])
                            y.push(response.data.shared_amount)
                            $scope.BarChart(x, y)
                        })
                        .catch(function(reponse) {
                            console.log(response)
                        })
                })



            }

        }).catch(function(response) {
            console.log(response)
        })
        
        
        


    });
    
    $scope.BarChart =  function(x,y){
        var data = [{
            x: x,
            y: y,
            type: 'bar'
        }];
        var layout = {
            width: 320,
            height: 400,
            legend: {
                orientation: 'h',
                x: 0,
                y: -0.2
            },
            margin: {
                l: 40,
                r: 0,
                t: 0,
                b: 40
            }
        };

        Plotly.newPlot('sg_dividents', data, layout, {
            displayModeBar: false
        });
    }
    
})
save.controller('lsViewCtrl', function($scope, $http, $location, AgentService, MemberService, SGCycleService, SavingGroupService) {
    $(function() {
        $('#women').cssCharts({
            type: "donut"
        }).trigger('show-donut-chart');
        $('#men').cssCharts({
            type: "donut"
        }).trigger('show-donut-chart');

    }); 


    $scope.$on('LoadSgLoansSavings', function(event, opt) {
        $scope.total_members = opt.sg.male + opt.sg.female
        console.log(opt.sg, 'SG')
        $scope.count_write_off = opt.sg.count_write_off
        $scope.count_outstanding_loan = opt.sg.count_outstanding_loan
        $scope.cumulative_saving = numeral(opt.sg.cumulative_saving).format('0,0')
        $scope.current_saving = numeral(opt.sg.current_saving).format('0,0')

        
        SavingGroupService.getWalletSG(opt.sg.wallet)
            .then(function(response){
            $scope.wallet_balance = response.data.wallet[0].amount
                console.log(response, "Wallet");
            }).catch(function(response){
                console.log(response);
            })
        
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


        SGCycleService.getSgCycles(opt.sg.cycle_url)
            .then(function(response) {
                console.log(response, 'CYCLE_URL')
                var cycles = response.data.cycles
                var labels = new Array()
                var saving = new Array()
                var loan = new Array()
                var suggestions = new Array('First', 'Second', 'Third', 'Fourth', 'Fifth')
                cycles.forEach(function(element, index) {
                    labels.push(suggestions[index])
                    saving.push(element.saving)
                    loan.push(element.loan)
                    $scope.barChart(labels, loan, saving)
                    $scope.current_cycle = labels[labels.length-1]
                })
            }).catch(function(response) {
                console.log(response);
            });




    });

    $scope.barChart = function(labels, loan, saving) {
        var trace1 = { 
            x: labels,
            y: loan,
            name: 'Loans',
            type: 'bar',
            hoverinfo: 'percent',
        };

        var trace2 = {
            x: labels,
            y: saving,
            name: 'Savings',
            type: 'bar',
            hoverinfo: 'percent',
        };

        var data = [trace1, trace2];

        var layout = {
            barmode: 'group',
            width: 370,
            height: 450,
            legend: {
                orientation: 'h',
                x: 0,
                y: -0.2
            },
            margin: {
                l: 40,
                r: 0,
                t: 20,
                b: 0
            }
        };

        Plotly.newPlot('sg_loan_savings', data, layout, {
            displayModeBar: false
        });
    }

});
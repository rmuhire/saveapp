save.controller('lsViewCtrl', function($scope,$http,$location, AgentService, MemberService){
  $(function(){
              $('#women').cssCharts({type:"donut"}).trigger('show-donut-chart');
              $('#men').cssCharts({type:"donut"}).trigger('show-donut-chart');

          });
    
    
    $scope.$on('LoadSgLoansSavings', function(event, opt){
        $scope.total_members = opt.sg.male + opt.sg.female
        console.log(opt.sg, 'SG')
        $scope.cumulative_saving = numeral(opt.sg.cumulative_saving).format('0,0')
        $scope.current_saving = numeral(opt.sg.current_saving).format('0,0')
        
        
        AgentService.getSavingGroupMember(opt.sg.members_url)
            .then(function(response){
                var members = response.data.members
                var data = new Array()
               
                members.forEach(function(element, index){
                    console.log(element, 'Member')
                    var json = new Object()
                    MemberService.getMemberShares(element.member_shares)
                        .then(function(response){
                            json['names'] = element.user.name
                            json['contributions'] = numeral(response.data.contributions).format('0,0')
                            json['shares'] = response.data.shares
                            
                        }).catch(function(response){
                            console.log(response)
                        })
                    data.push(json)
                    $scope.members = data
                })
            }).catch(function(response){
                console.log(response)
            })
        
        
        
        
        var trace1 = {
              x: ['giraffes', 'orangutans', 'monkeys','giraf'],
              y: [20, 14, 23, 21],
              name: 'SF Zoo',
              type: 'bar'
            };

            var trace2 = {
              x: ['giraffes', 'orangutans', 'monkeys', 'giraf'],
              y: [12, 18, 29, 21],
              name: 'LA Zoo',
              type: 'bar'
            };

            var data = [trace1, trace2];

            var layout = {
                barmode: 'group',
                width: 320, 
            height: 400,
          legend:{
            orientation	: 'h',
            x:0,
            y:-0.2
          },
            margin: {
                    l: 20,
                    r: 0,
                    t: 0,
                    b: 0
                }
                };

            Plotly.newPlot('sg_loan_savings', data, layout, {displayModeBar: false});


        });
    });

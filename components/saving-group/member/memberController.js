save.controller('memberViewCtrl', function($scope,$http,$location, AgentService, MemberService){
     
    $scope.$on('LoadSgMember', function(event, opt){
        AgentService.getSavingGroupMember(opt.sg.members_url)
            .then(function(response){
                $scope.total_members = response.data.pages.total;
            
                // render chart 
                var male_per = opt.sg.male / $scope.total_members;
                var female_per = opt.sg.female / $scope.total_members;
                $scope.male = opt.sg.male;
                $scope.female = opt.sg.female;

                $("#men").attr("data-percent", male_per.toFixed(2));
                $("#men").attr("data-title", "men %");
                $("#women").attr("data-percent", female_per.toFixed(2));
                $("#women").attr("data-title", "Women %");
            

                $('#women').empty().cssCharts({type:"donut"}).trigger('show-donut-chart');
                $('#men').empty().cssCharts({type:"donut"}).trigger('show-donut-chart');
            
                var members = response.data.members
                var data = new Array()
                var i
                var a = 0, b = 0, c = 0 , d= 0
                var range = new Array(a, b, c, d)
                members.forEach(function(element, index){
                    var json = new Object()
                    i = $scope.ageRange(element.user.age)
                    range[i] = range[i] + 1
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
                    $scope.pieChart(range)
                })
            }).catch(function(response){
                console.log(response)
            })
        
        
        
        
    })
    
    
    $scope.ageRange = function(x){
        switch (true) {
            case (x >= 18 && x <= 25):
                return 0
            case (x >= 26 && x <= 35):
                 return 1
            case (x >=36 && x <= 45):
                return 2
            default:
                return 3
        }
    }
    
    $scope.pieChart = function(values){
        var data = [{
          values: values,
          labels: ['18-25', '26-35', '36-45', '46-Above'],
          type: 'pie'
        }];

        var layout = {
          width: 300,
          height: 400,
          legend:{
            orientation	: 'v',
            x:0,
            y:-0.2
          },
            margin: {
                    l: 40,
                    r: 0,
                    t: 0,
                    b: 0
                }
        };

        Plotly.newPlot('member_group_age', data, layout, {displayModeBar: false});
    }
    
        
    
})

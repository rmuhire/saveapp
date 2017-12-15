save.controller('memberViewCtrl', function($scope,$http,$location){
  $(function(){
              $('#women').cssCharts({type:"donut"}).trigger('show-donut-chart');
              $('#men').cssCharts({type:"donut"}).trigger('show-donut-chart');

          });
    
    
    $scope.$on('LoadSgMember', function(event, opt){
        var data = [{
          values: [19, 26, 55],
          labels: ['Residential', 'Non-Residential', 'Utility'],
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
                    l: 0,
                    r: 0,
                    t: 0,
                    b: 0
                }
        };

        Plotly.newPlot('member_group_age', data, layout, {displayModeBar: false});
    })
    
})

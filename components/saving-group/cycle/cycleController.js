save.controller('cycleViewCtrl', function($scope, $http, $location){
    
    
    $scope.$on('LoadSgCycle', function(event, opt){
        var data = [{
          values: [16, 15, 12],
          labels: ['US', 'China', 'European Union'],
          domain: {
            x: [0, .48]
          },
          name: 'GHG Emissions',
          hoverinfo: 'label+percent',
          hole: .4,
          type: 'pie'
        }];

        var layout = {
          annotations: [
            {
              font: {
                size: 20
              },
              showarrow: false,
              text: '',
              x: 0.17,
              y: 0.5
            }
            
          ],
          width: 580,
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

        Plotly.newPlot('sg_cycle', data, layout, {displayModeBar: false});
        
        
        var trace1 = {
              x: ['giraffes', 'orangutans', 'monkeys'],
              y: [20, 14, 23],
              name: 'SF Zoo',
              type: 'bar'
            };

            var trace2 = {
              x: ['giraffes', 'orangutans', 'monkeys'],
              y: [12, 18, 29],
              name: 'LA Zoo',
              type: 'bar'
            };

            var data = [trace1, trace2];

            var layout = {
                barmode: 'group',
                width: 480,
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

            Plotly.newPlot('sg_cycle_money', data, layout, {displayModeBar: false});


        });
    
    
    
})
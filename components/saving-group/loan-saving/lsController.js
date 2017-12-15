save.controller('lsViewCtrl', function($scope,$http,$location){
  $(function(){
              $('#women').cssCharts({type:"donut"}).trigger('show-donut-chart');
              $('#men').cssCharts({type:"donut"}).trigger('show-donut-chart');

          });
    
    
    $scope.$on('LoadSgLoansSavings', function(event, opt){
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

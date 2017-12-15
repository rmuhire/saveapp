save.controller('dividendsViewCtrl', function($scope, $http, $location) {
    $scope.$on('LoadSgDividends', function(event, opt) {
        var data = [{
            x: ['giraffes', 'orangutans', 'monkeys'],
            y: [20, 14, 23],
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
                l: 20,
                r: 0,
                t: 0,
                b: 40
            }
        };

        Plotly.newPlot('sg_dividents', data, layout, {
            displayModeBar: false
        });


    });
})
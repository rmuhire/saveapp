save.controller('cycleViewCtrl', function($scope, $http, $location, SGCycleService) {


    $scope.$on('LoadSgCycle', function(event, opt) {
        // get Cycles
        //console.log(opt.sg)
        $scope.status = opt.sg.status ? "Graduated" : "Supervised";
        SGCycleService.getSgCycles(opt.sg.cycle_url).then(function(response) {
            console.log(response.data.cycles)
            if (response.data.cycles.length !== 0) {
                $scope.cycle_length = response.data.cycles.length
                $scope.first_cycle = response.data.cycles[0].start

                // get cycles members
                var cycles = response.data.cycles
                var values = new Array()
                var labels = new Array()
                var x = new Array()
                var y = new Array()
                var suggestions = new Array('First', 'Second', 'Third', 'Fourth', 'Fifth')
                cycles.forEach(function(element, index) {
                    console.log(element)
                    SGCycleService.getCyclesMembers(element.members_url)
                        .then(function(response) {
                            values.push(response.data.members.length)
                            labels.push(suggestions[index])
                            $scope.pieChart(values, labels)

                        })
                        .catch(function(response) {
                            console.log(response)
                        })
                    SGCycleService.getCyclesShareOut(element.cycle_share_out_url)
                        .then(function(response) {
                            x.push(suggestions[index])
                            y.push(response.data.reinvested_amount)
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



        $scope.pieChart = function(values, labels) {
            var data = [{
                values: values,
                labels: labels,
                domain: {
                    x: [0, .48]
                },
                name: 'Members per cycle',
                hoverinfo: 'label+percent',
                hole: .4,
                type: 'pie'
            }];

            var layout = {
                annotations: [{
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
                legend: {
                    orientation: 'v',
                    x: 0,
                    y: -0.2
                },
                margin: {
                    l: 0,
                    r: 0,
                    t: 0,
                    b: 0
                }
            };

            Plotly.newPlot('sg_cycle', data, layout, {
                displayModeBar: false
            });
        }


        $scope.BarChart = function(x, y) {
            var trace1 = {
                x: x,
                y: y,
                name: 'Money Reinvested after cycle',
                type: 'bar'
            };

            var data = [trace1];

            var layout = {
                barmode: 'group',
                width: 480,
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

            Plotly.newPlot('sg_cycle_money', data, layout, {
                displayModeBar: false
            });
        }




    });



})
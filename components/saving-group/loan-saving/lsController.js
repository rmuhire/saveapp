save.controller('lsViewCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
  $(function(){
              $('#women').cssCharts({type:"donut"}).trigger('show-donut-chart');
              $('#men').cssCharts({type:"donut"}).trigger('show-donut-chart');

          });
}])

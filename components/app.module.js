var save = angular.module('save', ['ngRoute','base64','ngCookies'])
                  .config(function($httpProvider, $base64){
                      var auth = $base64.encode("eyJhbGciOiJIUzI1NiIsImV4cCI6MTUwODQwMzgxNiwiaWF0IjoxNTA4MzE3NDE2fQ.eyJpZCI6MX0.4uZ7CfrQz_AXz5ErwnwzNTsh67phhNx-qBATMcXE_X0:");
                      $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + auth;
                      $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
                  }); 
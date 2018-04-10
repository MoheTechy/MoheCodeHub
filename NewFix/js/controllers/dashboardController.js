angular.module('NewApp').controller('dashboardController',function($scope, $location, appReq){

    var teamDiv = 1;

    $scope.teamsData = function(){
        appReq.getTeamData(teamDiv).success(function(res){
            console.log(res);
            $scope.teamDetails = res.data;
        }).error(function(res){
            console.log(res);
        });        
    };

    $scope.teamsData();
});
angular.module('NewApp').controller('teamRegisterController',function($scope,$location,appReq){

    // Division JSON
    $scope.teamDivision = [{'id':'1','div':'I'},{'id':'2','div':'II'},{'id':'3','div':'III'},{'id':'4','div':'KNOCK OUT'}];

    // Team Registration
    $scope.addNewTeam = function(){
        appReq.teamRegister($scope.teamRegNo,$scope.teamName,$scope.teamChair,$scope.teamDiv,$scope.teamRegDate,$scope.teamSize).success(function(data){
            console.log(data);
            if(data.flag = true){
                toastr.success(data.message);
            }else{
                toastr.error(data.message);
            }
        }).error(function(data){
            console.log(data);
        });
    };

});
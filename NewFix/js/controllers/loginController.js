angular.module("NewApp").controller('loginController',function($scope, $rootScope, $location, appReq){

    $scope.loginUser = function(){
        // $location.path('/userDashboard');
        var pwd = atob($scope.userPwd);
        appReq.userLogin($scope.userName,pwd).success(function(data){
            console.log(data);
            
            if(data.flag == true){
                var msg = data.message;
                $rootScope.token = data.token;
                console.log($rootScope.token);
                toastr.success(msg);
                $location.path('/userDashboard');
            }else{
                var msg = data.message;
                toastr.error(msg);
            }
        }).error(function(data){
            console.log(data);
        });
    };

});
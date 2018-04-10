angular.module('NewApp').controller('teamRegisterController',function($scope,$location,appReq,appFunc){

    var teamDiv = 1;
    //TEAM LOV
    appReq.getTeamData(teamDiv).success(function(res){
        console.log(res);
        $scope.teamDetails = res.data;
    }).error(function(res){
        console.log(res);
    });

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

    //Base64 convertion
    $scope.imageConvert = function(docID){
        console.log($scope.files);
        if($scope.files.length>0){
            var fileToLoad = $scope.files[0];
            console.log(fileToLoad);
            var fr = new FileReader();
            fr.onload = function(fileLoadedEvent){
                base64Value = fileLoadedEvent.target.result;
                // console.log(base64Value);
                var img = [];
                var img = base64Value.split(",");
                console.log(base64Value);
                // $scope.imgFile = img[1];
                appReq.putDoc(img[1],docID).success(function(data){
                    console.log(data);
                    toastr.success(data.Msg);
                }).error(function(data){
                    console.log(data);
                });
            };
            fr.readAsDataURL(fileToLoad);
        }
    };

    $scope.uploadDoc = function(){
        $scope.imageConvert($scope.teamRegID);
    };

    //Get Logo 
    $scope.showLogo = function(){
        appReq.viewDoc($scope.teamRegID).success(function(data){
            console.log(data);
            if(data){
                $scope.logoPNG = data[0].docFile;
                console.log($scope.logoPNG);
            }
        }).error(function(data){
            console.log(data);
        });
    };

})
.directive('fileInput',['$parse',function($parse){
	return{
		restrict: 'A',
		link:function(scope,elm,attrs){
			elm.bind('change',function(){
				$parse(attrs.fileInput).assign(scope,elm[0].files);
				scope.$apply();
			});
		}
	};
}])
.factory('appFunc',function(){
return 10;
});
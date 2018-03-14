NewApp.service("appReq",function($http,$rootScope){

    //User Registration
    this.userRegister = function(regUser,regMail,regPass) {
        
        return  $http({
                method:'post',
                url:'http://localhost:5000/method/user/register',
                data:'username=' + regUser + '&' + 'email=' + regMail + '&' + 'pass=' + regPass,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        };
    
        //User Login
        this.userLogin = function (user,pass) {
            
        return  $http({
                method:'post',
                url:'http://localhost:5000/methos/user/login',
                data:'username=' + user + '&' + 'password=' + pass + '&' +'passwordEncoded=true',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        };

        //New Team Registration
        this.teamRegister = function(teamRegNo,teamName,teamChair,teamDiv,teamRegDate,teamSize){
        
        return  $http({
                method:'post',
                url:'http://localhost:5000/method/team/register',
                data:'teamRegNo='+ teamRegNo + '&' + 'teamName=' + teamName + '&' + 'teamChair=' + teamChair + '&' + 'teamDiv=' + teamDiv + '&' + 'teamRegDate=' + teamRegDate + '&' + 'teamSize=' + teamSize  + '&' +'passwordEncoded=true',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authentication-token': $rootScope.token,
                },
            });
        };
        
});
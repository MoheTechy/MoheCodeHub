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

        //Get Teams Data
        this.getTeamData = function(teamDiv){

        return  $http({
                method:'post',
                url:'http://localhost:5000/method/team/teamList',
                data:'division='+ teamDiv + '&' +'passwordEncoded=true',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    'authentication-token': $rootScope.token,
                },
            });
        };

        //Document Store
        this.putDoc = function(docFile,docID){
        // alert(logo);
        var logo = encodeURIComponent(docFile);
        return  $http({
                method:'post',
                url:'http://localhost:5000/document/team/logo',
                data:'logoDoc='+ logo + '&' + 'teamId='+ docID + '&' +'passwordEncoded=true',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
                    // 'Accept':'application/json; charset=ut f-8',
                    'authentication-token': $rootScope.token,
                }
            });  
        };

        //Document View
        this.viewDoc = function(teamRegID){

        return $http({
            method:'post',
            url:'http://localhost:5000/document/teamLogo/get',
            data:'docID='+ teamRegID + '&' +'passwordEncoded=true',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                // 'Content-Type':'application/json',
                'authentication-token': $rootScope.token,
            }
            });
        };
        
});
/* New App */
var NewApp = angular.module("NewApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize"
]);

//App Factory
NewApp.factory("appFactory", ['$rootScope', function($rootScope){

    
}]);

//App Controller
NewApp.controller("AppController",['$scope',function(){
    // alert("hhh");
}]);

//Side Bar Controller
NewApp.controller("sideBarController",['$scope',function(){
    // alert("hhh");
}]);

//Head Bar Controller
NewApp.controller("headBarController",['$scope',function(){
    // alert("hhh");
}]);

//setup Routing for all pages
NewApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise("/userLogin");

    $stateProvider

    .state('UserLogin', {
        url: "/userLogin",
        templateUrl: "views/login.html",
        data: { pageTitle: 'Login' },
        controller: "loginController",
        resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'LOGIN',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        
                        'js/controllers/loginController.js',
                    ]
                });
            }]
        }
    })

    .state('userDashboard', {
        url: "/userDashboard",
        templateUrl: "views/dashboard.html",
        data: { pageTitle: 'Dashboard' },
        controller: "dashboardController",
        resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'LOGIN',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        
                        'js/controllers/dashboardController.js',
                    ]
                });
            }]
        }
    })

    .state('Team-Reg',{
        url:'/teamRegister',
        templateUrl:'views/teamRegister.html',
        data:{ pageTitle: 'Team Register'},
        controller:'teamRegisterController',
        resolve:{
            deps: ['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load({
                    name: 'Team Register',
                    insertBefore: '#ng_load_plugins_before',
                    files:[

                        'js/controllers/teamRegisterController.js'
                    ]
                });
            }]
        }
    });

}]);
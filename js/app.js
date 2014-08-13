var app = angular.module('athena',['ionic']);



app.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
    $stateProvider.
        state('main', {
            url         : '/',
            templateUrl : 'templates/main.html',
            controller  : 'MainCtrl'
        }).
        state('add', {
            url         : '/add',
            templateUrl : 'templates/add.html',
            controller  : 'addCtrl'
        }).
        state('show', {
            url         : '/show',
            templateUrl : 'templates/show.html',
            controller  : 'showCtrl'
        }).
        state('stats', {
            url         : '/stats',
            templateUrl : 'templates/stats.html',
            controller  : 'statsCtrl'
        }).
        state('erase', {
            url         : '/erase',
            templateUrl : 'templates/erase.html',
            controller  : 'eraseCtrl'
        }).
        state('about', {
            url         : '/about',
            templateUrl : 'templates/about.html',
            controller  : 'aboutCtrl'
        });

    $urlRouterProvider.otherwise('/');


    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
});

app.controller('MainCtrl', ['$scope',
    function($scope) {
        $scope.appname = "Athena";
        $scope.descr = "Headache diary";
}]);

app.controller('addCtrl', ['$scope',
    function($scope) {
        $scope.appname = "Athena";
        $scope.descr = "Headache diary";
}]);

app.controller('showCtrl', ['$scope',
    function($scope) {
        $scope.appname = "Athena";
        $scope.descr = "Headache diary";
}]);

app.controller('statsCtrl', ['$scope',
    function($scope) {
        $scope.appname = "Athena";
        $scope.descr = "Headache diary";
}]);

app.controller('eraseCtrl', ['$scope',
    function($scope) {
        $scope.appname = "Athena";
        $scope.descr = "Headache diary";
        
        $scope.eraseall = function(){
    
        localStorage.clear();
        alert("The diary has been cleared");
        
    };
}]);


app.controller('aboutCtrl', ['$scope',
    function($scope) {
        $scope.appname = "Athena";
        $scope.descr = "Headache diary";
}]);

app.controller('addController', ['$scope', function($scope) {
    
  this.attack= {};
  this.test2 = {};
    
  this.submitAtt = function(){
    var eventDate = document.getElementById("attackDate").value;
    var eventTime = document.getElementById("attackTime").value;
    eventDate += " ";
    eventDate += eventTime;
    var attack = {unilateral: $scope.unilateral, pulsating: $scope.pulsating, severity: $scope.severity,
                 routine: $scope.routine, nausea: $scope.nausea, phonophobia:  $scope.phono, photo: $scope.photo,
                 visual: $scope.visual, sensor: $scope.sensor, speech: $scope.speech, motor: $scope.motor,
                 less4h: $scope.less4h, short: $scope.short, redeye: $scope.redeye};
    localStorage.setItem(eventDate, JSON.stringify(attack));
    var stored = localStorage.getItem(eventDate);
    test = JSON.parse(stored);
    alert("The attack is now in your database!");
  };
    
  $scope.unilateral = false;
  $scope.pulsating = false;
  $scope.severity = false;
  $scope.routine = false;
  $scope.nausea = false;
  $scope.phono = false;
  $scope.photo = false;
  $scope.visual = false;
  $scope.sensor = false;
  $scope.speech = false;
  $scope.motor = false;
  $scope.less4h = false;
  $scope.short = false;
  $scope.redeye = false;
}]);





app.controller('showController', function() {
    
    var description = "";  
    val = localStorage.getItem("2014-08-13");

    for (i=0; i<=localStorage.length-1; i++)  
			{  
				key = localStorage.key(i);  
				val = localStorage.getItem(key);
                translated = JSON.parse(val);
                
                description += '<div class="item item-divider">';
                description += key;
                description += "</div>"
                
                var aura = false;
                if (translated.visual === true) {
                    aura = true;
                };
                if (translated.sensor === true) {
                    aura = true;
                };
                if (translated.speech === true) {
                    aura = true;
                };
                if (translated.motor === true) {
                    aura = true;
                };
            

                if (translated.unilateral === false) {
                    description += "Diffuse, ";
                } else {
                    description += "Unilateral, ";
                };
                
                
                if (translated.pulsating === false) {
                    description += "non-pulsating, ";
                } else {
                    description += "pulsating, ";
                };
                
                if (translated.short === true) {
                    description += "short lasting (seconds to few minutes) ";
                } else {
                    if (translated.less4h === true) {
                        description += "less than 4 hours long ";
                    }
                };
                
                if (translated.severity === false) {
                    description += "non-severe pain. ";
                } else {
                    description += "severe pain. ";
                };
                
                description += "The patient experienced ";
                
                if (translated.nausea === true) {
                    description += "nausea/vomiting, ";
                };
                
                if (translated.photo === true) {
                    description += "photophobia, ";
                };
                
                if (translated.phono === true) {
                    description += "phonophobia, "
                };
                
                if (translated.routine === false) {
                    description += "no avoidance of routine physical activity. ";
                } else {
                    description += "avoidance of routine physical activity.  ";
                };
                
                if (aura === true) {
                    description += "Also checked ";
                    if (translated.visual === true) {
                        description += "visual disturbances, ";
                    };
                    if (translated.sensor === true) {
                        description += "sensory disturbances, ";
                    };
                    if (translated.speech === true) {
                      description += "language disturbances, ";
                    };
                    if (translated.motor === true) {
                        description += "motor disturbances, ";
                    };
                    description += " as possible aura symptoms.";
                };
                
                if (translated.redeye === true) {
                    description += "The patient also complained with lacrimation/eye redness. "
                };
                
                
			}  
        
    var node = document.getElementById('node-id');
    node.innerHTML = description;

});

app.controller('statsController', function() {
    
    var stReport = "";
    val = localStorage.getItem("2014-08-13");
    
    var auraCount = 0;
    var visualCount = 0;
    var sensorCount = 0;
    var speechCount = 0;
    var motorCount = 0;
    var shortCount = 0;
    var redeyeCount = 0;

    var migraineLike = 0;
    var tensionLike = 0;
    var totalCount = 0;
    
    for (i=0; i<=localStorage.length-1; i++)  
			{  
				key = localStorage.key(i);  
				val = localStorage.getItem(key);
                translated = JSON.parse(val);
                
                var criteriumBforM = true;
                var criteriumBforT = true;
                var criteriumCforM = false;
                var criteriumCforT = false;
                var cCount = 0;
                var criteriumDforM = false;
                var criteriumDforT = false;
                         
                totalCount += 1;              
                
                var seemsMigraine = false;
                var aura = false;
                
                

                if (translated.unilateral === true) {
                    cCount += 1;
                };
                
                
                if (translated.pulsating === true) {
                    cCount += 1;
                };
                
                                
                if (translated.severity === true) {
                    cCount += 1;
                };
                
                if (translated.routine === true) {
                    cCount += 1;
                };
                
                if (cCount >= 2) {
                    criteriumCforM = true;
                };
                
                
                if (cCount <= 2) {
                    criteriumCforT = true;
                };
                
                if (translated.short === true) {
                    shortCount += 1;
                    criteriumBforM = false;
                    criteriumBfort = false;
                } else {
                    if (translated.less4h === true) {
                       criteriumBforM = false;
                    }
                };
                
                if (translated.photo === true) {
                    criteriumDforM = true;
                };
                
                if (translated.phono === true) {
                    criteriumDforM = true;
                };
                
                if (translated.photo === false || translated.phono === false) {
                    criteriumDforT = true;
                };
                
                if (translated.nausea === true) {
                    criteriumDforM = true;
                    criteriumDforT = false;
                };
                
                if (criteriumBforM === true && criteriumCforM === true && criteriumDforM === true) {
                    migraineLike += 1;
                    seemsMigraine = true;
                } else if (criteriumBforT === true && criteriumCforT === true && criteriumDforT === true) {
                    tensionLike +=1;
                };
                
                if (translated.visual === true && seemsMigraine === true) {
                    aura = true;
                    visualCount += 1;
                };
                if (translated.sensor === true && seemsMigraine === true) {
                    aura = true;
                    sensorCount += 1;
                };
                if (translated.speech === true && seemsMigraine === true) {
                    aura = true;
                    speechCount += 1;
                };
                if (translated.motor === true && seemsMigraine === true) {
                    aura = true;
                    motorCount += 1;
                };
                
                if (aura === true) {
                    auraCount += 1;
                };

                if (translated.redeye === true){
                    redeyeCount += 1;
                };
            
			} 
    
    
    stReport += '<div class="item item-divider">Overall counts</div>';
    stReport += '<a class="item">Total count: ';
    stReport += totalCount;
    stReport += '</a>';
    if (migraineLike >= 1) {
        stReport += '<a class="item">Migraine-like episodes: '
        stReport += migraineLike;
        stReport += '</a>';
    };
    if (tensionLike >= 1) {
        stReport += '<a class="item">Tension-type-like episodes: '
        stReport += tensionLike;
        stReport += '</a>';
    };
    
    if (auraCount != 0) {
        stReport += '<div class="item item-divider">Aura-like symptoms</div>';
        stReport += '<a class="item">Migraine with aura-like episodes: ';
        stReport += auraCount;
        stReport += '</a>';
    };
    
    if (visualCount != 0) {
        stReport += '<a class="item">Visual disturbances: ';
        stReport += visualCount;
        stReport += '</a>';
    };
    
    if (sensorCount != 0) {
        stReport += '<a class="item">Sensory disturbances: ';
        stReport += sensorCount;
        stReport += '</a>';
    };
    
    if (speechCount != 0) {
        stReport += '<a class="item">Speech disturbances: ';
        stReport += speechCount;
        stReport += '</a>';
    };
    
    if (motorCount != 0) {
        stReport += '<a class="item">Motor disturbances: ';
        stReport += motorCount;
        stReport += '</a>';
    };
    
    if (shortCount != 0 || redeyeCount != 0 ) {
        stReport += '<div class="item item-divider">Other features</div>';
    };
    if (shortCount != 0){
        stReport += '<a class="item">Very short episodes: ';
        stReport += shortCount;
        stReport += '</a>';
    };
    if (redeyeCount != 0){
        stReport += '<a class="item">Episodes with lacrimation/red eye: ';
        stReport += redeyeCount;
        stReport += '</a>';
    };
    
    var statsdiv = document.getElementById('stats-id');
    statsdiv.innerHTML = stReport;

});
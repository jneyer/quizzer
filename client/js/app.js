var quizzer = angular.module("quizzer", ['ngRoute', 'ngSanitize'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl : 'views/questionSets.html',
        controller  : 'testListController'
    })
    .when('/view', {
        templateUrl : 'views/view.html',
        controller  : 'viewController'
    })
    .when('/edit', {
        templateUrl : 'views/edit.html',
        controller  : 'editController'
    })
    .when('/run', {
        templateUrl : 'views/run.html',
        controller  : 'runController'
    })
    .when('/config',{
        templateUrl : 'views/testConfig.html',
        controller : 'testConfigController'
    })
    .otherwise({redirectTo: '/'});

    $locationProvider.hashPrefix();

}])
.filter("unBreakFilter", function() {
    return function(text) {
        return reverseBreaks(text);
    };
})
.factory("questionService", function() {
    var q = {};
    function set(question) {
        q = question;
    }
    function get() {
        return q;
    }
    return {
        set: set,
        get: get
    }
})
.factory ("questionSet", function () {
    var q = {};
    q.name = "All";
    q.questions = [];

    function set (qset) {
        q = qset;
        if (qset.questions == null) {
            qset.questions = [];
        }
        // don't carry around the hashKey
        q.$$hashKey = null;
    }
    function get() {
        return q;
    }
    return {
        set: set,
        get: get
    }
})
.factory("questionFilter", function() {
    var f = {};
    function set (filter) {
        f = filter;
    }
    function get() {
        return f;
    }
    return {
        set: set,
        get: get
    }
});

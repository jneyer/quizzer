quizzer.controller("testListController", function ($scope, $window, $http, questionSet, questionFilter) {

    $scope.tests = [];

    $scope.runTest = function(test) {
        questionSet.set(test);
        window.location.href = '/#/run';
    };
    $scope.editTest = function(test) {
        questionSet.set(test);
        window.location.href = '/#/view';
    };
    $scope.addSet = function() {
        $scope.tests.push({"new": true});
        $scope.sendStatus = "";
    };
    $scope.addQuestions = function(test) {
        questionSet.set(test);
        window.location.href = '/#/config';
    };
    $scope.isSaved = function (test) {
        if (test.name) {
            if (test.new) {
                return false;
            }
            return true;
        }
        return false;
    };
    $scope.save = function (test) {

        var operation = "POST";
        var url = "/api/tests";

        if ($scope.isSaved(test)) {
            operation = "PUT";
        }
        if (test.name == "" && test.id) {
            operation = "DELETE";
            url = url + "/" + test.id
        }

        var body = {};
        body.id = test.id;
        body.questions = test.questions;
        body.name = test.name;

        var windowReload = function(response) {
            window.location.reload();
        };

        sendHttp(operation, url, body, windowReload, showError, $http);

        test.new = false;
    };

    var init = function () {

        var processQuestionList = function(response) {
            $scope.tests = response;
        };

        sendHttp("GET", "/api/tests", null, processQuestionList, showError, $http);
    };

    var showError = function(response) {
        $scope.sendStatus = "Error getting tests: " + response.status + "\n" +  response.responseText;
    };

    init();
});

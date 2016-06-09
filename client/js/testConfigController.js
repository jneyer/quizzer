quizzer.controller("testConfigController", function($scope, $window, $http, questionService, questionSet) {
    $scope.questions = [{}];
    $scope.sendStatus = "";
    $scope.rownum = 0;
    $scope.qset = {};
    $scope.items = [];
    $scope.boxes = [];

    $scope.rowNumber = function() {
        return $scope.rownum;
    };

    $scope.editQuestion = function(question) {
        if (question) {
            // navigate to edit page
            questionService.set(question);
            $window.location.href = '/#/edit';
        }
    };

    $scope.run = function() {
        $window.location.href = '/#/run'
    };

    $scope.addQuestion = function() {
        // clear question and navigate
        question = {};
        questionService.set(question);
        $window.location.href = '/#/edit';
    };
    $scope.addToTest = function(question, added) {
        if (added) {
            if ($scope.qset.questions.indexOf(question.id) == -1) {
                $scope.qset.questions.push(question.id);
            }
        } else {
            var position = $scope.qset.questions.indexOf(question.id);
            if (position > -1) {
                $scope.qset.questions.splice(position, 1);
            }
        }
    }
    $scope.submit = function() {
        var body = {};
        body.name = $scope.qset.name;
        body.id = $scope.qset.id;
        body.questions = $scope.qset.questions;

        var showSuccess = function (response) {
            $scope.sendStatus = "Questions updated.";
        };

        var showError = function (response) {
            $scope.sendStatus = "Error setting questions: " + response.status + "\n" +  response.responseText;
        };

        sendHttp("PUT", "/api/tests", body, showSuccess, showError, $http);
    };

    var init = function () {
        $scope.qset = questionSet.get();

        var processQuestions = function (response) {
            $scope.questions = response;
            for (var i=0; i<$scope.questions.length; i++) {
                $scope.boxes[i] = {};
                if ($scope.qset.questions.indexOf($scope.questions[i].id) == -1) {
                    $scope.boxes[i].value = false;
                }
                else {
                    $scope.boxes[i].value = true;
                }
            }
        };

        var showError = function (response) {
            $scope.sendStatus = "Error getting questions from API: " + response.status + "\n" +  response.responseText;
        };

        sendHttp("GET", "/api/questions", null, processQuestions, showError, $http);
    }

    init();
});

quizzer.controller("editController", function($scope, $window, $http, questionService) {
    $scope.question = {}
    $scope.viewQuestion = "";
    $scope.answers = [{id: 'answer1'}];
    $scope.sendStatus = "";

    $scope.showQuestions = function() {
        $window.location.href = '/#/view';

    };
    $scope.addNewAnswer = function() {
        var newItemNo = $scope.answers.length+1;
        $scope.answers.push({'id':'answer'+newItemNo});
    };
    $scope.update = function () {

        var request = [];

        var showSuccess = function (response) {
            $scope.sendStatus = "Success: " + response.status;
            $window.location.href = '/#/view';
        };

        var updateError = function(response) {
            $scope.sendStatus = "Error posting answers: " + response.status + "\n" +  response.responseText;
        };

        var continueProcessing = function(response) {
            if (debug) console.log("continueProcessing");
            sendHttp("POST", updateURL, request, showSuccess, updateError, $http);
        };

        var body = {}
        body.question = addBreaks($scope.viewQuestion);

        var operation = "POST";
        var updateURL = "http://localhost:4001/api/questions";
        if ($scope.question.id) {
            operation = "PUT";
            updateURL += "/" + $scope.question.id + "/";
        }

        var updateAnswers = function(response) {
            if (debug) console.log("updateAnswers");
            for (i in $scope.answers) {
                var val = {}
                val.answer = addBreaks($scope.answers[i].answer);
                val.correct = (!$scope.answers[i].correct ? false: $scope.answers[i].correct);
                request.push(val);
            }

            updateURL = "http://localhost:4001/api/questions/" + response.id + "/answers";
            if ($scope.question.id) {
                if (debug) console.log("preparing delete");

                var showError = function (response) {
                    $scope.sendStatus = "Error deleting answers: " + response.status + "\n" +  response.responseText;
                };

                updateURL = "http://localhost:4001/api/questions/" + $scope.question.id + "/answers";
                sendHttp("DELETE", updateURL, null, continueProcessing, showError, $http);
            }
            else {
                continueProcessing();
            }

        };

        if (debug) console.log("first request");
        sendHttp(operation, updateURL, body, updateAnswers, showError, $http);
    };

    var init = function () {
        $scope.question = questionService.get();
        $scope.viewQuestion = reverseBreaks($scope.question.question);

        if ($scope.question.id) {

            var processAnswers = function (response) {
                $scope.answers = response;
                for (var i = 0; i<$scope.answers.length; i++) {
                    $scope.answers[i].answer = reverseBreaks($scope.answers[i].answer);
                }
            };

            sendHttp("GET","http://localhost:4001/api/questions/" + $scope.question.id + "/answers", null, processAnswers, showError, $http);
        }
    }

    var showError = function(response) {
        $scope.sendStatus = "Error getting questions from API: " + response.status + "\n" +  response.responseText;
    };

    init();
});

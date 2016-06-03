quizzer.controller("runController", function ($scope, $window, $http, questionSet) {
    $scope.index = 0;
    $scope.questions = [];
    $scope.answers = [];
    $scope.responses = [];
    $scope.currentQuestion = {};
    $scope.numChoices = 0;
    $scope.answerStatus = "";
    $scope.numResponses = 0;
    $scope.tryAgain = false;
    $scope.qset = {};

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    $scope.letter = "";

    $scope.submit = function () {

    };
    $scope.next = function(direction) {
        if (!direction) {
            direction = 1;
        }
        $scope.index += direction;
        $scope.refresh();
        window.location.href = '/#/run';
    };

    $scope.getLetter = function(index) {
        return alphabet[index];
    };

    $scope.showPrev = function() {
        return $scope.index > 0;
    };

    $scope.showNext = function() {
        return $scope.index < $scope.questions.length - 1;
    };

    $scope.checkAnswers = function() {

        var success = true;

        for (var i = 0; i < $scope.responses.length; i++) {
            if ($scope.responses[i].correct) {
                $scope.numResponses++;
            }
        }

        if ($scope.numResponses >= $scope.numChoices) {
            for (var i = 0; i < $scope.responses.length; i++) {

                if ($scope.responses[i].correct != $scope.answers[i].correct) {
                    success = false;
                }
            }

            if (success) {
                message = "Correct";
            }
            else {
                message = "Incorrect";
            }
            $scope.answerStatus = message;
            $scope.tryAgain = !success;
        }
    };

    $scope.disableCheck = function() {
        return ($scope.numResponses >= $scope.numChoices);
    };

    $scope.refresh = function() {
        $scope.numResponses = 0;
        $scope.tryAgain = false;
        $scope.answerStatus = "";
        $scope.currentQuestion = $scope.questions[$scope.index];
        if ($scope.currentQuestion.id) {

            var processAnswers = function (response) {
                $scope.responses = response;

                for (var i=0; i<$scope.responses.length; i++) {
                    $scope.answers[i] = {"correct":$scope.responses[i].correct};
                }

                $scope.numChoices = 0;
                for (var i = 0; i<$scope.responses.length; i++) {
                    if ($scope.responses[i].correct == true) {
                        $scope.numChoices++;
                    }
                    $scope.responses[i].correct = false;
                }

                console.log($scope.answers);
            };

            var showError = function (response) {
                $scope.sendStatus = "Error getting answers from API: " + response.status + "\n" +  response.responseText;
            };

            sendHttp("GET","http://localhost:4001/api/questions/" + $scope.currentQuestion.id + "/answers", null, processAnswers, showError, $http);
        }
    };

    var init = function () {
        $scope.qset = questionSet.get();

        if ($scope.qset.questions.length > 0) {
            filter = '?filter={"where": {"id": {"inq": ' + JSON.stringify($scope.qset.questions) + '}}}';
        } else {
            filter = '?filter={"where": {"id": {"inq": ' + JSON.stringify(["none"]) + '}}}';
        }

        var processQuestions = function(response) {
            $scope.questions = response;
            $scope.refresh();
        };

        var showError = function(response) {
            $scope.sendStatus = "Error getting questions from API: " + response.status + "\n" +  response.responseText;
        };

        sendHttp("GET", "http://localhost:4001/api/questions" + filter, null, processQuestions, showError, $http);

    };
    init();
});

quizzer.controller("viewController", function($scope, $http, $window, questionService, questionSet) {
    $scope.questions = [{}];
    $scope.sendStatus = "";
    $scope.rownum = 0;
    $scope.qset = {};

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

    var init = function () {
        $scope.qset = questionSet.get();
        if ($scope.name == "") {
            $scope.name = "All";
        }

        var filter = "";

        if ($scope.qset.questions.length > 0) {
            filter = '?filter={"where": {"id": {"inq": ' + JSON.stringify($scope.qset.questions) + '}}}';
        } else {
            filter = '?filter={"where": {"id": {"inq": ' + JSON.stringify(["none"]) + '}}}';
        }

        var processQuestions = function (response) {
            $scope.questions = response;
        };

        var showError = function (response) {
            $scope.sendStatus = "Error getting questions from API: " + response.status + "\n" +  response.responseText;
        };

        sendHttp("GET", "http://localhost:4001/api/questions" +  filter, null, processQuestions, showError, $http);

    };

    init();
});

quizzer.controller("mainController", function ($scope, $window) {
    $scope.goHome = function() {
        $window.location.href = '/#/';
        $window.location.reload();        
    }
});

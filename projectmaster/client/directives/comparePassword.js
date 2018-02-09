myApp.directive("compareTo", function ()
{
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var notConfirm = (viewValue !== scope.signupForm.password.$viewValue);
                ctrl.$setValidity('notConfirm', !notConfirm);
                return viewValue;
            })
        }
    };
});


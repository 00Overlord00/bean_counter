console.log( 'SCRIPT: GO.' );

var myApp = angular.module( "myApp", [ "ngRoute" ] );

myApp.config( [ '$routeProvider', function( $routeProvider ) {
  $routeProvider.
  when( '/viewExpenses', {
    templateUrl: "/views/routes/viewExpenses.html",
    controller: "viewController"
  }).
  when( '/enterExpenses', {
    templateUrl: "views/routes/enterExpenses.html",
    controller: "enterController"
  }).
  when( '/spending', {
    templateUrl: "views/routes/spending.html",
    controller: "spendingController"
  }).
  otherwise({
    redirectTo: "/spending"
  });
}]);  //End myApp.config.

myApp.controller( 'spendingController', [ '$scope', '$http', function( $scope, $http ) {  //All functions to be used on "Track Spending" page.
  console.log( 'spendingController active.' );
  $scope.showMe = function() {
    var minDate = $scope.min_year + '-' + $scope.min_month + '-' + $scope.min_day;
    var maxDate = $scope.max_year + '-' + $scope.max_month + '-' + $scope.max_day;
    var queryObj = {
      minQuery: minDate,
      maxQuery: maxDate
    };
$http({
  method: 'POST',
  url: '/trackSpending',
  data: queryObj,
}).then( function( response ){
  $scope.alltheDates = response.data;
  console.log("response: " + response.data );
});
$scope.min_year = '';
$scope.min_month = '';
$scope.min_day = '';       //Reset input fields.
$scope.max_year = '';
$scope.max_month = '';
$scope.max_day = '';
  };  //End showMe().
}]);  //End spendingController

myApp.controller( 'enterController', [ '$scope', '$http', function( $scope, $http ) {  //All functions to be used on "Enter Expenses" page.
  console.log( 'enterController active.' );
  $scope.submitExpense = function() {
    var newExpense = {
      category: $scope.categoryIn,
      amount: $scope.amountIn,
      description: $scope.descIn,
      type: $scope.typeIn,
      date: $scope.date_year + '-' + $scope.date_month + '-' + $scope.date_day
    };  //End newExpense.
    console.log(newExpense);
    $http({
      method: 'POST',
      url: '/inputExpense',
      data: newExpense
    });  //End Post call.

      $scope.amountIn = '';
      $scope.categoryIn = '';
      $scope.typeIn = '';
      $scope.descIn = '';       //Resetting fields.
      $scope.date_month = '';
      $scope.date_day = '';
      $scope.date_year = '';
  };  //End submitExpense function.
}]);  //End enterController

myApp.controller( 'viewController', [ '$scope', '$http', function( $scope, $http ) {  //All functions to be used on "View All Expenses" page.
  console.log( 'viewController active.');
}]);  //End viewController.

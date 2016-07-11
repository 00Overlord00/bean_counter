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
    var minQuery = {
      mm: $scope.min_month,
      dd: $scope.min_day,
      yyyy: $scope.min_year
    };  //End minQuery.
    var maxQuery = {
      mm: $scope.max_month,
      dd: $scope.max_day,
      yyyy: $scope.max_year
    };  //End maxQuery.
    var compareDates = function( minQuery, maxQuery ) {  //ATTN: This is the work area, as of EOD Mon, July 11th.

    };
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
      dd: $scope.date_day,
      mm: $scope.date_month,
      yyyy: $scope.date_year
    };  //End newExpense.
    console.log(newExpense);
    $http({
      method: 'POST',
      url: '/inputExpense',
      data: newExpense
    });  //End Post call.
    console.log( 'Sending ', newExpense, ' to server.' );
    console.log( newExpense );
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

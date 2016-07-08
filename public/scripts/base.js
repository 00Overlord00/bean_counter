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
}]);  //End spendingController

myApp.controller( 'enterController', [ '$scope', '$http', function( $scope, $http ) {  //All functions to be used on "Enter Expenses" page.
  console.log( 'enterController active.' );
  $scope.submitExpense = function() {
    var newExpense = {
      amount: $scope.amountIn,
      category: $scope.categoryIn,
      type: $scope.typeIn,
      mm: $scope.date_month,
      dd: $scope.date_day,
      yyyy: $scope.date_year
    };  //End newExpense.
    console.log( newExpense );
    $http({
      method: 'POST',
      url: '/inputExpense',
      data: newExpense
    });  //End Post call.
      $scope.amountIn = '';
      $scope.categoryIn = '';
      $scope.typeIn = '';         //Resetting fields.
      $scope.date_month = '';
      $scope.date_day = '';
      $scope.date_year = '';
  };  //End submitExpense function.
}]);  //End enterController

myApp.controller( 'viewController', [ '$scope', '$http', function( $scope, $http ) {  //All functions to be used on "View All Expenses" page.
  console.log( 'viewController active.');
}]);  //End viewController.

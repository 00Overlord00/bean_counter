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
  data: queryObj
}).then( function( response ){
  $scope.alltheDates = response;
  // console.log("response: ", response);
  // console.log( "response contains: ", response.data[0].amount, response.data[0].description, "length is: ", response.data.length );
  sortingHat( response.data );
});

$scope.min_year = '';
$scope.min_month = '';
$scope.min_day = '';       //Reset input fields.
$scope.max_year = '';
$scope.max_month = '';
$scope.max_day = '';
  };  //End showMe().

var sortingHat = function( array ) {
  categories = {
    rent: 0,
    utilities: 0,
    miscBills: 0,
    transportation: 0,
    groceries: 0,
    entertainment: 0,
    other: 0
  };
  for( var i = 0; i < array.length; i++ ) {
    switch( array[i] ){
      case array[i].category = 'Rent':
        categories.rent += array[i].amount;
        break;
      case array[i].category = 'Utilities':
        categories.utilities += array[i].amount;
        break;
      case array[i].category = 'Misc. Bills':
        categories.miscBills += array[i].amount;
        break;
      case array[i].category = 'Transportation':
        categories.transportation += array[i].amount;
        break;
      case array[i].category = 'Groceries':
        categories.groceries += array[i].amount;
        break;
      case array[i].category = 'Entertainment':
        categories.entertainment += array[i].amount;
        break;
      case array[i].category = 'Other':
        categories.other += array[i].amount;
    return categories;
  }  //End switch.
  console.log( categories.rent, categories.entertainment );
  return categories;
}  //End for loop.
// console.log( categories.rent );
};  //End sortingHat().

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

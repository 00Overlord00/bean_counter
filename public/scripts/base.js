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
  $scope.alltheDates =   sortingHat( response.data );
  // console.log("response: ", response);
  // console.log( "response contains: ", response.data[0].amount, response.data[0].description, "length is: ", response.data.length );
});

$scope.min_year = '';
$scope.min_month = '';
$scope.min_day = '';       //Reset input fields.
$scope.max_year = '';
$scope.max_month = '';
$scope.max_day = '';
  };  //End showMe().

var sortingHat = function( array ) {
  // console.dir(array);
  // console.log( 'Response values in sortingHat, prior to "for loop": ', array[0].category, ': ', array[0].amount, ', ', array[1].category, ': ',array[1].amount, ', ', array[2].category, ': ', array[2].amount, ', ', array[3].category, ': ', array[3].amount );
categories = {
    Rent: 0,
    Utilities: 0,
    MiscBills: 0,
    Transportation: 0,
    Groceries: 0,
    Entertainment: 0,
    Other: 0
  };
  // console.log( array.length );
  for( i = 0; i < array.length; i++ ) {
    // console.log( 'In sortingHat, prior to switch: ', array[i].category );
    switch( array[i].category ) {
      case "Rent":
      // console.log( 'Case Rent succeeded.' );
        categories.Rent += array[i].amount;
        break;
      case "utilities":
      // console.log( 'Case Utilities succeeded.' );
        categories.Utilities += array[i].amount;
        break;
      case "misc. Bills":
      // console.log( 'Case Misc. Bills succeeded.' );
        categories.MiscBills += array[i].amount;
        break;
      case "Transportation":
      // console.log( 'Case Transportation succeeded.' );
        categories.Transportation += array[i].amount;
        break;
      case "groceries":
      // console.log( 'Case Groceries succeeded.' );
        categories.Groceries += array[i].amount;
        break;
      case "Entertainment":
      // console.log( 'Case Entertainment succeeded.' );
        categories.Entertainment += array[i].amount;
        break;
      case "other":
      // console.log( 'Case Other succeeded.' );
        categories.Other += array[i].amount;
        break;
      default:
        console.log( array[i].category, ': ', array[i].amount, " defaulted.");
        break;
  }  //End switch.
}  //End for loop.
  console.log( 'Behold! Your totals: ', categories );
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

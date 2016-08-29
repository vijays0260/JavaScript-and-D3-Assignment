var app = angular.module('myApp', ['ui.bootstrap']);

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});


app.controller('customersCrtl', function ($scope, $http, $timeout) {
    $http.get('crime.json').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 3; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter
        $scope.totalItems = $scope.list.length/$scope.entryLimit;

        $scope.year_alone=[];
        $scope.above_alone=[];
        $scope.below_alone=[];
        for(var i=0;i<$scope.list.length;i++){
        $scope.year_alone[i]=$scope.list[i].year;
          $scope.above_alone[i]=$scope.list[i].over500;
            $scope.below_alone[i]=$scope.list[i].under500;
      }

    });
    ///*


//    */
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() {
            $scope.filteredItems = $scope.list.length;
        });
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
    $scope.add = function(){
      $scope.list.push({ year:$scope.year, under500:$scope.under, over500:$scope.over});
          $scope.filteredItems = $scope.list.length;
      $scope.totalItems = $scope.list.length/$scope.entryLimit;
      alert("Details added successfully");

  }
  ///*
  $scope.searchfun = function(yr_first,ses){
$scope.lab=ses;
if($scope.lab=="year")
{
$scope.yr=yr_first;

$scope.d=$scope.list;
  $scope.data=[];
  for(var i=0;i<$scope.list.length;i++){
    if($scope.yr<$scope.year_alone[i]){
      $scope.data.push($scope.d[i]);
    }
  }
  $scope.list = $scope.data;
  alert($scope.list);
  $scope.filteredItems = $scope.list.length;
$scope.totalItems = $scope.list.length/$scope.entryLimit;
  }
  else if($scope.lab=="Above")
  {
  $scope.yr=yr_first;

  $scope.d=$scope.list;
    $scope.data=[];
    for(var i=0;i<$scope.list.length;i++){
      if($scope.yr<$scope.above_alone[i]){
        $scope.data.push($scope.d[i]);
      }
    }
    $scope.list = $scope.data;
    alert($scope.list);
    $scope.filteredItems = $scope.list.length;
  $scope.totalItems = $scope.list.length/$scope.entryLimit;
    }
    else if($scope.lab=="Under")
    {
    $scope.yr=yr_first;

    $scope.d=$scope.list;
      $scope.data=[];
      for(var i=0;i<$scope.list.length;i++){
        if($scope.yr>$scope.below_alone[i]){
          $scope.data.push($scope.d[i]);
        }
      }
      $scope.list = $scope.data;
      alert($scope.list);
      $scope.filteredItems = $scope.list.length;
    $scope.totalItems = $scope.list.length/$scope.entryLimit;
      }

}
$scope.removeRow= function(r){
        $scope.list.splice( r,1 );
        $scope.filteredItems = $scope.list.length;
    $scope.totalItems = $scope.list.length/$scope.entryLimit;
    }
});
app.directive('buttonStar', function() {
  return {
    scope: true,
    restrict: 'E',
    template: '<button class="btn btn-icon"><span class="glyphicon glyphicon-remove"></span></button>',
  };
})

(function(){
    var app=angular.module('activity',[]);
    app.controller('coolController',['$http','$scope',function($http,$scope){

        // function myMap() {
        //   };


        $scope.bla="Hello";
        $scope.booksFromCityName=[];
        var URL="http://localhost:5000/api/city/";
        $scope.getFirst=function(bookName){

            $http.get(URL+bookName).success(function(data,status){
                console.log(data.cities);
                //$scope.booksFromCityName=[];
                deleteMarkers();
                $scope.booksFromCityName=data.cities;
                // console.log("The cities ", $scope.booksFromCityName[0]);
               // console.log("The type of lat is ",typeof $scope.booksFromCityName[0].lat)
                //console.log("The lat is ",$scope.booksFromCityName[0].lat)
                // for(i = 0; i<$scope.booksFromCityName.length; i++){
                //     marker=new google.maps.Marker({
                //        // position:new google.maps.LatLng($scope.booksFromCityName[i].lat,$scope.booksFromCityName[i].longt),map:map
                //         position:new google.maps.LatLng($scope.booksFromCityName[i].lat,$scope.booksFromCityName[i].longt),map:map
                //     });
                // }
            }).error(function(data,status){

            });

        };


        var mapProp={
            center:new google.maps.LatLng(51.508742,-0.120850),zoom:3,
        };
        var map=new google.maps.Map(document.getElementById("map"),mapProp);
        var marker;
        var markers = [];
        var i;
        var infowindow = new google.maps.InfoWindow();
     setTimeout(   $scope.placeMarkers = function(){
            for(i=0; i<$scope.booksFromCityName.length; i++){
                marker=new google.maps.Marker({
                    // position:new google.maps.LatLng($scope.booksFromCityName[i].lat,$scope.booksFromCityName[i].longt),map:map
                    position:new google.maps.LatLng($scope.booksFromCityName[i].lat,$scope.booksFromCityName[i].longt),
                    map:map
                });
                markers.push(marker);

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent($scope.booksFromCityName[i].city);
                        infowindow.open(map, marker);
                    }
                })(marker, i));

            }
        },3000);

        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        function clearMarkers() {
            setMapOnAll(null);
        }

        function deleteMarkers() {
            clearMarkers();
            markers = [];
        }

        map.addListener('click', function(event) {
            addMarker(event.latLng);
        });
        // function myMap() {
        //     var mapProp= {
        //         center:new google.maps.LatLng(51.508742,-0.120850),
        //         zoom:5,
        //     };
        //     var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
        // }


    }]);
})();

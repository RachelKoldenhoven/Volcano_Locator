/**
 * Created by rachel on 11/1/2015.
 */

var volcanoes = [];

var dataLoaded = function (data, textStatus, jgXHR) {
    for (var i = 0; i < data.features.length; i++) {
        var volcano = data.features[i].properties;
        var myLatLng = {lat: volcano.Latitude, lng: volcano.Longitude, name: volcano.V_Name};
        volcanoes.push(myLatLng);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: volcano.V_Name
        });
    }



}


var map;
var geocoder;

var initMap = function () {

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: {lat: 0, lng: 0}
    });
    $.ajax({
        dataType: "json",
        url: "https://data.hdx.rwlabs.org/dataset/a60ac839-920d-435a-bf7d-25855602699d/resource/7234d067-2d74-449a-9c61-22ae6d98d928/download/volcano.json",
        data: {},
        success: dataLoaded
    });

    $("#button").click(function(){
        var location = $("#address").val();
        console.log(location);
        geocoder.geocode( { 'address': location}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var userLocation = results[0].geometry.location;
                var minDistance = 10000000;
                var closestVolcano = "";
                for (var i = 0; i<volcanoes.length; i++){
                    var volcano = volcanoes[i];
                    var volcanoLatLng = new google.maps.LatLng(volcano.lat, volcano.lng);
                    var distance = google.maps.geometry.spherical.computeDistanceBetween (userLocation, volcanoLatLng);

                    if(distance <= minDistance) {
                        minDistance = distance;
                        closestVolcano =  volcanoes[i];
                    }
                }
                var displayDistance = Math.round(minDistance/1000);
                console.log(displayDistance);
                $("#VolcanoDistance").text(displayDistance + "Km");
                console.log(closestVolcano);
                $("#VolcanoName").text(closestVolcano.name);
                map.setCenter(results[0].geometry.location);
                map.setZoom(6);
                var marker = new google.maps.Marker({
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    })

}


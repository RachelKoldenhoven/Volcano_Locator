/**
 * Created by rachel on 11/1/2015.
 */
var dataLoaded = function (data, textStatus, jgXHR) {
    for (var i = 0; i < data.features.length; i++) {
        var volcano = data.features[i].properties;
        var myLatLng = {lat: volcano.Latitude, lng: volcano.Longitude};
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: volcano.V_Name
        });
    }



}


var map;
var initMap = function () {


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


}


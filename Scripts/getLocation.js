var geocoder = new google.maps.Geocoder();
var address = locationInput;

function getAddress() {
    console.log("Address = " + address);
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            requestedLocation = results[0].geometry.location;
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    return requestedLocation;
}
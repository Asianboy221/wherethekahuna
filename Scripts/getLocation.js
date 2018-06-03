var requestedLocation;

function getAddress(geocoder, address) {
    // console.log("Address = " + address);
    geocoder.geocode({ 'address': address }, function (results, status) {
        // console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
            if(results[0].geometry.location_type == 'APPROXIMATE') {
                var bounds = results[0].geometry.bounds;
                requestedLocation = {
                    lat: bounds.f.b,
                    lng: bounds.b.b
                };
            } else {
                requestedLocation = results[0].geometry.location;
            }
            // console.log(requestedLocation);
            // return requestedLocation;   
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    
}
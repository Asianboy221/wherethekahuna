var requestedLocation;

function getAddress(geocoder, address) {
    // console.log("Address = " + address);
    geocoder.geocode({ 'address': address }, function (results, status) {
        // console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
            if(results[0].geometry.location_type == 'APPROXIMATE') {
                var bounds = results[0].geometry.bounds;
                var latMiddle = ((bounds.f.f + bounds.f.b) / 2);
                var lngMiddle = ((bounds.b.f + bounds.b.b) / 2);
                requestedLocation = {
                    lat: parseFloat(latMiddle),
                    lng: parseFloat(lngMiddle)
                };
            } else {
                requestedLocation = results[0].geometry.location;
            }
            console.log(requestedLocation);
            // return requestedLocation;   
        } else {
            console.log("Geocode not successful: " + status);   
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    
}
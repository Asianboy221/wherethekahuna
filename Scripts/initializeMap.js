var map, infoWindow, pos, placeLoc, directionsService, directionsDisplay;

function initMap() {
    // The starting location of Salt Lake City
    var startingLocation = { lat: 40.760779, lng: -111.891047 };
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    // The map, centered at Salt Lake City
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: startingLocation
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({ suppressMarkers: true })
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //Getting current location
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.panTo(pos);
            //Center map over current location add marker to current location
            map.setCenter(pos);
            var icon = {
                url: "../img/usflag.png", // url
                scaledSize: new google.maps.Size(50, 50), // scaled size
                origin: new google.maps.Point(0, 0), // origin
            };
            var currentlocation = {
                url: "../img/currentlocation.png", // url
                scaledSize: new google.maps.Size(50, 50), // scaled size
                origin: new google.maps.Point(0, 0), // origin
            };
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: currentlocation
            });

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: pos,
                radius: 1609, //1 Mile
                keyword: [foodInput],
                type: ['restaurant']
            }, callback);
            var request = {
                //location: map.getCenter(),
                location: locationInput,
                radius: 1609,
                //query: getRandomFood()
                //icon: icon
            }
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    getUrlVariables();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
            map: map,
            place: {
                placeId: results[0].place_id,
                location: results[0].geometry.location,
                icon: createMarker(results[0])
            }
        });
    }
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    updateDisplay(results[0], status);
}

function updateDisplay(result, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        //console.log(JSON.stringify(result));
        var service = new google.maps.places.PlacesService(map);
        var request = {
            reference: result.reference
        };
        var placeDetails = service.getDetails(request, function (place, status) {
            //console.log(place);
            document.getElementById('displayName').innerHTML = place.name;
            var photos = place.photos;
            document.getElementById('displayPhoto').src = photos[0].getUrl({ 'maxWidth': 350, 'maxHeight': 250 });
            document.getElementById('displayHours').innerHTML = place.opening_hours.weekday_text;
            document.getElementById('displayRating').innerHTML = place.rating;
            document.getElementById('displayAddress').innerHTML = place.vicinity;
        });
    }
}
function createMarker(place) {
    placeLoc = place.geometry.location;
    var photos = place.photos;
    if (!photos) {
        return;
    }
    var icon = {
        url: "../img/locations.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
    };
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
        icon: icon//photos[0].getUrl({ 'maxWidth': 35, 'maxHeight': 35 })
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
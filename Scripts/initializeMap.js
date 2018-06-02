var map, infoWindow, pos, placeLoc, directionsService, directionsDisplay, placeMarker;
var showingplace, places;
var placeIndex = 0;
var search;

function initMap() {
    getUrlVariables();
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
        //console.log("Location Input = " + JSON.stringify(locationInput));
        var searchLocation = new google.maps.places.SearchBox(locationInput);
        
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
                address: locationInput,
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
    
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function callback(results, status) {
    places = results;
    showingplace = places[0];
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarker(results[0]);
        // placeMarker = new google.maps.Marker({
        //     map: map,
        //     place: {
        //         placeId: results[0].place_id,
        //         location: results[0].geometry.location,
        //         icon: createMarker(results[0])
        //     }
        // });
        //console.log(results[0]);
        //console.log(results[1]);
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
            console.log(place);
            document.getElementById('displayName').innerHTML = place.name;
            var photos = place.photos;
            document.getElementById('displayPhoto').src = photos[0].getUrl({ 'maxWidth': 350, 'maxHeight': 250 });
            var hours = place.opening_hours.weekday_text;
            var rating = place.rating;
            var cost = place.price_level;
            document.getElementById('displayAddress').innerHTML = place.vicinity;

            //Display Rating
            document.getElementById('displayRating').innerHTML = '';

            var rn = document.createElement('p');
            rn.appendChild(document.createTextNode(rating));
            document.getElementById('displayRating').appendChild(rn);
            var innerStars = document.createElement('div');
            var outerStars = document.createElement('div');
            outerStars.className = 'outerStars';
            innerStars.className = 'innerStars';
            outerStars.appendChild(innerStars);
            document.getElementById('displayRating').appendChild(outerStars)
            var starPer = (rating / 5) * 100;
            var starRounded = `${(Math.round(starPer / 10) * 10)}%`;
            document.querySelector('.innerStars').style.width = starRounded;

            //Display Cost
            var showPrice = "";
            for (var i = 0; i < cost; i++) {
                showPrice += "$";
            }
            var costDis = document.createElement('div');
            costDis.id = 'displayCost'
            costDis.innerHTML = showPrice;
            document.getElementById('displayRating').appendChild(costDis);

            //Display Hours
            document.getElementById('displayHours').innerHTML = '';
            for (var i = 0; i < hours.length; i++) {
                var item = document.createElement('li');
                item.appendChild(document.createTextNode(hours[i]));
                document.getElementById('displayHours').appendChild(item);
            }
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
    placeMarker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
        icon: icon//photos[0].getUrl({ 'maxWidth': 35, 'maxHeight': 35 })
    });

    google.maps.event.addListener(placeMarker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function changePlace() {
    placeIndex++;
    if (placeIndex > places.length) {
        placeIndex = 0;
    }
    showingplace = places[placeIndex];

    createMarker(showingplace);
    // placeMarker = new google.maps.Marker({
    //     map: map,
    //     place: {
    //         placeId: showingplace.place_id,
    //         location: showingplace.geometry.location,
    //         icon: createMarker(showingplace)
    //     }
    // });
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    updateDisplay(showingplace, google.maps.places.PlacesServiceStatus.OK);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: pos,
      destination: placeLoc,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
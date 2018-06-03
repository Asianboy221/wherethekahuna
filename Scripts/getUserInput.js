var foodInput, locationInput;
var startingLocation = { lat: 40.760779, lng: -111.891047 };

function getUrlVariables(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
    for (var i = 0; i < arr.length; i++) {
      foodInput = arr[0].split('=');
      locationInput = arr[1].split('=');
      
      if (foodInput[1]) {
        foodInput = foodInput[1];
      } else {
        foodInput = getRandomFood();
      }
      
      if(locationInput[1]){
        locationInput = locationInput[1]
        console.log("Location Input = " + locationInput);
        getAddress();
      } else {
        locationInput = startingLocation;
      }
      for (var k = 0; k < foodInput.length; k++) {
        foodInput = foodInput.replace('+', ' ');
      }
      for (var j = 0; j < locationInput.length; j++) {
        locationInput = locationInput.replace('+', ' ');
      }
    }
    //console.log('Food = ' + foodInput + ' Location = ' + JSON.stringify(locationInput));
  }
}
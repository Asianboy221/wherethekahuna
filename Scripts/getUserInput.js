function getUrlVariables(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    if (queryString) {
      queryString = queryString.split('#')[0];
      var arr = queryString.split('&');
      for (var i = 0; i<arr.length; i++){
        foodInput = arr[0].split('=');
        foodInput = foodInput[1];
        locationInput = arr[1].split('=');
        locationInput = locationInput[1];
        for(var j = 0; i<locationInput.length; i++){
          locationInput = locationInput.replace('+', ' ');
        }
        console.log('Food = ' + foodInput + ' Location = ' + locationInput);
      }
    }
  }
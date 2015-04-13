//VARIABLES

var elementsToRegister = [
  // {eventType: "click", element: "#frame2 #locared .imgSearch", functionToCall: "callMap"},
  {eventType: "click", element: "#mapSlide #close", functionToCall: "closeMap"}
],
opened = false,
myElement = document.getElementById('ctaLocator'),
hammer = Hammer(myElement).on("tap", function(e){
  if(opened){
    closeLocator();
    opened = false
  } else {
    expandLocator();
    opened = true
  }
}),
placeSearch, 
autocomplete, 
autocompleteInput = document.getElementById('autocomplete'),
loaderSpin = document.getElementById('loaderSpin'),
ctaDirections = document.getElementById('ctaDirection'),
componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
},
conexion = new XMLHttpRequest(),
zipCode,
stateName,
cityName,
arrayOfStores = [];

ctaDirections.addEventListener('click', displayDirections, false);

//FUNCTIONS

jQuery(document).ready(function($) {
  $('#banner-slide').bjqs({
    animtype      : 'slide',
    height        : 250,
    width         : 300,
    responsive    : false,
    randomstart   : false
  });
});

doubleClickEvents.initializer();

function expandLocator(){
  TweenLite.to("#locared", 1, {top:150, ease:Bounce.easeOut});
  setTimeout(function(){
    autocompleteInput.focus();
  }, 900);
}

function closeLocator(){
  TweenLite.to("#locared", 1, {top:195, ease:Bounce.easeOut});
}

function closeMap(){
  motionLibrary.animations("fadeOut", "#mapSlide", 0);
  autocompleteInput.value = '';
  autocompleteInput.disabled = false;
  setTimeout(function(){
    autocompleteInput.focus();
  }, 400);
}

function callMap(){
    motionLibrary.animations("set", "#mapSlide", 0);
    motionLibrary.animations("fadeIn", "#mapSlide", 0);

    var bounds = new google.maps.LatLngBounds(),
        infowindow = new google.maps.InfoWindow(),
        centerLocation = new google.maps.LatLng(arrayOfStores[0].lat, arrayOfStores[0].lng),
    map = new google.maps.Map(document.getElementById('map'), {
        center: centerLocation,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        streetViewControl: false,
        zoom: 11
    });

    for (var i = 0; i < arrayOfStores.length; i++) {
      var localLocation = new google.maps.LatLng(arrayOfStores[i].lat, arrayOfStores[i].lng),
      marker = new google.maps.Marker({
        position: localLocation,
        map: map,
        title: arrayOfStores[i].title
      });

      bounds.extend(marker.position);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(arrayOfStores[i].title);//locations[i][0]
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

    map.fitBounds(bounds);
}

function firstFrame(){
  motionLibrary.animations("set", "#firstFrame", 0);
  motionLibrary.animations("inOutRight", "#firstFrame h1", 0.1);
  motionLibrary.animations("inOutRight", "#firstFrame h2", 0.2);
  TweenLite.from("#firstFrame .bolded", 1, {alpha:0, ease:Bounce.easeOut, scaleX:1.5, scaleY:1.5, delay:.5});
  TweenLite.to("#firstFrame .bolded", .5, {alpha:0, delay:3});
  motionLibrary.setTimer(3, secondFrame);
}

function secondFrame(){
  motionLibrary.animations("set", "#frame2", 0);
  motionLibrary.animations("inBottom", ".img1", 0.2);
  motionLibrary.animations("inRight", "#frame2 .sliderContainer", .5);
}

//AUTOCOMPLETE CODE

function initialize() {
  var options = { 
      types: ['geocode'],
      componentRestrictions: {country: "us"}
  }

  autocomplete = new google.maps.places.Autocomplete(autocompleteInput, options);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    fillInAddress();
  });
}

function fillInAddress() {
  var place = autocomplete.getPlace();

  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      if(addressType == 'locality'){
        cityName = val;
      }else if(addressType == 'administrative_area_level_1'){
        stateName = val;
      }else if(addressType == 'postal_code'){
        zipCode = val;
      }
    }
  }

  if ((cityName && stateName) || zipCode) {
    ajaxEventFunction();
  }else{
    alert('Please enter a valid State and City from the US');
  }
}

//AJAX EVENT FUNCTION
function ajaxEventFunction(){
  var cityCompiled = cityName.split(' ').join('%20');

  if (document.location.hostname == "localhost"){
    conexion.open('GET', 'http://localhost:8888/vzn-api/api.php?cityName='+cityCompiled+'&stateName='+stateName+'&zipCode='+zipCode, true);
  }else{
    conexion.open('GET', 'http://prodigious.cr/moxie/VZWlab/location/api.php?cityName='+cityCompiled+'&stateName='+stateName+'&zipCode='+zipCode, true);
  }

  conexion.send();
  conexion.addEventListener('load', mostrarInfo, false);

  loaderSpin.style.display = 'block';
  autocompleteInput.disabled = true;
}

function mostrarInfo(){
  var obj = JSON.parse(conexion.response);

  arrayOfStores = [];

  if (obj.length > 10) {
    for (var i = 0; i < 10; i++) {
      arrayOfStores.push(obj[i]);
    }
  }else{
    for (var i = 0; i < obj.length; i++) {
      arrayOfStores.push(obj[i]);
    }
  }

  loaderSpin.style.display = 'none';
  callMap();  
}

function displayDirections(){
  for (var i = 0; i < arrayOfStores.length; i++) {
    console.log(arrayOfStores[i].title);
    console.log(arrayOfStores[i].address+', '+arrayOfStores[i].city+', '+arrayOfStores[i].state);
    console.log(arrayOfStores[i].phone);
    console.log('---------------------------------');
  };
}

initialize();
doubleClickEvents.initializer();

var elementsToRegister = [
    {eventType: "click", element: "#collapse-banner", functionToCall: "expanded"},
    {eventType: "click", element: "#getLocation", functionToCall: "updatePosition"},
    {eventType: "click", element: "#route", functionToCall: "getRoute"}
];

function firstFrame(){
    motionLibrary.animations("fadeIn", "#collapse-banner h1", 0);
    motionLibrary.animations("fadeIn", "#collapse-banner h2", 0.5);
}

function expanded() {
  motionLibrary.animations("fadeIn", "#expanded-banner", 0);
  motionLibrary.animations("fadeIn", "#expanded-banner #info", 0);
  motionLibrary.animations("fadeIn", "#expanded-banner #info #f1_txt1", 1, Strong.easeOut);
}

// Map Code

var placeSearch, 
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


function updatePosition(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callMap);
    } else { 
        alert("Geolocation is not supported by this browser");
    }
}

function getRoute(){
    window.open('waze://?ll=9.927731,-84.08900&navigate=yes');
}

var arrayOfStores = [
    {
        "title": "1. Verizon Wireless Store",
        "direction": "770 Broadway, New York, NY 10003",
        "phone": "1 (800) 444-5555",
        "lat": 9.927731, 
        "lng": -84.08900
    },
    {
        "title": "2. Verizon Wireless Store",
        "direction": "770 Broadway, New York, NY 10003",
        "phone": "1 (800) 444-5555",
        "lat": 9.947731, 
        "lng": -84.08900
    },
    {
        "title": "3. Verizon Wireless Store",
        "direction": "770 Broadway, New York, NY 10003",
        "phone": "1 (800) 444-5555",
        "lat": 9.927731, 
        "lng": -84.05900
    }
];

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function callMap(position){

    directionsDisplay = new google.maps.DirectionsRenderer();
    var bounds = new google.maps.LatLngBounds(),
        infowindow = new google.maps.InfoWindow(),
        centerLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: centerLocation,
            zoomControl: true,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL,
              position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControl: false,
            streetViewControl: false,
            zoom: 11
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('directions'));

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
    console.log(cityName +" "+ stateName);
  }else{
    alert('Please enter a valid State and City from the US');
  }
}

initialize();
updatePosition();

// Slider Code
//Common Vars
var sliderParentDiv = document.getElementById('slider'),
	sliderBullets = document.getElementById('bullets'),
	container = document.getElementById('container'),
	rightArrow = document.getElementById('right-arrow'),
	leftArrow = document.getElementById('left-arrow'),
    slides,
	slideOffsetWidth,
	currentSlide = 1,
	marginRight = 10,
    active = false;

//Set Content
for (var i = 0; i < arrayOfStores.length; i++) {
    container.innerHTML += '<div><p class="bold">'+arrayOfStores[i].title+'</p><p class="bold">'+arrayOfStores[i].direction+'</p><p>'+arrayOfStores[i].phone+'</p></div>';
};

window.setTimeout(function() {
    slides = document.querySelectorAll('#container div');
    slideOffsetWidth = slides[0].offsetWidth;
    //Set Container Width
    container.style.width = (slideOffsetWidth * slides.length) + (slides.length * marginRight+2)+'px';

    for (i = 0; i < slides.length; i++) { 
        slides[i].style.marginRight = marginRight+"px";
    }
}, 1000);


//Listener for Arrows
rightArrow.addEventListener("click", nextSlide, false);
leftArrow.addEventListener("click", previewSlide, false);

//Functions to do
function nextSlide(){
	if (currentSlide != slides.length && active == false){
    active = true;
		TweenLite.to(container, 0.5, {left: "-="+ (slideOffsetWidth + marginRight) +"px", onComplete:function(){
      active = false;
    }});
		currentSlide++;	
	}
}

function previewSlide(){
	if (currentSlide != 1 && active == false){
    active = true;
		TweenLite.to(container, 0.5, {left: "+="+ (slideOffsetWidth + marginRight) +"px", onComplete:function(){
      active = false;
    }});
		currentSlide--;
	}
}






















	